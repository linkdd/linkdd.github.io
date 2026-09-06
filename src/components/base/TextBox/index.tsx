import type { TextBoxProps, SingleLineTextBoxProps, MultiLineTextBoxProps } from './types'


function SingleLineTextBox(props: SingleLineTextBoxProps) {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type="text"
        name={props.name}
        value={props.value}
        disabled={props.disabled ?? false}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </>
  )
}


function MultiLineTextBox(props: MultiLineTextBoxProps) {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <textarea
        id={props.id}
        name={props.name}
        disabled={props.disabled ?? false}
        rows={props.rows}
        cols={props.cols}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.value}
      </textarea>
    </>
  )
}


export default function TextBox(props: TextBoxProps) {
  return (
    props.multiline ? (
      <MultiLineTextBox {...props} />
    ) : (
      <SingleLineTextBox {...props} />
    )
  )
}
