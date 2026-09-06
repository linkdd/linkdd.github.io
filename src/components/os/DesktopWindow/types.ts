import type { Dispatch } from 'react'
import type { DesktopApp } from '@/components/os/Desktop/types'
import type { WindowAction } from '@/components/os/windowManager'


export type Bounds = {
  x: number
  y: number
  width: number
  height: number
}

export type DesktopWindowState = {
  id: string
  taskbarOrder: number
  bounds: Bounds
  minimized: boolean
  maximized: boolean
}

export type DesktopWindowProps = {
  app: DesktopApp
  window: DesktopWindowState
  active: boolean
  layer: number
  area: { width: number; height: number }
  dispatch: Dispatch<WindowAction>
}
