import { colors, device } from "../style/stylevars"
import styled from "styled-components"
import cancelIcon from '../assets/cancel.svg'

const StyledSearchBarContainer = styled.div`
  background-color: ${colors.lightblue};
  font-size: 1.5rem;
  border-radius: 10px;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  box-sizing: border-box;
  @media ${device.mobile} {
    flex-direction: column;
  };
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
      <span>Search:</span>
      <input onChange={handleSearchInputChange}  type="text" id="name" name="name" size="25" value={searchValue} autoComplete="off"/>
      <StyledCancelButton src={cancelIcon} onClick={handleCancelButtonClick}/>
    </StyledSearchBarContainer>
  )
}

export default SearchBar
