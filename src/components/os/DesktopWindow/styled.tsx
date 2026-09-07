import styled from '@emotion/styled'

import Button from '@/components/base/Button'

export const WindowFrame = styled.section`
  position: absolute;
  outline: none;
  &[data-minimized='true'] {
    visibility: hidden;
    pointer-events: none;
  }

  & > .window {
    height: 100%;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
  }

  & .title-bar {
    flex-shrink: 0;

    touch-action: none;
    user-select: none;
  }

  & .title-bar-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & .title-bar-controls {
    flex-shrink: 0;
  }

  & .window-body {
    flex: 1;
    min-height: 0;
    overflow: auto;
  }

  & .status-bar {
    flex-shrink: 0;
    margin-right: 12px;
  }

  &[data-resizable='false'] > .window > .status-bar {
    margin-right: 0;
  }

  &[data-noborder='true'] > .window > .window-body {
    margin: 0;
    padding: 0;
  }
`

export const ResizeHandle = styled(Button)`
  position: absolute;
  right: 3px;
  bottom: 3px;
  width: 12px;

  min-width: 12px;
  height: 12px;
  min-height: 12px;

  padding: 0;

  cursor: nwse-resize;
  touch-action: none;

  box-shadow: none;
  background: repeating-linear-gradient(
    135deg,
    transparent 0 2px,
    #808080 2px 3px,
    white 3px 4px
  );
`

export const AnimatedOutline = styled.div`
  position: fixed;
  z-index: 2147483647;
  pointer-events: none;
  visibility: hidden;
  box-sizing: border-box;
  border: 3px solid white;
  outline: 2px solid black;
  mix-blend-mode: difference;
`
