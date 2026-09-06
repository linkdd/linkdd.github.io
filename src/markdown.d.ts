/// <reference types="mdx" />

declare module '*.md' {
  import type { MDXContent } from 'mdx/types'

  const Content: MDXContent

  export default Content
}
