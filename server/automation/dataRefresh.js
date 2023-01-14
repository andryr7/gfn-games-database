const { refreshGameData } = require('../datafetchers/gameDataFetcher');
const refreshGameModesData = require('../datafetchers/gameModesDataFetcher');
const refreshGameGenresData = require('../datafetchers/gameGenresDataFetcher');
const jsonfile = require('jsonfile');

// Reloading data in memory
const reloadData = () => {
	jsonfile.readFile('./tmp/gamedata.json')
		.then(obj => {
			gamedata = obj;
			console.log('Reloaded game data');
		})
		.catch(err => {
			console.log(err);
		})
	jsonfile.readFile('./tmp/gamemodesdata.json')
		.then(obj => {
			gamemodesdata = obj;
			console.log('Reloaded gamemodes data');
		})
		.catch(err => {
			console.log(err);
		})
	jsonfile.readFile('./tmp/gamegenresdata.json')
	.then(obj => {
		genredata = obj;
		console.log('Reloaded gamegenres data');
	})
	.catch(err => {
		console.log(err);
	})
};

async function refreshData () {
	await refreshGameData();
	await refreshGameGenresData();
	await refreshGameModesData();
	reloadData();
};

module.exports = {
	refreshData
};