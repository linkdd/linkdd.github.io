import type { TitleBarProps } from '@/components/base/TitleBar/types'


export type WindowProps = {
  titlebar: TitleBarProps
  statusbar?: string[]
  children?: React.ReactNode
}
