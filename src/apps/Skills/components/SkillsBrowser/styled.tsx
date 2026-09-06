import styled from '@emotion/styled'

export const BrowserLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(160px, 30%) minmax(0, 1fr);
  gap: 8px;

  height: 100%;
  min-height: 0;

  @media (max-width: 480px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(80px, 35%) minmax(0, 1fr);
  }
`

export const Navigation = styled.nav`
  min-height: 0;
  overflow: auto;

  background: white;

  & > .tree-view {
    min-height: 100%;
    margin: 0;
    box-sizing: border-box;
  }
`

export const Details = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;

  min-width: 0;
  min-height: 0;

  & > .sunken-panel {
    flex: 1;
    min-height: 0;
    overflow: auto;
  }

  & table {
    width: 100%;
    table-layout: fixed;
  }

  & th:first-child {
    width: 30%;
  }

  & td {
    padding: 6px;
    vertical-align: top;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  & th {
    position: sticky;
    top: 0;
    z-index: 1;
  }
`

export const Heading = styled.h2`
  margin: 0;
  font-size: 14px;
`
