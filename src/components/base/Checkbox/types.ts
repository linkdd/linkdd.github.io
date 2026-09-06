export type CheckboxProps = {
  id: string
  name: string
  label: string
  checked?: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}
