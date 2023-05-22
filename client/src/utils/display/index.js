import { ratingColors } from '../../styles/stylevars'

export function getGamersRatingColor(game) {
  if(!game.IGDBdata.rating) {
    return null
  }
  switch (true) {
    case game.IGDBdata.rating > 90:
      return ratingColors.legendary;
    case game.IGDBdata.rating > 80:
      return ratingColors.epic;
    case game.IGDBdata.rating > 70:
      return ratingColors.rare;
    case game.IGDBdata.rating > 60:
      return ratingColors.uncommon;
    case game.IGDBdata.rating > 50:
      return ratingColors.common;
    default:
      return ratingColors.poor;
  }
}

export function getCriticsRatingColor(game) {
  if(!game.IGDBdata.aggregated_rating) {
    return null
  }
  switch (true) {
    case game.IGDBdata.aggregated_rating > 90:
      return ratingColors.legendary;
    case game.IGDBdata.aggregated_rating > 80:
      return ratingColors.epic;
    case game.IGDBdata.aggregated_rating > 70:
      return ratingColors.rare;
    case game.IGDBdata.aggregated_rating > 60:
      return ratingColors.uncommon;
    case game.IGDBdata.aggregated_rating > 50:
      return ratingColors.common;
    default:
      return ratingColors.poor;
  }
}