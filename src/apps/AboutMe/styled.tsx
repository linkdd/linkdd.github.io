import styled from '@emotion/styled'

export const AboutLayout = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  min-height: 0;
  gap: 12px;
  padding: 8px;
  box-sizing: border-box;
  overflow: auto;

  & > * {
    flex-shrink: 0;
  }

`

export const BioPanel = styled.div`
  padding: 12px;

  & > :first-child {
    margin-top: 0;
  }

  & > :last-child {
    margin-bottom: 0;
  }
`
