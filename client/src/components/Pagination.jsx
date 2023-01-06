import styled from "styled-components";
import nexticon from '../assets/small_arrow.svg';
import { colors } from '../style/stylevars';

const StyledPaginationContainer = styled.div`
  background-color: ${colors.lightblue};
  align-self: center;
  margin-top: auto;
  display: flex;
  align-items: center;
  border-radius: 10px;
  font-size: 2rem;
  gap: 0.5rem;
`

const StyledArrowIcon = styled.img`
  cursor: pointer;
  &:first-of-type {
    transform: rotate(180deg);
    &:hover {
      transform: scale(1.5) rotate(180deg);
    }
  }
  &:hover {
    transform: scale(1.5);
  }
`

function Pagination({ currentPage, setCurrentPage, pageCount, executeScroll }) {
  const handlePreviousPage = () => {
    switch (currentPage) {
      case 1:
        return
      default:
        setCurrentPage(currentPage-1);
        executeScroll();
        break;
    }
  }

  const handleNextPage = () => {
    switch (currentPage) {
      case pageCount:
        return
      default:
        setCurrentPage(currentPage+1);
        executeScroll();
        break;
    }
  }

  return (
    <StyledPaginationContainer>
      <StyledArrowIcon src={nexticon} onClick={handlePreviousPage}/>
        {currentPage} / {pageCount}
      <StyledArrowIcon src={nexticon} onClick={handleNextPage}/>
    </StyledPaginationContainer>
  )
}

export default Pagination
