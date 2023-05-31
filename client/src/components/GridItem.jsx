import styled from 'styled-components'
import { colors } from '../styles/stylevars'
import { useContext } from 'react'
import { AppContext } from '../utils/context'

import { getGameGamemodes, getGameGenres } from '../utils/data'
import { getRatingColor } from '../utils/display'

const StyledTagContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  border: 1px solid ${colors.grey};
  border-radius: 5px;
  padding: 0.75rem;
  position: relative;
  &:before {
    transition: all 0.25s;
    font-size: 0.75rem;
    position: absolute;
    top: -0.375rem;
    left: 0.375rem;
    content: '${props=>props.tagtype}';
    color: ${colors.grey};
    background-color: ${colors.black};
  }
`

const StyledGridItemContainer = styled.article`
  background-color: ${colors.black};
  display: flex;
  flex-direction: column;
  /* flex-grow: 1; */
  max-width: 264px;
  gap: 1rem;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid ${colors.darkgrey};
  &:hover {
    border-radius: 0px;
    border-color: ${colors.green};
    background-color: ${colors.darkgrey};
    & ${StyledTagContainer}:before {
      background-color: ${colors.darkgrey};
    }
    transform: scale(1.05);
  }
`

const StyledGameImage = styled.img`
`

const StyledGameInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  padding-top: 0;
`

const StyledGameName = styled.h3`
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
`

const StyledTag = styled.span`
  display: block;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid ${colors.grey};
  width: auto;
  font-size: 0.75rem;
`

const StyledNoDataTag = styled.span`
  font-size: 0.75rem;
  color: ${colors.grey};
`

const StyledRatingContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-evenly;
  justify-self: flex-end;
  padding-bottom: 0.5rem;
`

const StyledRating = styled.span`
  margin-top: 0.5rem;
  border-radius: 25px;
  border-width: 3px;
  border-style: solid;
  font-size: 1rem;
  border-color: ${props=>props.ratingcolor};
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledRatingAligner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default function GridItem ({ game }) {
  const { genreData, gamemodeData } = useContext(AppContext);
  const gameGenres = getGameGenres(game, genreData);
  const gameGamemodes = getGameGamemodes(game, gamemodeData);
  const gamersRatingColor = getRatingColor(game.IGDBdata.rating);
  const criticsRatingColor = getRatingColor(game.IGDBdata.aggregated_rating);
  const gameUrl = game.IGDBdata.slug ? `https://www.igdb.com/games/${game.IGDBdata.slug}` : null;

  return (
    <StyledGridItemContainer
      as={gameUrl ? 'a' : 'article'}
      href={gameUrl} 
      target={'_blank'}
    >
      <StyledGameImage src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.IGDBdata.cover_image_id}.png`} />
      <StyledGameInfoContainer>
        <StyledGameName>
          {game.name}
        </StyledGameName>
        <StyledTagContainer tagtype="platforms">
          {game.platform.map(platform=>(
            <StyledTag key={`${game.id}-${platform}`}>{platform}</StyledTag>
          ))}
        </StyledTagContainer>
        <StyledTagContainer tagtype="genres">
          {gameGenres.map(genre=>(
            <StyledTag key={`${game.id}-${genre.id}`}>{genre.name}</StyledTag>
          ))}
          {gameGenres.length === 0 && <StyledNoDataTag>no data</StyledNoDataTag>}
        </StyledTagContainer>
        <StyledTagContainer tagtype="gamemodes">
          {gameGamemodes.map(gamemode=>(
            <StyledTag key={`${game.id}-${gamemode.id}`}>{gamemode.name}</StyledTag>
          ))}
          {gameGamemodes.length === 0 && <StyledNoDataTag>no data</StyledNoDataTag>}
        </StyledTagContainer>
      </StyledGameInfoContainer>
      <StyledRatingContainer>
        {game.IGDBdata.rating && (
          <StyledRatingAligner>
            <span>gamers:</span>
            <StyledRating ratingcolor={gamersRatingColor}>
              {Math.round(game.IGDBdata.rating)}
            </StyledRating>
          </StyledRatingAligner>
        )}
        {game.IGDBdata.aggregated_rating && (
          <StyledRatingAligner>
            <span>critics:</span>
            <StyledRating ratingcolor={criticsRatingColor}>
              {Math.round(game.IGDBdata.aggregated_rating)}
            </StyledRating>
          </StyledRatingAligner>
        )}
      </StyledRatingContainer>
    </StyledGridItemContainer>
  )
}