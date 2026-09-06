import type { DesktopApp } from '@/components/os/Desktop/types'

export type DesktopShortcutProps = {
  app: DesktopApp
  onOpen: (app: DesktopApp) => void
}
