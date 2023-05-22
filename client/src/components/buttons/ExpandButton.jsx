import styled from 'styled-components'
import { colors } from '../../styles/stylevars'

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  fill: white;
`

const StyledExpandButton = styled.button`
  height: 36px;
  width: 36px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
	background-color: none;
	padding: 0;
  background: none;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  &.selected {
    transform: rotate(180deg);
  }
  &:hover ${StyledSvg} {
    fill: ${colors.green}
  }
`

function ExpandIcon() {
  return (
    <StyledSvg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z"/></StyledSvg>
  )
}


export default function ExpandButton({ active, onClick }) {
  return (
    <StyledExpandButton onClick={onClick} className={active && 'selected'}>
      <ExpandIcon />
    </StyledExpandButton>
  )
}