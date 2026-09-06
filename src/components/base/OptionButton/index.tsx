import type { OptionButtonProps } from './types'


export default function OptionButton(props: OptionButtonProps) {
  return (
    <>
      <input
        id={props.id}
        type="radio"
        name={props.name}
        checked={props.checked ?? false}
        disabled={props.disabled ?? false}
        onChange={(e) => props.onChange(e.target.checked)}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </>
  )
}
