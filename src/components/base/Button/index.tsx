import clsx from 'clsx'

import { FlatButton } from './styled'

import type { ButtonProps } from './types'


export default function Button({
  variant,
  label,
  active = false,
  focused = false,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const Component = variant === 'flat' ? FlatButton : 'button'

  return (
    <Component
      {...props}
      type={type}
      className={clsx(
        variant === 'default' ? 'default' : undefined,
        active ? 'active' : '',
        focused ? 'focused' : '',
        className,
      )}
    >
      {label ?? children}
    </Component>
  )
}
