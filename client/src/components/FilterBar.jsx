import styled from "styled-components"
import { colors, device } from "../style/stylevars"
import { useState } from "react"
import ArrowIcon from '../assets/arrow_up.svg'
import DropdownIcon from '../assets/arrow_dropdown.svg'

const StyledFilterBarContainer = styled.div`
  background-color: ${colors.lightblue};
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.5rem;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 10px;
  @media ${device.mobile} {
    flex-wrap: wrap;
  };
`

const StyledSecondaryFilterBarContainer = styled.div`
  background-color: ${colors.lightblue};
  box-sizing: border-box;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`

const StyledFilter = styled.button`
  background-color: transparent;
  border-width: 0;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  padding: 0;
  flex-grow: 3.5;
  text-align: center;
  color: inherit;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &.small-filter {
    flex-grow: 1;
  }
  &:hover {
    color: ${colors.darkblue}
  }
  &.selected {
    color: ${colors.green}
  }
`

const StyledDivider = styled.div`
  height: 3rem;
  width: 3px;
  border-radius: 5px;
  background-color: ${colors.darkblue};
  @media ${device.mobile} {
    display: none;
  };
`

const StyledIcon = styled.img`
  width: 3rem;
  transition: transform 0.5s;
  &.reversed {
    transform: rotate3d(1, 0, 0, 180deg);
  }
`

const StyledTag = styled.div`
  display: inline-block;
  padding: 0.5rem;
  background-color: ${colors.darkblue};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.green};
  }
  &.selected {
    background-color: ${colors.green};
  }
`

