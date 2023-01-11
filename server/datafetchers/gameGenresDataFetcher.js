const jsonfile = require('jsonfile');
const axios = require("axios");
require('dotenv').config();

// Function that fetches data about a game from IGDB
async function fetchGameGenresData () {
	const postData = `
		fields *; limit 100;
	`;
	
	return axios.post('https://api.igdb.com/v4/genres', postData)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log("AXIOS ERROR: ", err);
		})
}

// Function that saves all fetched data into a JSON file that will be served
const saveToFile = (data) => {
	const file = './tmp/gamegenresdata.json';
	jsonfile.writeFile(file, data)
		.then(res => {
				console.log('Finished saving game genres data');
		})
		.catch(error => {
				console.log(error);
		})
};

async function refreshGameGenresData() {
  const gameGenresData = await fetchGameGenresData();
	saveToFile(gameGenresData);
};

module.exports = refreshGameGenresData;