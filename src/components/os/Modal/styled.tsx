import styled from '@emotion/styled'

export const ModalDialog = styled.dialog`
  width: min(680px, calc(100vw - 32px));
  max-width: none;
  max-height: calc(100dvh - 48px);

  padding: 0;
  border: 0;

  background: transparent;

  &::backdrop {
    background: rgb(0 0 0 / 25%);
  }

  & > .window {
    display: flex;
    flex-direction: column;

    max-height: calc(100dvh - 48px);
    box-sizing: border-box;
  }

  & .title-bar {
    flex-shrink: 0;
  }

  & .window-body {
    min-height: 0;
    overflow: auto;
  }
`
