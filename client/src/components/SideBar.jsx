import styled from "styled-components"
import { colors, device } from "../styles/stylevars"
import LogoBlock from "./SideBar/LogoBlock"
import ViewBlock from './SideBar/ViewBlock'
import SearchBlock from "./SideBar/SearchBlock"
import SortBlock from "./SideBar/SortBlock"
import GenreFilterBlock from './SideBar/GenreFilterBlock'
import GamemodeFilterBlock from "./SideBar/GamemodeFilterBlock"
import GameCount from "./SideBar/GameCount"
import About from "./SideBar/About"
import { useContext } from "react"
import { AppContext } from "../utils/context"
import FilterReseter from "./SideBar/FilterReseter"

const StyledSideBarContainer = styled.div`
  position: sticky;
  top: 0;
  max-width: min(25vw, 500px);
  height: 100vh;
  z-index: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  box-sizing: border-box;
  background-color: ${colors.black};
  overflow-y: scroll;
  @media ${device.tablet} {
    max-width: 100%;
    width: 100%;
    height: auto;
    max-height: 100%;
  };
`

export default function SideBar() {
  const { menuIsOpened } = useContext(AppContext);

  return (
    <StyledSideBarContainer>
      <LogoBlock />
      {menuIsOpened && (
      <>
        <ViewBlock />
        <SearchBlock />
        <SortBlock />
        <GenreFilterBlock />
        <GamemodeFilterBlock />
        <FilterReseter />
        <GameCount />
        <About />
      </>
      )}
    </StyledSideBarContainer>
  )
}