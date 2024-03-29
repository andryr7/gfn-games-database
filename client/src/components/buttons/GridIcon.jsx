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

export default function GridIcon({ selected = false }) {
  return (
    <StyledSvg className={selected && 'selected'} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h160V716H180v160Zm220 0h160V716H400v160Zm220 0h160V716H620v160ZM180 656h160V496H180v160Zm220 0h160V496H400v160Zm220 0h160V496H620v160ZM180 436h160V276H180v160Zm220 0h160V276H400v160Zm220 0h160V276H620v160Z"/></StyledSvg>
  )
}