import DocumentUrl from '@/assets/icons/document.png'

import ExplorerItem from '@/components/utilities/ExplorerItem'
import { DocumentGrid, ExplorerLayout } from '@/components/utilities/ExplorerItem/layout'

import type { CVDocumentsProps } from './types'


export default function CVDocuments({ documents }: CVDocumentsProps) {
  return (
    <ExplorerLayout>
      <DocumentGrid aria-label="CV documents">
        {documents.map(document => (
          <ExplorerItem
            key={document.id}
            label={`${document.title}.pdf`}
            icon={DocumentUrl}
            onOpen={() => {
              window.open(
                `${import.meta.env.BASE_URL}${document.file}`,
                '_blank',
                'noopener,noreferrer',
              )
            }}
          />
        ))}
      </DocumentGrid>

      <div className="status-bar" role="status">
        <p className="status-bar-field">
          {documents.length} documents
        </p>
      </div>
    </ExplorerLayout>
  )
}
