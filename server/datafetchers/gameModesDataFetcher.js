const jsonfile = require('jsonfile');
require('dotenv').config();
const axios = require("axios");

// Function that fetches data about a game from IGDB
async function fetchGameModesData () {
	const postData = `
		fields *; limit 100;
	`;
	
	return axios.post('https://api.igdb.com/v4/game_modes', postData)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log("AXIOS ERROR: ", err);
		})
}

// Function that saves all fetched data into a JSON file that will be served
const saveToFile = (data) => {
	const file = './tmp/gamemodesdata.json';
	jsonfile.writeFile(file, data)
		.then(res => {
				console.log('Finished saving game modes data');
		})
		.catch(error => {
				console.log(error);
		})
};

async function refreshGameModesData() {
  const gameModesData = await fetchGameModesData();
	saveToFile(gameModesData);
};

module.exports = refreshGameModesData;