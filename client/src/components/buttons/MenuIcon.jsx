import styled from 'styled-components'
import { colors } from '../../styles/stylevars'

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  fill: white;
  &:hover {
    fill: ${colors.green};
  }
  &.selected {
    fill: ${colors.white};
  }
`

export default function ListIcon({ opened }) {
  return (
    <>
      {!opened && (
        <StyledSvg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M120 816v-60h520v60H120Zm678-52L609 575l188-188 43 43-145 145 146 146-43 43ZM120 604v-60h400v60H120Zm0-208v-60h520v60H120Z"/></StyledSvg>
      )}
      {opened && (
        <StyledSvg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></StyledSvg>
      )}
    </>
  )
}