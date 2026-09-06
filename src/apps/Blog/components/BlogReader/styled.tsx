import styled from '@emotion/styled'

export const ReaderLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  height: 100%;
  min-height: 0;


  & > .status-bar {
    flex-shrink: 0;
  }

  & > .status-bar .status-bar-field:first-child {
    flex: 0 0 auto;
  }
`

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`


export const TableArea = styled.div`
  flex: 1;
  min-height: 0;
`
