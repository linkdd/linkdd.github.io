import styled from '@emotion/styled'


export const FlatButton = styled.button`
  /* Override 98.css hover/active bevels as well as its base button shadow. */
  &&& {
    box-shadow: none;
    text-shadow: none;
  }

  color: inherit;
`
