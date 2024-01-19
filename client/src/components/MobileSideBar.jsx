import styled from "styled-components";
import { colors, device } from "../styles/stylevars";
import LogoBlock from "./SideBar/LogoBlock";
import ViewBlock from "./SideBar/ViewBlock";
import SearchBlock from "./SideBar/SearchBlock";
import SortBlock from "./SideBar/SortBlock";
import GenreFilterBlock from "./SideBar/GenreFilterBlock";
import GamemodeFilterBlock from "./SideBar/GamemodeFilterBlock";
import About from "./SideBar/About";
import FilterReseter from "./SideBar/FilterReseter";
import { useState } from "react";
import GameDataInfo from "./SideBar/GameDataInfo";

const StyledSideBarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  box-sizing: border-box;
  background-color: ${colors.black};
  overflow-y: scroll;
`;

export default function MobileSideBar() {
  const [menuIsOpened, setMenuIsOpened] = useState(false);

  return (
    <StyledSideBarContainer>
      <LogoBlock
        menuIsOpened={menuIsOpened}
        setMenuIsOpened={setMenuIsOpened}
      />
      {menuIsOpened && (
        <>
          <ViewBlock />
          <SearchBlock />
          <SortBlock />
          <GenreFilterBlock />
          <GamemodeFilterBlock />
          <FilterReseter />
          <GameDataInfo />
          <About />
        </>
      )}
    </StyledSideBarContainer>
  );
}
