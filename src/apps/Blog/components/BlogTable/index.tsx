import TableView from '@/components/base/TableView'

import LinuxFrLogo from '@/assets/logos/linuxfr.png'
import MediumLogo from '@/assets/logos/medium.svg'
import DevToLogo from '@/assets/logos/devto.svg'

import { blogFeeds } from '@/apps/Blog/data'

import type { BlogTableProps } from './types'

import { TableLayout, SourceLogo } from './styled'


const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})


const sourceLogos: Record<string, string> = {
  linuxfr: LinuxFrLogo,
  medium: MediumLogo,
  devto: DevToLogo,
}


export default function BlogTable({ articles }: BlogTableProps) {
  const rows = articles.map(article => [
    <SourceLogo
      key={article.source}
      src={sourceLogos[article.source]}
      alt={blogFeeds.find(feed => feed.source === article.source)?.label ?? article.source}
      title={blogFeeds.find(feed => feed.source === article.source)?.label ?? article.source}
    />,
    article.title,
    dateFormat.format(new Date(article.publishedDate)),
    <a
      key={article.url}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read ${article.title} (opens in a new tab)`}
    >
      Read article
    </a>,
  ])

  return (
    <TableLayout>
      <TableView
        columns={['Source', 'Title', 'Published Date', 'Link']}
        data={rows}
      />
    </TableLayout>
  )
}
