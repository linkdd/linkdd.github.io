import styled from '@emotion/styled'


export const SourceLogo = styled.img`
  display: block;
  width: 24px;
  height: 24px;
  object-fit: contain;
`

export const TableLayout = styled.div`
  height: 100%;
  min-height: 0;

  & > .sunken-panel {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
  }

  & table {
    width: 100%;
    min-width: 560px;
  }

  & th {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  & td {
    padding: 6px;
    vertical-align: top;
    white-space: normal;
  }

  & td:first-child,
  & td:last-child {
    white-space: nowrap;
  }

  & .highlighted a {
    color: inherit;
  }
`
