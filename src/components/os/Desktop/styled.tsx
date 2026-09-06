import styled from '@emotion/styled'

export const DesktopLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const Workspace = styled.main`
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`

export const Shortcuts = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 16px;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
`
