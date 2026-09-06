import type { GroupBoxProps } from './types'


export default function GroupBox(props: GroupBoxProps) {
  return (
    <fieldset>
      {props.legend ? <legend>{props.legend}</legend> : <></>}
      {props.children}
    </fieldset>
  )
}
