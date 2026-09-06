import styled from '@emotion/styled'

import GroupBox from '@/components/base/GroupBox'


export const JobHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  .status-field-border {
    padding: 4px;
    white-space: nowrap;
  }
`

export const JobDates = styled.div`
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  gap: 0.25rem;
`

export const JobDescription = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  gap: 0.25rem;
`

export const JobMission = styled(GroupBox)`
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #dfdfdf;
`
