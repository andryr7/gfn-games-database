import styled from "styled-components";
import { colors, ratingColors } from '../style/stylevars'

const StyledGameCard = styled.a`
  background-color: ${colors.lightblue};
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  text-align: center;
  gap: 1rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-bottom: 1rem;
`

const StyledNoDataGameCard = styled.div`
  background-color: ${colors.lightblue};
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`

const StyledGameName = styled.h3`
  font-size: 1.5rem;
`

const StyledGameCover = styled.img`
  width: 100%;
`

const StyledTagContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  border: 2px solid ${colors.darkblue};
  margin: 0 1rem;
  border-radius: 5px;
  padding: 0.5rem;
  padding-top: 0.75rem;
  position: relative;
  &:before {
    position: absolute;
    top: -0.65rem;
    left: 0.5rem;
    content: '${props=>props.tagType}';
    color: ${colors.darkblue};
    background-color: ${colors.lightblue};
  }
`

const StyledTag = styled.span`
  display: inline-block;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: ${colors.darkblue};
  width: auto;
`

const StyledRatingContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
  margin-top: auto;
`

const StyledRating = styled.span`
  margin-top: 0.5rem;
  border-radius: 25px;
  border-width: 3px;
  border-style: solid;
  font-size: 1.5rem;
  border-color: ${props=>props.ratingColor};
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

function GameCard({ game, genreData, modeData }) {
  const getGameGenreTags = () => {
    if (game.IGDBdata && game.IGDBdata.genres) {
      return genreData.filter(genre=>{
        return game.IGDBdata.genres.includes(genre.id);
      })
    } else {
      return []
    }
  };

  const getGameModeTags = () => {
    if (game.IGDBdata && game.IGDBdata.game_modes) {
      return modeData.filter(gamemode=>{
        return game.IGDBdata.game_modes.includes(gamemode.id);
      })
    } else {
      return []
    }
  };

  const getRatingColor = () => {
    if (game.IGDBdata && game.IGDBdata.rating) {
      switch (true) {
        case game.IGDBdata.rating>90:
          return ratingColors.legendary;
        case game.IGDBdata.rating>80:
          return ratingColors.epic;
        case game.IGDBdata.rating>70:
          return ratingColors.rare;
        case game.IGDBdata.rating>60:
          return colors.green;
        case game.IGDBdata.rating>50:
          return ratingColors.common;
        default:
          return ratingColors.poor;
      }
    } else {
      return []
    }
  };

  const getCriticsRatingColor = () => {
    if (game.IGDBdata && game.IGDBdata.aggregated_rating) {
      switch (true) {
        case game.IGDBdata.aggregated_rating>90:
          return ratingColors.legendary;
        case game.IGDBdata.aggregated_rating>80:
          return ratingColors.epic;
        case game.IGDBdata.aggregated_rating>70:
          return ratingColors.rare;
        case game.IGDBdata.aggregated_rating>60:
          return colors.green;
        case game.IGDBdata.aggregated_rating>50:
          return ratingColors.common;
        default:
          return ratingColors.poor;
      }
    } else {
      return []
    }
  };
  
  const gameGenreTags = getGameGenreTags();
  const gameModesTags = getGameModeTags();
  const ratingColor = getRatingColor();
  const criticsRatingColor = getCriticsRatingColor();

  return (
    <>
      {!game.IGDBdata && (
        <StyledNoDataGameCard>
          <StyledGameName>
            {game.name}
          </StyledGameName>
          <StyledTagContainer tagType="platforms">
            {game.platform.map(platform=>(
              <StyledTag key={game.id}>{platform}</StyledTag>
            ))}
          </StyledTagContainer>
        </StyledNoDataGameCard>
      )}
      {game.IGDBdata && (
        <StyledGameCard href={`https://www.igdb.com/games/${game.IGDBdata.slug}`} target="_blank">
          <StyledGameCover src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.IGDBdata.cover_image_id}.png`}/>
          <StyledGameName>{game.name}</StyledGameName>
          <StyledTagContainer tagType="platforms">
            {game.platform.map(platform=>(
              <StyledTag key={platform}>{platform}</StyledTag>
            ))}
          </StyledTagContainer>
          {gameGenreTags.length > 0 && (
            <StyledTagContainer tagType="genres">
              {gameGenreTags.map(genre=>(
                <StyledTag key={genre.id}>{genre.name}</StyledTag>
              ))}
            </StyledTagContainer>
          )}
          {gameModesTags.length > 0 && (
            <StyledTagContainer tagType="gamemodes">
              {gameModesTags.map(mode=>(
                <StyledTag key={mode.id}>{mode.name}</StyledTag>
              ))}
            </StyledTagContainer>
          )}
          <StyledRatingContainer>
            {game.IGDBdata.rating && (
              <StyledRatingAligner>
                <span>gamers:</span>
                <StyledRating ratingColor={ratingColor}>
                  {Math.round(game.IGDBdata.rating)}
                </StyledRating>
              </StyledRatingAligner>
            )}
            {game.IGDBdata.aggregated_rating && (
              <StyledRatingAligner>
                <span>critics:</span>
                <StyledRating ratingColor={criticsRatingColor}>
                  {Math.round(game.IGDBdata.aggregated_rating)}
                </StyledRating>
              </StyledRatingAligner>
            )}
          </StyledRatingContainer>
        </StyledGameCard>
      )}
    </>

  )
}

export default GameCard