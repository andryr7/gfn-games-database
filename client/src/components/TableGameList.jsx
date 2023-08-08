import styled from 'styled-components'
import InfiniteLoader from './layout/InfiniteLoader'
import { useContext } from 'react'
import { AppContext } from '../utils/context'
import ListItem from './ListItem'
import { device } from '../styles/stylevars'

const StyledGridGameListContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  @media ${device.tablet} {
    margin-top: 100px;
  };
`

export default function TableGameList() {
  const { displayedGamesCount, refinedData } = useContext(AppContext);

  return (
    <>
      <StyledGridGameListContainer>
        {refinedData.slice(0, displayedGamesCount).map(game => (
          <ListItem key={game.id} game={game} />
        ))}
      </StyledGridGameListContainer>
      {displayedGamesCount < refinedData.length && <InfiniteLoader />}
    </>
  )
}