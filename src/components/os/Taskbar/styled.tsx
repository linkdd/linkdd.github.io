import styled from '@emotion/styled'

import Button from '@/components/base/Button'

export const TaskbarLayout = styled.footer`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px;
  background: silver;
  box-shadow: inset 0 1px white;
  z-index: 2147483647;

  & button img {
    width: 16px;
    height: 16px;

    flex-shrink: 0;
    object-fit: contain;
    vertical-align: middle;
  }
`

export const Tasks = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  gap: 3px;
  overflow-x: auto;
`

export const TaskButton = styled(Button)`
  && {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 0 1 160px;
    min-width: 32px;
    height: 22px;
    min-height: 22px;
    padding: 2px 4px;
    overflow: hidden;
    text-align: left;
    color: #222;
    text-shadow: none;
    background: silver;
    box-shadow:
      inset -1px -1px #0a0a0a,
      inset 1px 1px white,
      inset -2px -2px grey,
      inset 2px 2px #dfdfdf;
  }

  &&[aria-pressed='true'],
  &&:active {
    box-shadow:
      inset 1px 1px #0a0a0a,
      inset -1px -1px white,
      inset 2px 2px grey,
      inset -2px -2px #dfdfdf;
    padding: 3px 3px 1px 5px;
    text-shadow: none;
  }

  &&[aria-pressed='true'] {
    font-weight: bold;
    background-color: silver;
    background-image: conic-gradient(
      white 25%,
      transparent 0 50%,
      white 0 75%,
      transparent 0
    );
    background-size: 2px 2px;
  }

  &&:focus-visible {
    outline: 1px dotted #222;
    outline-offset: -4px;
  }

  &&:focus:not(:focus-visible) {
    outline: none;
  }
`

export const TaskIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
`

export const TaskLabel = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
