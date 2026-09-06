import type { GroupBoxProps } from './types'


export default function GroupBox({ legend, children, ...props }: GroupBoxProps) {
  return (
    <fieldset {...props}>
      {legend && <legend>{legend}</legend>}
      {children}
    </fieldset>
  )
}
