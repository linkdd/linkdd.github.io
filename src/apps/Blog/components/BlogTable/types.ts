export type BlogArticle = {
  source: string
  title: string
  publishedDate: string
  url: string
}

export type BlogTableProps = {
  articles: BlogArticle[]
}
