import styled from "styled-components"
import { colors } from "../../styles/stylevars"
import SideBarSection from "./../layout/SideBarSection"
import SearchIcon from '../buttons/SearchIcon'
import EraseIcon from "../buttons/EraseIcon"
import { useContext } from "react"
import { AppContext } from "../../utils/context"

const StyledSearchBlock = styled.div`
  display: flex;
  gap: 0.5rem;
`

const StyledIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  &.erase {
    cursor: pointer;
  };
`

const StyledInput = styled.input`
  border-radius: 10px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  box-sizing: border-box;
  font-size: 1.5rem;
  font-family: 'DM Sans', sans-serif;
  outline: none !important;
  border: 2px solid ${colors.grey};
  &:focus {
    border: 2px solid ${colors.green}
  }
  width: 100%;
`

export default function SearchBlock() {
  const { searchInput, setSearchInput } = useContext(AppContext);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleEraseClick = () => {
    setSearchInput('');
  }

  return (
    <SideBarSection>
      <StyledSearchBlock>
        <StyledIconWrapper>
          <SearchIcon />
        </StyledIconWrapper>
        <StyledInput type="text" placeholder="search" value={searchInput} autoFocus onChange={handleInputChange}/>
        <StyledIconWrapper onClick={handleEraseClick} className="erase">
          <EraseIcon />
        </StyledIconWrapper>
      </StyledSearchBlock>
    </SideBarSection>
  )
}