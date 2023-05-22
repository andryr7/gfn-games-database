import styled from 'styled-components'
import { useContext, useState } from 'react'
import { AppContext } from '../../utils/context'
import SideBarSection from '../layout/SideBarSection'
import SideBarSectionTitle from '../layout/SideBarSectionTitle'
import { colors } from '../../styles/stylevars'
import ExpandButton from '../buttons/ExpandButton'

const StyledGenreBlockSection = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

const StyledGenreBlockHeader = styled.div`
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

const StyledGenreBlockContent = styled.div`
  margin-top: 0rem;
  max-height: 0;
  overflow: hidden;
  border-color: ${colors.grey};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  //TODO MAX WIDTHHHHHHHHHHHHHHHHHHH
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

const StyledGenreItem = styled.div`
  font-size: 1rem;
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

function GenreIcon() {
  return (
    <StyledSvg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m561 517-42-42 119-119-118-117 42-42 118 117 119-119 42 42-119 119 119 119-42 42-119-119-119 119ZM80 536l200-360 200 360H80Zm201 400q-66 0-113-47t-47-113q0-67 47-113.5T281 616q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-99-400h196l-98-176-98 176Zm338 460V616h320v320H520Zm60-60h200V676H580v200ZM280 388Zm1 388Zm399 0Z"/></StyledSvg>
  )
}

export default function GenreFilterBlock() {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    genreData,
    selectedGenres,
    setSelectedGenres,
  } = useContext(AppContext);

  const handleGenreItemClick = (genreId) => {
    //0 represents all genres
    if(genreId === 0) {
      setSelectedGenres([0]);
      return
    }
    if(selectedGenres.includes(0)) {
      setSelectedGenres([genreId]);
      return
    }
    if(selectedGenres.includes(genreId) && selectedGenres.length === 1) {
      setSelectedGenres([0]);
      return
    }
    if(selectedGenres.includes(genreId)) {
      const newSelectedGenres = selectedGenres.filter(id => id !== genreId);
      setSelectedGenres(newSelectedGenres);
      return
    }
    setSelectedGenres(current => [...current, genreId]);
  }

  const handleStopPropagation = (event) => {
    event.stopPropagation();
  }

  return (
    <SideBarSection>
      <StyledGenreBlockSection onClick={() => setIsExpanded(current => !current)} >
        <StyledGenreBlockHeader>
          <StyledIconWrapper>
            <GenreIcon/>
          </StyledIconWrapper>
          <SideBarSectionTitle>
            genres
          </SideBarSectionTitle>
          <ExpandButton active={isExpanded} />
        </StyledGenreBlockHeader>
        <StyledGenreBlockContent onClick={handleStopPropagation} className={isExpanded && 'displayed'}>
          <StyledGenreItem className={selectedGenres.includes(0) && 'selected'} onClick={() => {handleGenreItemClick(0)}}>
            All
          </StyledGenreItem>
          {genreData.map(genre => (
            <StyledGenreItem key={genre.id} className={selectedGenres.includes(genre.id) && 'selected'} onClick={() => {handleGenreItemClick(genre.id)}}>
              {genre.name}
            </StyledGenreItem>
          ))}
        </StyledGenreBlockContent>
      </StyledGenreBlockSection>
    </SideBarSection>
  )
}