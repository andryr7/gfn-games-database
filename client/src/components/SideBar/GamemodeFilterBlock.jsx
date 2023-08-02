import styled from 'styled-components'
import { useContext, useState } from 'react'
import { AppContext } from '../../utils/context'
import SideBarSection from '../layout/SideBarSection'
import SideBarSectionTitle from '../layout/SideBarSectionTitle'
import { colors } from '../../styles/stylevars'
import ExpandButton from '../buttons/ExpandButton'

const StyledGamemodeBlockSection = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

const StyledGamemodeBlockHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  fill: white;
`

const StyledIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledGamemodeBlockContent = styled.div`
  margin-top: 0rem;
  max-height: 0;
  overflow: hidden;
  border-color: ${colors.grey};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 1rem;
  opacity: 0;
  &.displayed {
    opacity: 1;
    margin-top: 1rem;
    max-height: 500px;
    padding: 1rem;
    border: 2px solid ${colors.grey};
    border-radius: 5px;
  }
`

const StyledGamemodeItem = styled.div`
  color: ${colors.grey};
  cursor: pointer;
  user-select: none;
  &.selected {
    color: ${colors.white};
  }
  &:hover {
    color: ${colors.green};
  }
`

function GamemodeIcon() {
  return (
    <StyledSvg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M0 816v-53q0-38.567 41.5-62.784Q83 676 150.376 676q12.165 0 23.395.5Q185 677 196 678.652q-8 17.348-12 35.165T180 751v65H0Zm240 0v-65q0-32 17.5-58.5T307 646q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-19.861-3.5-37.431Q773 696 765 678.727q11-1.727 22.171-2.227 11.172-.5 22.829-.5 67.5 0 108.75 23.768T960 763v53H780Zm-480-60h360v-6q0-37-50.5-60.5T480 666q-79 0-129.5 23.5T300 751v5ZM149.567 646Q121 646 100.5 625.438 80 604.875 80 576q0-29 20.562-49.5Q121.125 506 150 506q29 0 49.5 20.5t20.5 49.933Q220 605 199.5 625.5T149.567 646Zm660 0Q781 646 760.5 625.438 740 604.875 740 576q0-29 20.562-49.5Q781.125 506 810 506q29 0 49.5 20.5t20.5 49.933Q880 605 859.5 625.5T809.567 646ZM480 576q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600 456q0 50-34.5 85T480 576Zm.351-60Q506 516 523 498.649t17-43Q540 430 522.851 413t-42.5-17Q455 396 437.5 413.149t-17.5 42.5Q420 481 437.351 498.5t43 17.5ZM480 756Zm0-300Z"/></StyledSvg>
  )
}

export default function GamemodeFilterBlock() {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    gamemodeData,
    selectedGamemodes,
    setSelectedGamemodes
  } = useContext(AppContext);

  const handleGamemodeItemClick = (genreId) => {
    //0 represents all genres
    if(genreId === 0) {
      setSelectedGamemodes([0]);
      return
    }
    if(selectedGamemodes.includes(0)) {
      setSelectedGamemodes([genreId]);
      return
    }
    if(selectedGamemodes.includes(genreId) && selectedGamemodes.length === 1) {
      setSelectedGamemodes([0]);
      return
    }
    if(selectedGamemodes.includes(genreId)) {
      const newSelectedGamemodes = selectedGamemodes.filter(id => id !== genreId);
      setSelectedGamemodes(newSelectedGamemodes);
      return
    }
    setSelectedGamemodes(current => [...current, genreId]);
  }

  const handleStopPropagation = (event) => {
    event.stopPropagation();
  }

  return (
    <SideBarSection>
      <StyledGamemodeBlockSection onClick={() => setIsExpanded(current => !current)} >
        <StyledGamemodeBlockHeader>
          <StyledIconWrapper>
            <GamemodeIcon/>
          </StyledIconWrapper>
          <SideBarSectionTitle>
            gamemodes
          </SideBarSectionTitle>
          <ExpandButton active={isExpanded} />
        </StyledGamemodeBlockHeader>
        <StyledGamemodeBlockContent className={isExpanded && 'displayed'} onClick={handleStopPropagation}>
          <StyledGamemodeItem className={selectedGamemodes.includes(0) && 'selected'} onClick={() => {handleGamemodeItemClick(0)}}>
            All
          </StyledGamemodeItem>
          {gamemodeData.map(gamemode => (
            <StyledGamemodeItem key={gamemode.id} className={selectedGamemodes.includes(gamemode.id) && 'selected'} onClick={() => {handleGamemodeItemClick(gamemode.id)}}>
              {gamemode.name}
            </StyledGamemodeItem>
          ))}
        </StyledGamemodeBlockContent>
      </StyledGamemodeBlockSection>
    </SideBarSection>
  )
}