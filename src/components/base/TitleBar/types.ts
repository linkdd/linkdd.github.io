type CommonTitleBarProps = {
  text: string
  inactive?: boolean
  onHelp?: () => void
  onMinimize?: () => void
  onClose?: () => void
}

export type MaximizableTitleBarProps = CommonTitleBarProps & {
  maximizable?: true
  maximized?: boolean
  onMaximize: () => void
  onRestore: () => void
}

export type NonMaximizableTitleBarProps = CommonTitleBarProps & {
  maximizable: false
}

export type TitleBarProps = MaximizableTitleBarProps | NonMaximizableTitleBarProps
