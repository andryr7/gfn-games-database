import puppeteer from 'puppeteer';
import { addDelay } from '../utils/addDelay.js';
import { saveToFile } from '../datamanagers/appDataManager.js';
import jsonfile from 'jsonfile';
import { axiosApiInstance } from '../api/axiosInstance.js';

//TODO Implement retries
//TODO Change delay mechanism to account for retries

// Function that scraps all game titles and corresponding platforms from GFN website
async function getGameTitles() {
  console.log('Fetching raw game titles...');
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto('https://www.nvidia.com/en-us/geforce-now/games/');
  const gameTitles = await page.$$eval('.div-game-name', (games) =>
    games.map((game) => game.textContent)
  );
  await browser.close();
  return gameTitles;
}

// Function that formats raw game strings array into objects
function formatGameTitles(gameTitles) {
  console.log('Formatting game data...');

  const cleanGameTitle = (title) => title.replace(/®|™/g, '').trim();

  const formattedGameData = gameTitles.map((gameTitle, index) => ({
    id: index,
    name: gameTitle.includes('(')
      ? cleanGameTitle(gameTitle.substring(0, gameTitle.indexOf('(') - 1))
      : cleanGameTitle(gameTitle),
    platform: gameTitle.includes('(')
      ? gameTitle
          .substring(gameTitle.indexOf('(') + 1, gameTitle.length - 1)
          .split(', ')
      : ['GFN App'],
  }));

  return formattedGameData;
}

//Function that reads the current game data
async function loadCurrentGameData() {
  return await jsonfile.readFile('./tmp/gamedata.json').catch((err) => {
    if (err.code === 'ENOENT') {
      console.log('No data file was found');
    } else {
      console.log(err);
    }
    return [];
  });
}

//Filtering game data to remove unpublished games and only enrich new games
async function filterGameData(formattedGameTitles, currentGameData) {
  const filteredGameData = currentGameData.filter((currentGame) =>
    formattedGameTitles.some((newGame) => newGame.name === currentGame.name)
  );

  const newGameData = formattedGameTitles.filter(
    (newGame) =>
      !currentGameData.some((currentGame) => currentGame.name === newGame.name)
  );

  return [filteredGameData, newGameData];
}

// Function that fetches data about a game from IGDB
async function getGameData(game, gameindex, gamecount) {
  // Creating the request
  const postData = `
    fields id, name, rating, aggregated_rating, game_modes, genres, cover, slug, first_release_date;
    search "${game.name}";
    limit 1;
  `;

  // Waiting in order to account for API limits
  await addDelay(gameindex * 300);
  console.log(`Fetching game ${gameindex + 1} of ${gamecount}`);

  // Fetching IGDB data
  return axiosApiInstance
    .post('https://api.igdb.com/v4/games', postData)
    .then((res) => {
      const gameData = {
        ...game,
        IGDBdata: res.data[0] || 'no-data',
      };
      return gameData;
    })
    .catch((err) => {
      console.error('AXIOS ERROR: ', err);
    });
}

// Function that fetches cover URLs
async function getGameCover(game, gameindex, gameCount) {
  if (game.IGDBdata === 'no-data' || !game.IGDBdata.cover) return game;

  // Preparing the cover image request
  const coverPostData = `fields image_id; where id = ${game.IGDBdata.cover};`;
  await addDelay(gameindex * 300);
  console.log(`Fetching cover for game ${gameindex + 1} of ${gameCount}`);

  try {
    const res = await axiosApiInstance.post(
      'https://api.igdb.com/v4/covers',
      coverPostData
    );
    // Creating a copy of the game object
    const updatedGame = { ...game };
    // Adding the URL to the copied game object
    updatedGame.IGDBdata.cover_image_id = res.data[0].image_id;
    return updatedGame;
  } catch (err) {
    console.error(err);
    return game;
  }
}

// Function that organizes the fetching of data for all fetched games
async function enrichGameData(gameData) {
  console.log('Fetching IGDB data...');
  const enrichedGameData = await Promise.all(
    gameData.map((game, i) => getGameData(game, i, gameData.length))
  );
  return enrichedGameData;
}

// Function that organizes the fetching of cover images data for all fetched games
async function getCovers(gameData) {
  console.log('Fetching game cover images...');
  const gameDataWithImages = await Promise.all(
    gameData.map((game, i) => getGameCover(game, i, gameData.length))
  );
  return gameDataWithImages;
}

//Function that orchestrates all data gathering and storing
export async function refreshGameData() {
  //Scrapping game titles
  const scrappedGameTitles = await getGameTitles();

  //Formatting game titles
  const formattedGameTitles = await formatGameTitles(scrappedGameTitles);

  //Loading the current game data
  const currentGameData = await loadCurrentGameData();

  //Removing deleted games from the database
  const [filteredCurrentGameData, newGameDataToEnrich] = await filterGameData(
    formattedGameTitles,
    currentGameData
  );

  //Enriching the game data using IGDB API
  const newGameData = await enrichGameData(newGameDataToEnrich);
  const newGameDataWithCovers = await getCovers(newGameData);

  const aggregatedGameData = [
    ...filteredCurrentGameData,
    ...newGameDataWithCovers,
  ];

  //Storing the aggregated data
  await saveToFile('gamedata', aggregatedGameData);

  console.log(`${currentGameData.length} games were present in the database`);
  console.log(
    `${
      currentGameData.length - filteredCurrentGameData.length
    } games were removed from the database`
  );
  console.log(
    `${newGameDataWithCovers.length} games were added to the database`
  );
  console.log(
    `${
      filteredCurrentGameData.length + newGameDataWithCovers.length
    } are now present in the database`
  );
}
