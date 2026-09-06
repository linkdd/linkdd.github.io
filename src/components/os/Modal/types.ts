import type { ReactNode } from 'react'


export type ModalProps = {
  title: string
  children: ReactNode
  onClose: () => void
}
