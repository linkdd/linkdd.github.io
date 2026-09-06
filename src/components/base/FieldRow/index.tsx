import type { FieldRowProps } from './types'


export default function FieldRow(props: FieldRowProps) {
  return (
    <div className={(props.stacked ?? false) ? 'field-row-stacked' : 'field-row'}>
      {props.children}
    </div>
  )
}
