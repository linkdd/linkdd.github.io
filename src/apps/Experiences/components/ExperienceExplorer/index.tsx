import Button from '@/components/base/Button'

import { useState } from 'react'

import Modal from '@/components/os/Modal'
import Experience from '@/apps/Experiences/components/Experience'
import ExplorerItem from '@/components/utilities/ExplorerItem'

import FolderUrl from '@/assets/icons/directory.png'
import DocumentUrl from '@/assets/icons/document.png'

import { experienceCategories, experiences } from '@/apps/Experiences/data'
import type { ExperienceCategory, ExperienceEntry } from '@/apps/Experiences/types'

import type { ExperienceExplorerProps } from './types'

import { ExplorerLayout, Toolbar, PathDisplay, DocumentGrid } from './styled'


export default function ExperienceExplorer({ entries = experiences }: ExperienceExplorerProps) {
  const [category, setCategory] = useState<ExperienceCategory | null>(null)
  const [selected, setSelected] = useState<ExperienceEntry | null>(null)

  const documents = entries.filter(entry => entry.category === category)
  const folderCount = category === null ? experienceCategories.length : 0

  const nameCounts = new Map<string, number>()

  const labeledDocuments = documents.map(entry => {
    const name = entry.documentName ?? entry.company
    const count = (nameCounts.get(name) ?? 0) + 1

    nameCounts.set(name, count)

    const label = count === 1 ? name : `${name} (${count})`

    return { entry, label }
  })

  return (
    <ExplorerLayout>
      <Toolbar aria-label="Experience folders">
        <Button
          variant="default"
          disabled={category === null}
          onClick={() => {
            setCategory(null)
          }}
        >
          Up
        </Button>

        <PathDisplay>
          Experiences{category === null ? '' : ` / ${category}`}
        </PathDisplay>
      </Toolbar>

      <DocumentGrid aria-label={category ?? 'Experiences'}>
        {category === null && experienceCategories.map(folder => (
          <ExplorerItem
            key={folder}
            label={folder}
            icon={FolderUrl}
            onOpen={() => {
              setCategory(folder)
            }}
          />
        ))}

        {labeledDocuments.map(({ entry, label }) => (
          <ExplorerItem
            key={entry.id}
            label={label}
            icon={DocumentUrl}
            onOpen={() => {
              setSelected(entry)
            }}
          />
        ))}
      </DocumentGrid>

      <div className="status-bar" role="status">
        <p className="status-bar-field">
          {documents.length + folderCount} object(s)
        </p>
      </div>

      {selected !== null && (
        <Modal
          title={selected.title}
          onClose={() => {
            setSelected(null)
          }}
        >
          <Experience {...selected} />
        </Modal>
      )}
    </ExplorerLayout>
  )
}
