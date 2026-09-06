import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import Window from '@/components/base/Window'

import type { ModalProps } from './types'

import { ModalDialog } from './styled'


export default function Modal({ title, children, onClose }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const element = dialog.current
    const previousFocus = document.activeElement

    element?.showModal()

    return () => {
      element?.close()

      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus()
      }
    }
  }, [])

  return createPortal(
    <ModalDialog
      ref={dialog}
      aria-label={title}
      onCancel={event => {
        event.preventDefault()
        onClose()
      }}
      onPointerDown={event => {
        event.stopPropagation()
      }}
      onDoubleClick={event => {
        event.stopPropagation()
      }}
    >
      <Window
        titlebar={{
          text: title,
          maximizable: false,
          onClose,
        }}
      >
        {children}
      </Window>
    </ModalDialog>,
    document.body,
  )
}
