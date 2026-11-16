import type { BlogArticle } from '@/apps/Blog/components/BlogTable/types'

import type { BlogFeed, BlogSource } from './types'


export { blogFeeds } from '@/apps/Blog/data'


async function fetchResponse(url: URL, signal: AbortSignal): Promise<Response> {
  const response = await fetch(url, {
    signal: AbortSignal.any([signal, AbortSignal.timeout(20000)]),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  return response
}


function asRecord(value: unknown): Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Invalid article response')
  }

  return value as Record<string, unknown>
}


function parseArticle(
  source: BlogSource,
  title: unknown,
  link: unknown,
  published: unknown,
): BlogArticle {
  if (typeof title !== 'string' || typeof link !== 'string' || typeof published !== 'string') {
    throw new Error('Invalid article metadata')
  }

  // RSS2JSON returns UTC dates without an explicit timezone.
  const timestamp = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(published)
    ? published.replace(' ', 'T') + 'Z'
    : published

  const date = new Date(timestamp)
  const url = new URL(link)

  if (!title.trim() || !Number.isFinite(date.getTime()) || !['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Invalid article metadata')
  }

  return {
    source,
    title: title.trim(),
    publishedDate: date.toISOString(),
    url: url.href,
  }
}


async function fetchRssArticles(feed: BlogFeed, signal: AbortSignal): Promise<BlogArticle[]> {
  const response = await fetchResponse(new URL(feed.url), signal)
  const document = new DOMParser().parseFromString(await response.text(), 'application/xml')

  if (document.querySelector('parsererror') || !document.querySelector('rss > channel')) {
    throw new Error('Invalid RSS feed')
  }

  return [...document.querySelectorAll('rss > channel > item')].map(item => (
    parseArticle(
      feed.source,
      item.querySelector('title')?.textContent,
      item.querySelector('link')?.textContent,
      item.querySelector('pubDate')?.textContent,
    )
  ))
}


export async function fetchFeed(feed: BlogFeed, signal: AbortSignal): Promise<BlogArticle[]> {
  if (feed.source === 'blog') {
    return fetchRssArticles(feed, signal)
  }

  const url = new URL('https://api.rss2json.com/v1/api.json')

  url.searchParams.set('rss_url', feed.url)

  const response = await fetchResponse(url, signal)
  const result = asRecord(await response.json())

  if (result.status !== 'ok' || !Array.isArray(result.items)) {
    throw new Error('RSS2JSON could not load the feed')
  }

  return result.items.map(item => {
    const entry = asRecord(item)

    return parseArticle(feed.source, entry.title, entry.link, entry.pubDate)
  })
}
