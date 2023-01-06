export const filterGameDataByGenre = (array, genreValues) => {
  if (genreValues == 'all') {
    return array
  };
  const noIGDBDataFiltered = array.filter(game=>{
    return game.IGDBdata;
  });
  const noGenreDataFiltered = noIGDBDataFiltered.filter(game=>{
    return game.IGDBdata.genres;
  });
  const genreFilteredData = noGenreDataFiltered.filter(game=>{
    return game.IGDBdata.genres.some(gamegenre=> genreValues.includes(gamegenre));
  });
  return genreFilteredData;
}

export const filterGameDataByMode = (array, modeValues) => {
  if (modeValues == 'all') {
    return array
  };
  const noIGDBDataFiltered = array.filter(game=>{
    return game.IGDBdata;
  });
  const noGenreDataFiltered = noIGDBDataFiltered.filter(game=>{
    return game.IGDBdata.game_modes;
  });
  const genreFilteredData = noGenreDataFiltered.filter(game=>{
    return game.IGDBdata.game_modes.some(gamemode=> modeValues.includes(gamemode));
  });
  return genreFilteredData;
}