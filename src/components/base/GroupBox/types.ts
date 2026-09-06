import type { ComponentPropsWithoutRef } from 'react'


export type GroupBoxProps = ComponentPropsWithoutRef<'fieldset'> & {
  legend?: string
}
