import { colors, device } from "../style/stylevars"
import styled from "styled-components"
import cancelIcon from '../assets/cancel.svg'
import searchIcon from '../assets/search.svg'

const StyledSearchBarContainer = styled.div`
  background-color: ${colors.lightblue};
  font-size: 1.5rem;
  border-radius: 10px;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  box-sizing: border-box;
`

const StyledCancelButton = styled.img`
  cursor: pointer;
  &:hover {
    transform: scale(0.85);
  }
  &:active {
    transform: scale(0.75);
  }
`

function SearchBar({ searchValue, setSearchValue, setCurrentPage }) {
  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleCancelButtonClick = () => {
    setSearchValue('');
  }

  return (
    <StyledSearchBarContainer>
      <img src={searchIcon}/>
      <input onChange={handleSearchInputChange}  type="text" value={searchValue} autoComplete="off"/>
      <StyledCancelButton src={cancelIcon} onClick={handleCancelButtonClick}/>
    </StyledSearchBarContainer>
  )
}

export default SearchBar
