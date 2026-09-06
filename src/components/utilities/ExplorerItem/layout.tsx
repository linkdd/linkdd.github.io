import styled from '@emotion/styled'

export const ExplorerLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  height: 100%;
  min-height: 0;
`

export const DocumentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  align-content: start;
  gap: 8px;

  flex: 1;
  min-height: 0;
  padding: 8px;
  overflow: auto;

  background: white;
  box-shadow: inset 1px 1px gray;
`
