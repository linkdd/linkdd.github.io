import type { StartMenuLink } from '@/components/os/StartMenu/types'

import type { DesktopApp } from '@/components/os/Desktop/types'

export type TaskbarProps = {
  links: StartMenuLink[]
  openApps: DesktopApp[]
  activeId?: string
  onSelect: (id: string) => void
}
