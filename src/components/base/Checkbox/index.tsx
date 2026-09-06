import type { CheckboxProps } from './types'


export default function Checkbox(props: CheckboxProps) {
  return (
    <>
      <input
        id={props.id}
        type="Checkbox"
        name={props.name}
        checked={props.checked ?? false}
        disabled={props.disabled ?? false}
        onChange={(e) => props.onChange(e.target.checked)}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </>
  )
}
