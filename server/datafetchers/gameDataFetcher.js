import puppeteer from "puppeteer";
import axios from "axios";
import { addDelay } from "../utils/addDelay";
import { saveToFile } from "../datamanagers/appDataManager.js";
import jsonfile from "jsonfile";

// Function that scraps all game titles and corresponding platforms from GFN website
async function getGameTitles() {
  console.log("Fetching raw game titles...");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.nvidia.com/en-us/geforce-now/games/");
  const gameTitles = await page.$$eval(".div-game-name", (games) =>
    games.map((game) => game.textContent)
  );
  await browser.close();
  return gameTitles.slice(0, 20);
}

// Function that formats raw game strings array into objects
function formatGameTitles(gameTitles) {
  console.log("Formatting game data...");
  
  const cleanGameTitle = (title) => title.replace(/®|™/g, "").trim();

  const formattedGameData = gameTitles.map((gameTitle, index) => ({
    id: index,
    name: gameTitle.includes("(") ? cleanGameTitle(gameTitle.substring(0, gameTitle.indexOf("(") - 1)) : cleanGameTitle(gameTitle),
    platform: gameTitle.includes("(") ? gameTitle.substring(gameTitle.indexOf("(") + 1, gameTitle.length - 1).split(", ") : ["GFN App"],
  }));

  return formattedGameData;
}

async function compareGameData(newGameTitles) {
  let currentGameData = [];
  let newGameData = [];

  //Reading the existing game data file
  await jsonfile.readFile("./tmp/gamedata.json")
    .then(currentGameTitles => {
      //Reading through each of the newly fetched game titles
      for(const newGame of newGameTitles) {
        if(currentGameTitles.some(currentGame => currentGame.name === newGame.name)) {
        //If the newly fetched game is already present in the database, pass it on
          currentGameData.push(currentGameTitles.find(game => game.name === newGame.name));
        } else {
        //If it's not, add it to the list of games that needs data
          newGameData.push(newGame);
        }
      }
    })
    .catch(err => {
      console.log(err)
      //If there was an error reading the data file = all game data must be enriched through the API
      newGameData.push(...newGameTitles);
    })

  return [currentGameData, newGameData];
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
  return axios
    .post("https://api.igdb.com/v4/games", postData)
    .then((res) => {
      const gameData = {
        ...game,
        IGDBdata: res.data[0] || "no-data",
      };
      return gameData;
    })
    .catch((err) => {
      console.error("AXIOS ERROR: ", err);
    });
}

// Function that fetches cover URLs
async function getGameCover(game, gameindex, gameCount) {
  if (game.IGDBdata === "no-data" || !game.IGDBdata.cover) return game;

  // Preparing the cover image request
  const coverPostData = `fields image_id; where id = ${game.IGDBdata.cover};`;
  await addDelay(gameindex * 300);
  console.log(`Fetching cover for game ${gameindex + 1} of ${gameCount}`);

  try {
    const res = await axios.post(
      "https://api.igdb.com/v4/covers",
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
  console.log("Fetching IGDB data...");
  const enrichedGameData = await Promise.all(
    gameData.map((game, i) => getGameData(game, i, gameData.length))
  );
  return enrichedGameData;
}

async function getCovers(gameData) {
  console.log("Fetching game images...");
  const gameDataWithImages = await Promise.all(
    gameData.map((game, i) => getGameCover(game, i, gameData.length))
  );
  return gameDataWithImages;
}

export async function refreshGameData() {
  const gameTitles = await getGameTitles();
  const formattedGameTitles = await formatGameTitles(gameTitles);
  const [ maintainedGames, newGamesToEnrich ] = await compareGameData(formattedGameTitles);
  console.log(`${maintainedGames.length} games were already in the database`);
  console.log(`${newGamesToEnrich.length} games are to be enriched with the IGDB API`);
  const newGameData = await enrichGameData(newGamesToEnrich);
  const newGameDataWithCovers = await getCovers(newGameData);
  //Reuniting old existing data and newly fetched data
  const aggregatedData = [...maintainedGames, ...newGameDataWithCovers];
  //Storing the aggregated data
  await saveToFile("gamedata", aggregatedData);
}
