type CommonTextBoxProps = {
  id: string
  name: string
  label: string
  disabled?: boolean
  value: string
  onChange: (value: string) => void
}

export type SingleLineTextBoxProps = CommonTextBoxProps & {
  multiline?: false
}

export type MultiLineTextBoxProps = CommonTextBoxProps & {
  multiline: true
  rows?: number
  cols?: number
}

export type TextBoxProps = SingleLineTextBoxProps | MultiLineTextBoxProps
