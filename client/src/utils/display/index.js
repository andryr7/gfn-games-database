import { ratingColors } from '../../styles/stylevars'

export function getRatingColor(rating) {
  if (!rating) {
    return null
  }
  switch (true) {
    case rating > 90:
      return ratingColors.legendary;
    case rating > 80:
      return ratingColors.epic;
    case rating > 70:
      return ratingColors.rare;
    case rating > 60:
      return ratingColors.uncommon;
    case rating > 50:
      return ratingColors.common;
    default:
      return ratingColors.poor;
  }
}