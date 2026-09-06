import styled from '@emotion/styled'

export const Shortcut = styled.a`
  padding: 4px;

  width: 80px;
  min-height: 72px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  color: white;
  background: transparent;
  box-shadow: none;
  text-shadow: 1px 1px black;

  cursor: pointer;

  &:focus,
  &:active {
    background: #000080;
    outline: 1px dotted white;
    box-shadow: none;
  }
`

export const Icon = styled.span`
  width: 32px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 32px;
  line-height: 36px;

  & img {
    width: 32px;
    height: 32px;

    display: block;
    object-fit: contain;
  }
`
