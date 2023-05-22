import styled from 'styled-components'
import { useContext, useState } from 'react'
import { AppContext } from '../../utils/context'
import SideBarSection from '../layout/SideBarSection'
import SideBarSectionTitle from '../layout/SideBarSectionTitle'
import { colors } from '../../styles/stylevars'
import ExpandButton from '../buttons/ExpandButton'

const StyledSortBlockSection = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

const StyledSortBlockHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  fill: white;
  transition: none;
  &.reversed {
    transform: scaleX(-1);
  }
`

const StyledIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  &:hover ${StyledSvg} {
    fill: ${colors.green};
  };
`

const StyledSortBlockContent = styled.div`
  margin-top: 0rem;
  max-height: 0;
  overflow: hidden;
  border-color: ${colors.grey};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  opacity: 0;
  &.displayed {
    opacity: 1;
    margin-top: 1rem;
    max-height: 100px;
    padding: 1rem;
    border: 2px solid ${colors.grey};
    border-radius: 10px;
  }
`

const StyledSortItem = styled.div`
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

function SortIcon({ reversed }) {
  return (
    <StyledSvg className={reversed && 'reversed'} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M322 606V290L202 410l-42-42 193-193 193 193-42 42-122-121v317h-60Zm285 369L414 781l42-41 120 120V544h60v317l122-121 42 42-193 193Z"/></StyledSvg>
  )
}

export default function SortBlock() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { sortMode, setSortMode, sortDirection, setSortDirection } = useContext(AppContext);

  const handleSortButtonClick = (event) => {
    if (sortDirection === 'asc') {
      setSortDirection('desc');
      event.stopPropagation();
      return
    }
    setSortDirection('asc');
    event.stopPropagation();
  }

  const handleSortItemClick = (newSortMode) => {
    if (newSortMode === sortMode) {
      setSortDirection(current => current === 'asc' ? 'desc' : 'asc');
      return
    }
    setSortMode(newSortMode);
    setSortDirection('asc');
  }
  
  const handleStopPropagation = (event) => {
    event.stopPropagation();
  }

  return (
    <SideBarSection>
      <StyledSortBlockSection onClick={() => setIsExpanded(current => !current)} >
        <StyledSortBlockHeader>
          <StyledIconWrapper onClick={handleSortButtonClick}>
            <SortIcon reversed={sortDirection === 'desc'}/>
          </StyledIconWrapper>
          <SideBarSectionTitle>
            sort by
          </SideBarSectionTitle>
          <ExpandButton active={isExpanded} />
        </StyledSortBlockHeader>
        <StyledSortBlockContent className={isExpanded && 'displayed'} onClick={handleStopPropagation}>
          <StyledSortItem className={sortMode === 'name' && 'selected'} onClick={() => {handleSortItemClick('name')}}>
            name
          </StyledSortItem>
          <StyledSortItem  className={sortMode === 'criticsRating' && 'selected'} onClick={() => {handleSortItemClick('criticsRating')}}>
            critics rating
          </StyledSortItem>
          <StyledSortItem  className={sortMode === 'gamersRating' && 'selected'} onClick={() => {handleSortItemClick('gamersRating')}}>
            gamers rating
          </StyledSortItem>
        </StyledSortBlockContent>
      </StyledSortBlockSection>
    </SideBarSection>
  )
}