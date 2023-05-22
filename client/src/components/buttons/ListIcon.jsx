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

export default function ListIcon({ selected = false }) {
  return (
    <StyledSvg className={selected && 'selected'} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M120 857v-60h720v60H120Zm0-166v-60h720v60H120Zm0-167v-60h720v60H120Zm0-167v-60h720v60H120Z"/></StyledSvg>
  )
}