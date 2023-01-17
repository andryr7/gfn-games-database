const jsonfile = require('jsonfile');
const axios = require('axios');
require('dotenv').config();

// Function that fetches data about a game from IGDB
async function fetchGameModesData() {
  const postData = `
		fields *; limit 100;
	`;

  return axios.post('https://api.igdb.com/v4/game_modes', postData)
    .then((res) => res.data)
    .catch((err) => {
      console.log('AXIOS ERROR: ', err);
    });
}

// Function that saves all fetched data into a JSON file that will be served
async function saveToFile(data) {
  const file = './tmp/gamemodesdata.json';
  await jsonfile.writeFile(file, data)
    .then((res) => {
      console.log('Finished saving game modes data');
    })
    .catch((error) => {
      console.log(error);
    });
}

async function refreshGameModesData() {
  const gameModesData = await fetchGameModesData();
  await saveToFile(gameModesData);
}

module.exports = refreshGameModesData;