function FilterBar({
  selectedSorting, 
  setSelectedSorting, 
  genreData, 
  modeData, 
  selectedGenreFilter,
  setSelectedGenreFilter,
  selectedModeFilter,
  setSelectedModeFilter,
  setCurrentPage
}) {

  const [genreMenuIsOpened, setGenreMenuIsOpened] = useState(false);
  const [modeMenuIsOpened, setModeMenuIsOpened] = useState(false);

  const handleNameFilterClick = () => {
    switch (selectedSorting) {
      case 'name-asc':
        setSelectedSorting('name-desc')
        break;
      default:
        setSelectedSorting('name-asc')
        break;
    };
    setCurrentPage(1);
  };

  const handleGamersRatingFilterClick = () => {
    switch (selectedSorting) {
      case 'gamersrating-asc':
        setSelectedSorting('gamersrating-desc')
        break;
      default:
        setSelectedSorting('gamersrating-asc')
        break;
    };
    setCurrentPage(1);
  };

  const handleCriticsRatingFilterClick = () => {
    switch (selectedSorting) {
      case 'criticsrating-asc':
        setSelectedSorting('criticsrating-desc')
        break;
      default:
        setSelectedSorting('criticsrating-asc')
        break;
    };
    setCurrentPage(1);
  };

  const handleTagClick = (tagtype, tagid) => {
    switch (tagtype) {
      case 'genre':
        if(selectedGenreFilter.includes('all')) {
          setSelectedGenreFilter([tagid]);
        }
        else if(selectedGenreFilter.includes(tagid)) {
          if (selectedGenreFilter.length==1) {
            setSelectedGenreFilter(['all']);
          }
          else {
            const filteredarray = selectedGenreFilter.filter(tag=>tag!=tagid);
            setSelectedGenreFilter(filteredarray);
          }
        }
        else if (!selectedGenreFilter.includes(tagid)) {
          setSelectedGenreFilter([...selectedGenreFilter, tagid]);
        };
        break;
      case 'mode':
        if(selectedModeFilter.includes('all')) {
          setSelectedModeFilter([tagid]);
        }
        else if(selectedModeFilter.includes(tagid)) {
          if (selectedModeFilter.length==1) {
            setSelectedModeFilter(['all']);
          }
          else {
            const filteredarray = selectedModeFilter.filter(tag=>tag!=tagid);
            setSelectedModeFilter(filteredarray);
          }
        }
        else if (!selectedModeFilter.includes(tagid)) {
          setSelectedModeFilter([...selectedModeFilter, tagid]);
        };
        break;
    };
    setCurrentPage(1);
  };

  const handleSecondaryFilterClick = (filtertype) => {
    switch (filtertype) {
      case 'genre':
        genreMenuIsOpened ? setGenreMenuIsOpened(false) : setGenreMenuIsOpened(true);
        break;
      case 'mode':
        modeMenuIsOpened ? setModeMenuIsOpened(false) : setModeMenuIsOpened(true);
        break;
    };
    setCurrentPage(1);
  };

  const handleClickAllGenresTag = () => {
    setSelectedGenreFilter(['all']);
    setCurrentPage(1);
  };

  const handleClickAllModesTag = () => {
    setSelectedModeFilter(['all']);
    setCurrentPage(1);
  };

  return (
    <>
      <StyledFilterBarContainer>
        <StyledFilter onClick={handleNameFilterClick} className={selectedSorting==='name-asc' || selectedSorting==='name-desc'?'selected':''}>
          name
          <StyledIcon className={selectedSorting!=='name-desc'&&'reversed'} src={ArrowIcon}/>
        </StyledFilter>
        <StyledDivider/>
        <StyledFilter 
          className={selectedGenreFilter!='all' ? 'selected' : ''}
          onClick={()=>{handleSecondaryFilterClick('genre')}}
          
        >
          genre
          <StyledIcon className={genreMenuIsOpened && 'reversed'} src={DropdownIcon}/>
        </StyledFilter>
        <StyledDivider/>
        <StyledFilter
          className={selectedModeFilter!='all' ? 'selected' : ''}
          onClick={()=>{handleSecondaryFilterClick('mode')}}
        >
          modes
          <StyledIcon className={modeMenuIsOpened && 'reversed'} src={DropdownIcon}/>
        </StyledFilter>
        <StyledDivider/>
        <StyledFilter 
          onClick={handleGamersRatingFilterClick} 
          className={selectedSorting==='gamersrating-asc' || selectedSorting==='gamersrating-desc'?'selected small-filter':'small-filter'}
        >
          gamers<br/>rating
          <StyledIcon className={selectedSorting!=='gamersrating-desc'&&'reversed'} src={ArrowIcon}/>
        </StyledFilter>
        <StyledDivider/>
        <StyledFilter 
          onClick={handleCriticsRatingFilterClick} 
          className={selectedSorting==='criticsrating-asc' || selectedSorting==='criticsrating-desc'?'selected small-filter':'small-filter'}
        >
          critics<br/>rating
          <StyledIcon className={selectedSorting!=='criticsrating-desc'&&'reversed'} src={ArrowIcon}/>
        </StyledFilter>
      </StyledFilterBarContainer>
      {genreMenuIsOpened && (
        <StyledSecondaryFilterBarContainer>
          <StyledTag onClick={handleClickAllGenresTag} className={selectedGenreFilter=='all' && 'selected'}>All</StyledTag>
          {genreData.map(genre=>(
            <StyledTag 
              key={genre.id} 
              onClick={()=>{handleTagClick('genre', genre.id)}}
              className={selectedGenreFilter.includes(genre.id) ? 'selected' : ''}
              >{genre.name}</StyledTag>
          ))}
        </StyledSecondaryFilterBarContainer>
      )}
      {modeMenuIsOpened && (
        <StyledSecondaryFilterBarContainer>
          <StyledTag onClick={handleClickAllModesTag} className={selectedModeFilter=='all' && 'selected'}>All</StyledTag>
          {modeData.map(mode=>(
            <StyledTag 
              key={mode.id}
              onClick={()=>{handleTagClick('mode', mode.id)}}
              className={selectedModeFilter.includes(mode.id) ? 'selected' : ''}
            >{mode.name}</StyledTag>
          ))}
        </StyledSecondaryFilterBarContainer>
      )}
    </>
  )
}

export default FilterBar
