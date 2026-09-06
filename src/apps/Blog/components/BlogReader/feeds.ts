import type { BlogArticle } from '@/apps/Blog/components/BlogTable/types'

import type { BlogFeed, BlogSource } from './types'


export { blogFeeds } from '@/apps/Blog/data'


async function fetchJson(url: URL, signal: AbortSignal): Promise<unknown> {
  const response = await fetch(url, {
    signal: AbortSignal.any([signal, AbortSignal.timeout(20000)]),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  return response.json()
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


async function fetchDevArticles(feed: BlogFeed, signal: AbortSignal): Promise<BlogArticle[]> {
  const articles = new Map<string, BlogArticle>()
  let page = 1

  while (true) {
    signal.throwIfAborted()

    const url = new URL(feed.url)

    url.searchParams.set('page', String(page))

    const items = await fetchJson(url, signal)

    if (!Array.isArray(items)) {
      throw new Error('Invalid DEV response')
    }

    if (items.length === 0) {
      return [...articles.values()]
    }

    const previousCount = articles.size

    for (const item of items) {
      const entry = asRecord(item)
      const article = parseArticle('devto', entry.title, entry.url, entry.published_at)

      articles.set(article.url, article)
    }

    if (articles.size === previousCount) {
      throw new Error('DEV pagination returned a repeated page')
    }

    page += 1
  }
}


export async function fetchFeed(feed: BlogFeed, signal: AbortSignal): Promise<BlogArticle[]> {
  if (feed.source === 'devto') {
    return fetchDevArticles(feed, signal)
  }

  const url = new URL('https://api.rss2json.com/v1/api.json')

  url.searchParams.set('rss_url', feed.url)

  const result = asRecord(await fetchJson(url, signal))

  if (result.status !== 'ok' || !Array.isArray(result.items)) {
    throw new Error('RSS2JSON could not load the feed')
  }

  return result.items.map(item => {
    const entry = asRecord(item)

    return parseArticle(feed.source, entry.title, entry.link, entry.pubDate)
  })
}
