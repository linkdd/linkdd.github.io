import TableView from '@/components/base/TableView'

import type { ProjectsTableProps } from './types'

import { TableLayout } from './styled'


export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const rows = projects.map(project => [
    project.name,
    project.description,
    project.stack.join(', '),
    project.website === null ? 'N/A' : (
      <a
        key={project.name}
        href={project.website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.name} website (opens in a new tab)`}
      >
        Website
      </a>
    ),
  ])

  return (
    <TableLayout>
      <TableView
        columns={['Name', 'Description', 'Stack', 'Website']}
        data={rows}
      />
    </TableLayout>
  )
}
