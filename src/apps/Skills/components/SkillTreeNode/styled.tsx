import styled from '@emotion/styled'

import Button from '@/components/base/Button'

export const CategoryButton = styled(Button)`
  min-width: 0;
  min-height: 0;
  padding: 3px 5px;

  background: transparent;
  box-shadow: none;
  text-align: left;
  cursor: pointer;

  &[aria-pressed='true'],
  &:active {
    color: white;
    background: navy;
    box-shadow: none;
  }

  &:focus-visible {
    outline: 1px dotted gray;
    outline-offset: 1px;
  }
`
