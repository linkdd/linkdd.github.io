import Button from '@/components/base/Button'

import { useEffect, useRef, useState } from 'react'

import BlogTable from '@/apps/Blog/components/BlogTable'
import type { BlogArticle } from '@/apps/Blog/components/BlogTable/types'

import { blogFeeds, fetchFeed } from './feeds'

import { ReaderLayout, Toolbar, TableArea } from './styled'


export default function BlogReader() {
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [source, setSource] = useState('all')
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<string[]>([])
  const [refresh, setRefresh] = useState(0)
  const request = useRef<AbortController | null>(null)

  const filteredArticles = articles.filter(article => (
    source === 'all' || article.source === source
  ))

  let statusMessage = 'Ready'

  if (loading) {
    statusMessage = 'Loading articles…'
  } else if (errors.length > 0) {
    statusMessage = `Could not refresh ${errors.join(', ')}. Previously loaded articles are kept. Try Refresh again.`
  }

  useEffect(() => {
    const controller = new AbortController()

    request.current = controller

    async function load() {
      const results = await Promise.allSettled(
        blogFeeds.map(feed => fetchFeed(feed, controller.signal)),
      )

      if (controller.signal.aborted) {
        return
      }

      const failedSources: string[] = []
      const updatedSources = new Set<string>()
      const incoming: BlogArticle[] = []

      results.forEach((result, index) => {
        const source = blogFeeds[index].source

        if (result.status === 'fulfilled') {
          updatedSources.add(source)
          incoming.push(...result.value)
        } else {
          failedSources.push(source)
        }
      })

      setArticles(previous => {
        const retained = previous.filter(article => !updatedSources.has(article.source))
        const unique = new Map<string, BlogArticle>()

        for (const article of [...retained, ...incoming]) {
          unique.set(`${article.source}:${article.url}`, article)
        }

        return [...unique.values()].sort((left, right) => (
          Date.parse(right.publishedDate) - Date.parse(left.publishedDate)
        ))
      })

      setErrors(failedSources)
      setLoading(false)
    }

    void load()

    return () => {
      controller.abort()
    }
  }, [refresh])

  function refreshArticles() {
    request.current?.abort()

    setLoading(true)
    setErrors([])
    setRefresh(value => value + 1)
  }

  return (
    <ReaderLayout aria-busy={loading}>
      <Toolbar>
        <Button variant="default" onClick={refreshArticles} disabled={loading}>
          Refresh
        </Button>

        <select
          aria-label="Filter articles by source"
          value={source}
          onChange={event => {
            setSource(event.target.value)
          }}
        >
          <option value="all">All</option>
          {blogFeeds.map(feed => (
            <option key={feed.source} value={feed.source}>
              {feed.label}
            </option>
          ))}
        </select>
      </Toolbar>

      <TableArea>
        <BlogTable key={source} articles={filteredArticles} />
      </TableArea>

      <div className="status-bar" role="status" aria-live="polite">
        <p className="status-bar-field">
          {filteredArticles.length} articles
        </p>

        <p className="status-bar-field">
          {statusMessage}
        </p>
      </div>
    </ReaderLayout>
  )
}
