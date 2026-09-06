import styled from '@emotion/styled'

export { ExplorerLayout, DocumentGrid } from '@/components/utilities/ExplorerItem/layout'

export const Toolbar = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const PathDisplay = styled.span`
  flex: 1;
  min-width: 0;
  padding: 5px 8px;

  background: white;
  box-shadow: inset 1px 1px gray;
  overflow-wrap: anywhere;
`

