import type { StartMenuLink } from '@/components/os/StartMenu/types'

import type { ReactNode } from 'react'

export type DesktopApp = {
  id: string
  title: string
  icon: ReactNode
  content: ReactNode
  initialSize?: { width: number; height: number }
  statusbar?: string[]
}

export type DesktopProps = {
  links: StartMenuLink[]
  apps: DesktopApp[]
  initialOpen?: string[]
}
