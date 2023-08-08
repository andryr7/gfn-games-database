import styled from 'styled-components'
import GridItem from './GridItem'
import InfiniteLoader from './layout/InfiniteLoader'
import { useContext } from 'react'
import { AppContext } from '../utils/context'
import { device } from '../styles/stylevars'

const StyledGridGameListContainer = styled.section`
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(264px, 1fr) );
  justify-items: center;
  padding: 25px;
  gap: 25px;
  @media ${device.tablet} {
    margin-top: 100px;
  };
`

export default function GridGameList() {
  const { displayedGamesCount, refinedData } = useContext(AppContext);

  return (
    <>
      <StyledGridGameListContainer>
        {refinedData.slice(0, displayedGamesCount).map(game => (
          <GridItem key={game.id} game={game} />
        ))}
      </StyledGridGameListContainer>
      {displayedGamesCount < refinedData.length && <InfiniteLoader />}
    </>
  )
}