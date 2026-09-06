import styled from '@emotion/styled'

import Button from '@/components/base/Button'

export const ItemButton = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;

  min-width: 0;
  padding: 12px 8px;

  background: transparent;
  box-shadow: none;
  overflow-wrap: anywhere;
  cursor: pointer;

  & img {
    width: 32px;
    height: 32px;

    object-fit: contain;
  }

  &:focus,
  &:active {
    color: white;
    background: navy;
    box-shadow: none;
    outline: 1px dotted gray;
  }
`
