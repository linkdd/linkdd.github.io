import styled from '@emotion/styled'

import Button from '@/components/base/Button'

export const StartArea = styled.div`
  position: relative;
  flex-shrink: 0;
`

export const StartButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  padding: 4px 8px;

  cursor: pointer;
`

export const StartMenuPanel = styled.nav`
  position: absolute;
  bottom: calc(100% + 6px);
  left: 0;
  width: 230px;
  max-height: min(400px, 75dvh);
  overflow: auto;
  display: flex;

  & > div:last-child {
    flex: 1;
  }

`

export const ProfileLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  color: inherit;
  text-decoration: none;

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    flex-shrink: 0;
  }

  &:hover,
  &:focus-visible {
    background: navy;
    color: white;
  }
`

export const Brand = styled.div`
  background: #808080;
  color: silver;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 22px;
  padding: 12px 6px;
`
