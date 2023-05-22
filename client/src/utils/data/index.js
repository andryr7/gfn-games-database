export function getRefinedData(
  gameData,
  searchInput,
  sortMode,
  sortDirection,
  selectedGenres,
  selectedGamemodes
  ) {

  const searchFilteredData = gameData.filter(game=>{
    return game.name.toLowerCase().replace(/\s/g, '').includes(searchInput.toLowerCase().replace(/\s/g, ''))
  });
  const sortedData = getSortedData(searchFilteredData, sortMode);
  const sortedDirectedData = sortDirection === 'asc' ? sortedData : sortedData.slice().reverse();
  const genreFilteredData = getGenreFilteredData(sortedDirectedData, selectedGenres);
  const gamemodeFilteredData = getGamemodeFilteredData(genreFilteredData, selectedGamemodes)
  return gamemodeFilteredData
}

function getSortedData(data, dataSortMode) {
  switch (dataSortMode) {
    case 'name':
      return data.sort((a,b)=>{
        if (a.name < b.name) {
          return -1;
        }
        else {
            return 1;
        }
      });
    case 'gamersRating':
      return data.sort((a,b)=>{
        // items cannot be compared
        if (a.IGDBdata === 'no-data' || !a.IGDBdata.rating) {
          return 1;
        }
        if (!b.IGDBdata === 'no-data' || !b.IGDBdata.rating) {
          return -1;
        }
        if (a.IGDBdata.rating > b.IGDBdata.rating) {
          return -1;
        }
        if (a.IGDBdata.rating < b.IGDBdata.rating) {
          return 1;
        }
      });
    case 'criticsRating':
      return data.sort((a,b)=>{
        // items cannot be compared
        if (!a.IGDBdata === 'no-data' || !a.IGDBdata.aggregated_rating) {
          return 1;
        }
        if (!b.IGDBdata === 'no-data' || !b.IGDBdata.aggregated_rating) {
          return -1;
        }
        if (a.IGDBdata.aggregated_rating > b.IGDBdata.aggregated_rating) {
          return -1;
        }
        if (a.IGDBdata.aggregated_rating < b.IGDBdata.aggregated_rating) {
          return 1;
        }
      });
  }
}

function getGenreFilteredData(data, dataGenreFilter) {
  if(dataGenreFilter.includes(0)) {
    return data
  }
  const noIGDBDataFilteredData = data.filter(game => game.IGDBdata !== 'no-data');
  const noGenresFilteredData = noIGDBDataFilteredData.filter(game => game.IGDBdata.genres);
  const genreFilteredData = noGenresFilteredData.filter(game => {
    return game.IGDBdata.genres.some(gameGenre => dataGenreFilter.includes(gameGenre));
  });
  return genreFilteredData;
}

function getGamemodeFilteredData(data, dataGamemodeFilter) {
  if(dataGamemodeFilter.includes(0)) {
    return data
  }
  const noIGDBDataFilteredData = data.filter(game => game.IGDBdata !== 'no-data');
  const noGamemodesFilteredData = noIGDBDataFilteredData.filter(game => game.IGDBdata.game_modes);
  const genreFilteredData = noGamemodesFilteredData.filter(game => {
    return game.IGDBdata.game_modes.some(gameGenre => dataGamemodeFilter.includes(gameGenre));
  });
  return genreFilteredData;
}

export function getGameGenres(game, genres) {
  if(game.IGDBdata.genres === undefined) {
    return []
  }
  return genres.filter(genre => {
    return game.IGDBdata.genres.includes(genre.id)
  })
}

export function getGameGamemodes(game, gamemodes) {
  if(game.IGDBdata.game_modes === undefined) {
    return []
  }
  return gamemodes.filter(gamemode => {
    return game.IGDBdata.game_modes.includes(gamemode.id)
  })
}