export type Project = {
  name: string
  description: string
  stack: string[]
  website: string | null
}

export type ProjectsTableProps = {
  projects: Project[]
}
