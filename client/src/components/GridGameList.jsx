import styled from 'styled-components'
import GridItem from './GridItem'
import InfiniteLoader from './layout/InfiniteLoader'
import { useContext } from 'react'
import { AppContext } from '../utils/context'
import { device } from '../styles/stylevars'

const StyledGridGameListContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  padding: 50px;
  justify-content: center;
  @media ${device.mobile} {
    padding: 25px;
  }
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