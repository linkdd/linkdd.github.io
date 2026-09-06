export type BlogSource = 'linuxfr' | 'medium' | 'devto'

export type BlogFeed = {
  source: BlogSource
  label: string
  url: string
}
