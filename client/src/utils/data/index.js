export function getRefinedData(
  gameData,
  searchInput,
  sortMode,
  sortDirection,
  selectedGenres,
  selectedGamemodes
  ) {

  // Filtering games according to the seach input
  const searchFilteredData = gameData.filter(game=>{
    return game.name.toLowerCase().replace(/\s/g, '').includes(searchInput.toLowerCase().replace(/\s/g, ''))
  });

  // Applying sorting to the data
  const sortedData = getSortedData(searchFilteredData, sortMode);

  // Reversing the order of elements if necessary
  const sortedDirectedData = sortDirection === 'asc' ? sortedData : sortedData.slice().reverse();

  //  Filtering the data
  const genreFilteredData = getGenreFilteredData(sortedDirectedData, selectedGenres);
  const gamemodeFilteredData = getGamemodeFilteredData(genreFilteredData, selectedGamemodes)

  // Returning the processed data
  return gamemodeFilteredData
}

function getSortedData(data, dataSortMode) {
  switch (dataSortMode) {
    case 'name':
      return data.sort((a,b)=>{
        if (a.name < b.name) {
          return -1;
        }
        else if (a.name > b.name){
            return 1;
        }
        return 0;
      });
    case 'gamersRating':
      // Filtering out games with no data, then applying the sorting method
      return data.filter(game => game.IGDBdata.rating).sort((a,b)=>{
        if (a.IGDBdata.rating > b.IGDBdata.rating) {
          return -1;
        } else if (a.IGDBdata.rating < b.IGDBdata.rating) {
          return 1;
        }
        return 0;
      });
    case 'criticsRating':
      // Filtering out games with no data, then applying the sorting method
      return data.filter(game => game.IGDBdata.aggregated_rating).sort((a,b)=>{
        if (a.IGDBdata.aggregated_rating > b.IGDBdata.aggregated_rating) {
          return -1;
        } else if (a.IGDBdata.aggregated_rating < b.IGDBdata.aggregated_rating) {
          return 1;
        }
        return 0;
      });
  }
}

function getGenreFilteredData(data, dataGenreFilter) {
  // If the filter is 0, meaning all genres are displayed, return all games
  if (dataGenreFilter.includes(0)) {
    return data;
  }

  // Else, filter out games without data and unwanted genres
  return data.filter(game => {
    return (
      game.IGDBdata !== 'no-data' &&
      game.IGDBdata.genres &&
      game.IGDBdata.genres.some(gameGenre => dataGenreFilter.includes(gameGenre))
    );
  });
}

function getGamemodeFilteredData(data, dataGamemodeFilter) {
  // If the filter is 0, meaning all gamemodes are displayed, return all games
  if (dataGamemodeFilter.includes(0)) {
    return data;
  }

  // Else, filter out games without data and unwanted gamemodes
  return data.filter(game => {
    return (
      game.IGDBdata !== 'no-data' &&
      game.IGDBdata.game_modes &&
      game.IGDBdata.game_modes.some(gameMode => dataGamemodeFilter.includes(gameMode))
    );
  });
}

// Function that returns an array containing the names of the genres of a game
export function getGameGenres(game, genres) {
  if(game.IGDBdata.genres === undefined) {
    return []
  }
  return genres.filter(genre => {
    return game.IGDBdata.genres.includes(genre.id)
  })
}

// Function that returns an array containing the names of the gamemodes of a game
export function getGameGamemodes(game, gamemodes) {
  if(game.IGDBdata.game_modes === undefined) {
    return []
  }
  return gamemodes.filter(gamemode => {
    return game.IGDBdata.game_modes.includes(gamemode.id)
  })
}