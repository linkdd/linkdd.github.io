import { useState } from 'react'

import { ExplorerLayout } from '@/components/utilities/ExplorerItem/layout'
import { pictures } from '../../data'

import { PictureGrid, PictureButton, PictureModal, FittedImage } from './styled'


export default function PictureGallery() {
  const [selected, setSelected] = useState<(typeof pictures)[number] | null>(null)

  return (
    <ExplorerLayout>
      <PictureGrid aria-label="Pictures">
        {pictures.map(picture => (
          <PictureButton
            key={picture.name}
            variant="flat"
            aria-label={`Open ${picture.name}`}
            aria-haspopup="dialog"
            onClick={() => setSelected(picture)}
          >
            <img src={picture.thumbnail} alt="" loading="lazy" decoding="async" />
            <span>{picture.name}</span>
          </PictureButton>
        ))}
      </PictureGrid>

      <div className="status-bar" role="status">
        <p className="status-bar-field">{pictures.length} pictures</p>
      </div>

      {selected && (
        <PictureModal title={selected.name} onClose={() => setSelected(null)}>
          <FittedImage src={selected.src} alt={selected.name} />
        </PictureModal>
      )}
    </ExplorerLayout>
  )
}
