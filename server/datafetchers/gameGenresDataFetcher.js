const jsonfile = require('jsonfile');
const axios = require('axios');
require('dotenv').config();

// Function that fetches data about a game from IGDB
async function fetchGameGenresData() {
  const postData = `
    fields *; limit 100;
  `;

  return axios.post('https://api.igdb.com/v4/genres', postData)
    .then((res) => res.data)
    .catch((err) => {
      console.log('AXIOS ERROR: ', err);
    });
}

// Function that saves all fetched data into a JSON file that will be served
async function saveToFile(data) {
  const file = './tmp/gamegenresdata.json';
  await jsonfile.writeFile(file, data)
    .then(() => {
      console.log('Finished saving game genres data');
    })
    .catch((err) => {
      console.error(err);
    });
}

async function refreshGameGenresData() {
  const gameGenresData = await fetchGameGenresData();
  await saveToFile(gameGenresData);
}

module.exports = refreshGameGenresData;
