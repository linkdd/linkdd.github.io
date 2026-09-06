import { useId, useState } from 'react'

import TreeView from '@/components/base/TreeView'
import TableView from '@/components/base/TableView'
import SkillTreeNode from '@/apps/Skills/components/SkillTreeNode'

import { getSkillCategories } from './categories'

import type { SkillsBrowserProps } from './types'

import { BrowserLayout, Navigation, Details, Heading } from './styled'


export default function SkillsBrowser({ groups }: SkillsBrowserProps) {
  const categories = getSkillCategories(groups)

  const [selectedId, setSelectedId] = useState(categories[0]?.id)
  const headingId = useId()
  const panelId = useId()

  const selected = categories.find(category => category.id === selectedId)

  const rows = selected?.technologies.map(technology => [
    technology.name,
    technology.description,
  ]) ?? []

  return (
    <BrowserLayout>
      <Navigation aria-label="Skill categories">
        <TreeView>
          {groups.map(group => (
            <SkillTreeNode
              key={group.id}
              node={group}
              selectedId={selected?.id}
              panelId={panelId}
              onSelect={setSelectedId}
            />
          ))}
        </TreeView>
      </Navigation>

      <Details
        id={panelId}
        aria-labelledby={headingId}
      >
        <Heading id={headingId} >
          {selected?.label ?? 'Skills'}
        </Heading>

        <TableView
          key={selected?.id}
          columns={['Technology', 'Experience']}
          data={rows}
        />

        <div className="status-bar" role="status">
          <p className="status-bar-field">
            {rows.length} technologies
          </p>
        </div>
      </Details>
    </BrowserLayout>
  )
}
