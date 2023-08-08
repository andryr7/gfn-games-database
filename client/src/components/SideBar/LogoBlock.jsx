import styled from "styled-components"
import { colors, device } from "../../styles/stylevars"
import MenuIcon from '../buttons/MenuIcon'

const StyledLogoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  @media ${device.tablet} {
    flex-direction: row;
  };
`

const StyledTitleFirstPart = styled.h2`
  font-size: 110px;
  font-weight: 700;
  color: ${colors.green};
  @media ${device.tablet} {
    font-size: 50px;
  };
`

const StyledTitleSecondPart = styled.h1`
  font-size: 50px;
  @media ${device.tablet} {
    font-size: 22px;
  };
`

const StyledModeSelector = styled.button`
  height: 50px;
  width: 50px;
  border: none;
  display: none;
  justify-content: center;
  align-items: center;
	background-color: ${colors.grey};
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  border-radius: 10px;
  &.selected {
    background-color: ${colors.green};
  }
  @media ${device.tablet} {
    display: flex;
  };
`

const SideBarSection = styled.div`
  background-color: ${colors.darkgrey};
  border-radius: 10px;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  @media ${device.tablet} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    height: 85px;
  };
`

export default function LogoBlock({ menuIsOpened, setMenuIsOpened }) {
  return (
    <SideBarSection>
      <StyledLogoBlock>
        <StyledTitleFirstPart>
          GFN
        </StyledTitleFirstPart>
        <StyledTitleSecondPart>
          database
        </StyledTitleSecondPart>
      </StyledLogoBlock>
      <StyledModeSelector onClick={() => setMenuIsOpened(current => !current)}>
        <MenuIcon opened={menuIsOpened}/>
      </StyledModeSelector>
    </SideBarSection>
  )
}