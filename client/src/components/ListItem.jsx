import styled from 'styled-components'
import { colors, device } from '../styles/stylevars'
import { getRatingColor } from '../utils/display'
import { getGameGamemodes, getGameGenres } from '../utils/data'
import { useContext } from 'react'
import { AppContext } from '../utils/context'

const StyledRating = styled.span`
  border-radius: 25px;
  border-width: 2px;
  border-style: solid;
  font-size: 1rem;
  border-color: ${props=>props.ratingcolor};
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.rating === 0 ? colors.darkgrey : 'inherit'};
`

const StyledTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;
  @media ${device.tablet} {
    display: none;
  };
  &.gamemodes {
    @media ${device.desktop} {
      display: none;
    };
  }
`

const StyledListItemContainer = styled.article`
  background-color: ${colors.black};
  display: flex;
  gap: 1rem;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid ${colors.darkgrey};
  max-height: 100px;
  justify-content: space-between;
  align-items: center;
  &:hover {
    border-radius: 0px;
    border-color: ${colors.green};
    background-color: ${colors.darkgrey};
    & ${StyledTagContainer}:before {
      background-color: ${colors.darkgrey};
    }
  }
`

const StyledPrimaryInfoContainer = styled.div`
  display: flex;
  gap: 1rem;
`

const StyledGameImage = styled.img`
  max-width: 75px;
`

const StyledGameInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  @media ${device.desktop} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  };
`

const StyledGameName = styled.h3`
  font-weight: bold;
  font-size: 1.5rem;
  @media ${device.mobile} {
    font-size: 1rem;
  };
`

const StyledPlatformContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  position: relative;
  @media ${device.mobile} {
    display: none;
  };
`

const StyledTag = styled.span`
  display: block;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid ${colors.grey};
  font-size: 0.75rem;
  height: fit-content;
`

const StyledRatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: 1rem;
`

const StyledNoDataTag = styled.span`
  font-size: 0.75rem;
  color: ${colors.grey};
`

const StyledLineSeparator = styled.div`
  width: 10px;
  height: 10px;
  margin: auto;
  background-color: ${colors.grey};
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  @media ${device.desktop} {
    display: none;
  };
`

const StyledExtendedInfoContainer = styled.div`
  display: flex;
  gap: 1rem;
`

export default function ListItem({ game }) {
  const { genreData, gamemodeData } = useContext(AppContext);
  const gameGenres = getGameGenres(game, genreData);
  const gameGamemodes = getGameGamemodes(game, gamemodeData);
  const gamersRatingColor = getRatingColor(game.IGDBdata.rating);
  const criticsRatingColor = getRatingColor(game.IGDBdata.aggregated_rating);
  const gameUrl = game.IGDBdata.slug ? `https://www.igdb.com/games/${game.IGDBdata.slug}` : null;
  const gamersRating = Math.round(game.IGDBdata.rating) || 0;
  const criticsRating = Math.round(game.IGDBdata.aggregated_rating) || 0;

  return (
    <StyledListItemContainer
      as={gameUrl ? 'a' : 'article'}
      href={gameUrl} 
      target={'_blank'}
    >
      <StyledPrimaryInfoContainer>
        <StyledGameImage src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.IGDBdata.cover_image_id}.png`} />
        <StyledGameInfoContainer>
          <StyledGameName>
            {game.name}
          </StyledGameName>
          <StyledPlatformContainer tagtype="platforms">
            {game.platform.map(platform=>(
              <StyledTag key={`${game.id}-${platform}`}>{platform}</StyledTag>
            ))}
          </StyledPlatformContainer>
        </StyledGameInfoContainer>
      </StyledPrimaryInfoContainer>
      <StyledExtendedInfoContainer>
        <StyledTagContainer tagtype="genres" className='genres'>
          {gameGenres.map(genre=>(
            <StyledTag key={`${game.id}-${genre.id}`}>{genre.name}</StyledTag>
          ))}
          {gameGenres.length === 0 && <StyledNoDataTag>no data</StyledNoDataTag>}
        </StyledTagContainer>
        <StyledLineSeparator/>
        <StyledTagContainer tagtype="gamemodes" className='gamemodes'>
          {gameGamemodes.map(gamemode=>(
            <StyledTag key={`${game.id}-${gamemode.id}`}>{gamemode.name}</StyledTag>
          ))}
          {gameGamemodes.length === 0 && <StyledNoDataTag>no data</StyledNoDataTag>}
        </StyledTagContainer>
        <StyledRatingContainer>
          <StyledRating rating={gamersRating} ratingcolor={gamersRatingColor}>
            {Math.round(gamersRating)}
          </StyledRating>
          <StyledRating rating={criticsRating} ratingcolor={criticsRatingColor}>
            {criticsRating}
          </StyledRating>
        </StyledRatingContainer>
      </StyledExtendedInfoContainer>
    </StyledListItemContainer>
  )
}