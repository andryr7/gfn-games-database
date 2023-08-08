import styled from "styled-components"
import { colors } from "../styles/stylevars"
import LogoBlock from "./SideBar/LogoBlock"
import ViewBlock from './SideBar/ViewBlock'
import SearchBlock from "./SideBar/SearchBlock"
import SortBlock from "./SideBar/SortBlock"
import GenreFilterBlock from './SideBar/GenreFilterBlock'
import GamemodeFilterBlock from "./SideBar/GamemodeFilterBlock"
import GameCount from "./SideBar/GameCount"
import About from "./SideBar/About"
import FilterReseter from "./SideBar/FilterReseter"

const StyledSideBarContainer = styled.div`
  position: sticky;
  top: 0;
  max-width: min(25vw, 500px);
  height: 100vh;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  box-sizing: border-box;
  background-color: ${colors.black};
  overflow-y: auto;
`

export default function DesktopSideBar() {
  return (
    <StyledSideBarContainer>
      <LogoBlock />
      <ViewBlock />
      <SearchBlock />
      <SortBlock />
      <GenreFilterBlock />
      <GamemodeFilterBlock />
      <FilterReseter />
      <GameCount />
      <About />
    </StyledSideBarContainer>
  )
}