import type { ComponentPropsWithRef, ReactNode } from 'react'


export type ButtonProps = ComponentPropsWithRef<'button'> & {
  variant: 'default' | 'flat'
  label?: ReactNode
  active?: boolean
  focused?: boolean
}
