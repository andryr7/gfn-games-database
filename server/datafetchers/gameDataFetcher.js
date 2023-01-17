const puppeteer = require('puppeteer');
const jsonfile = require('jsonfile');
const axios = require('axios');
const addDelay = require('../utils/addDelay');
require('dotenv').config();

// Function that scraps all game titles and corresponding platforms from GFN website
async function fetchRawGameData() {
  console.log('Fetching raw game titles...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.nvidia.com/en-us/geforce-now/games/');
  const gameTitles = await page.$$eval('.div-game-name', (games) => games.map((game) => game.textContent));
  await browser.close();
  return gameTitles;
}

// Function that formats raw game strings array into objects
function formatGameList(gameData) {
  console.log('Formating game data...');
  const formatedGameData = gameData.map((game) => ({
    id: gameData.indexOf(game),
    name: game.indexOf('(') != -1 ? game.substring(0, game.indexOf('(') - 1).replace('®', '').replace('™', '') : game.replace('®', '').replace('™', ''),
    platform: game.indexOf('(') !== -1 ? game.substring(game.indexOf('(') + 1, game.length - 1).split(', ') : ['GFN App'],
  }));
  return formatedGameData;
}

// Function that fetches data about a game from IGDB
async function getMoreData(game, gameindex, gamecount) {
  // Preparing the request
  const postData = `
		fields id, name, rating, aggregated_rating, game_modes, genres, cover, slug;
		search "${game.name}";
		limit 1;
	`;

  // Waiting to account for API limits
  await addDelay(gameindex * 300);
  console.log(`Fetching game ${gameindex + 1} of ${gamecount}`);

  // Fetching IGDB data
  return axios.post('https://api.igdb.com/v4/games', postData)
    .then((res) => {
      const gamedata = {
        ...game,
        IGDBdata: res.data[0],
      };
      return gamedata;
    })
    .catch((err) => {
      console.log('AXIOS ERROR: ', err);
    });
}

// Function that fetches cover URLs
async function getCoverImageIds(game, gameindex, gameCount) {
  if (game.IGDBdata) {
    if (!game.IGDBdata.cover) {
      return game;
    }
    // Preparing the cover image request
    const coverPostData = `fields image_id; where id = ${game.IGDBdata.cover};`;

    await addDelay(gameindex * 300);
    console.log(`Fetching cover for game ${gameindex + 1} of ${gameCount}`);

    return axios.post('https://api.igdb.com/v4/covers', coverPostData)
      .then((res) => {
        // Adding the URL to the game object
        game.IGDBdata.cover_image_id = res.data[0].image_id;
        return game;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return game;
}

// Function that organizes the fetching of data for all fetched games
async function enrichGameData(gameData) {
  console.log('Fetching IGDB data...');
  const igdbEnrichedGameData = await Promise.all(
    gameData.map((game, i) => getMoreData(game, i, gameData.length))
  );
  // return igdbEnrichedGameData;
  return Promise.all(
    igdbEnrichedGameData.map((game, i) => getCoverImageIds(game, i, igdbEnrichedGameData.length)),
  );
}

// Function that saves all fetched data into a JSON file that will be served
async function saveToFile(data) {
  const file = './tmp/gamedata.json';
  await jsonfile.writeFile(file, data)
    .then(() => {
      console.log('Finished saving formatted game data');
    })
    .catch((error) => {
      console.log(error);
    });
};

async function refreshGameData() {
  const gameTitles = await fetchRawGameData();
  const formatedGameData = await formatGameList(gameTitles);
  const APIEnrichedGameData = await enrichGameData(formatedGameData);
  saveToFile(APIEnrichedGameData);
}

module.exports = {
  refreshGameData,
};
