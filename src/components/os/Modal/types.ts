import type { ReactNode } from 'react'


export type ModalProps = {
  className?: string
  title: string
  children: ReactNode
  onClose: () => void
}
