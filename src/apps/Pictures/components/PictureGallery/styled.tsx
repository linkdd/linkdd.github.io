import styled from '@emotion/styled'

import Modal from '@/components/os/Modal'
import { DocumentGrid } from '@/components/utilities/ExplorerItem/layout'
import { ItemButton } from '@/components/utilities/ExplorerItem/styled'


export const PictureGrid = styled(DocumentGrid)`
  grid-template-columns: repeat(auto-fill, 140px);
  grid-auto-rows: 148px;
`

export const PictureButton = styled(ItemButton)`
  width: 100%;
  height: 100%;
  min-height: 148px;
  box-sizing: border-box;

  & img {
    flex-shrink: 0;
    width: 120px;
    height: 100px;
    padding: 4px;
    box-sizing: border-box;

    background: white;
    border: 1px solid silver;
    object-fit: contain;
  }

  & span {
    flex-shrink: 0;
    line-height: 16px;
  }
`

export const PictureModal = styled(Modal)`
  width: max-content;
  max-width: calc(100vw - 32px);

  & .window-body {
    overflow: hidden;
  }
`

export const FittedImage = styled.img`
  display: block;
  width: auto;
  height: auto;

  /* Leave room for viewport margins, the window frame, and its title bar. */
  max-width: calc(100vw - 54px);
  max-height: calc(100dvh - 96px);
`
