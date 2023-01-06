import { colors } from '../style/stylevars'
import styled from 'styled-components'

const StyledGameTableContainer = styled.div`
  & a {
    color: inherit;
    text-decoration: none;
  }
  & tr:first-of-type:hover {
    background-color: inherit;
    font-size: inherit;
  }
  & tr:hover {
    background-color: ${colors.lightblue};
    font-size: 2rem;
  }
  & td:first-of-type {
    text-align: left;
  }
  & td {
    text-align: center;
  }
  overflow-y: scroll;
  height: 90vh;
  border: 1px solid ${colors.green};
  padding: 0.5rem;
`

const StyledGameTable = styled.table`
  width: 100%;
  font-size: 1.25rem;
`

function GameTable({ gameData }) {
  return (
    <StyledGameTableContainer>
      <StyledGameTable>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Gamers</th>
            <th>Critics</th>
          </tr>
          {gameData.map(game=>(
            <tr key={game.id}>
              <td>
                {game.IGDBdata && (
                  <a href={`https://www.igdb.com/games/${game.IGDBdata.slug}`} target="_blank">{game.name}</a>
                )}
                {!game.IGDBdata && game.name}
              </td>
              {game.IGDBdata && (
                <>
                  <td>{game.IGDBdata.rating && Math.round(game.IGDBdata.rating)}</td>
                  <td>{game.IGDBdata.aggregated_rating && Math.round(game.IGDBdata.aggregated_rating)}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </StyledGameTable>
    </StyledGameTableContainer>
  )
}

export default GameTable
