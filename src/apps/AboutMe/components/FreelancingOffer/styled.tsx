import styled from '@emotion/styled'

export const Offer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ul {
    margin: 0;
    padding-left: 20px;
  }

  li + li {
    margin-top: 8px;
  }

  p {
    margin: 2px 0 0;
  }
`

export const OfferHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  .status-field-border,
  .field-border {
    padding: 4px;
    white-space: nowrap;
  }
`


export const ConditionLabels = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.25rem;

  flex-shrink: 1;
`


export const ConditionValues = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.25rem;

  flex-grow: 1;
`
