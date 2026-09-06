import styled from '@emotion/styled'

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
  gap: 4px;
  overflow-x: auto;

  & button {
    flex: 0 1 160px;
    min-width: 80px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & button.active {
    font-weight: bold;
  }
`
