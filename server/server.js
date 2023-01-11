const express = require('express');
const app = express();
const axios = require("axios");
const jsonfile = require('jsonfile');
const cors = require('cors');
const path = require('path');
const refreshGameData = require('./datafetchers/gameDataFetcher');
const refreshGameModesData = require('./datafetchers/gameModesDataFetcher');
const refreshGameGenresData = require('./datafetchers/gameGenresDataFetcher');

// Setting axios config to request from IGDB API
axios.defaults.headers.post['Client-ID'] = process.env.IGDB_CLIENT_ID;
axios.defaults.headers.post['Authorization'] = `Bearer ${process.env.IGDB_TEMPORARY_TOKEN}`;

// Twitch API token function
// function getTwitchAPIToken () {
// 	axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`)
// 		.then(res=>{
// 			console.log(res.data)
// 		})
// 		.catch(err=>{
// 			console.log(err)
// 		})
// };

// Loading data in memory
let gamedata = jsonfile.readFileSync('./tmp/gamedata.json');
let genredata = jsonfile.readFileSync('./tmp/gamegenresdata.json');
let gamemodesdata = jsonfile.readFileSync('./tmp/gamemodesdata.json');

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

// Serving the front-end app
app.use(express.static(path.resolve(__dirname, '../client/dist')));

// Implementing CORS
app.use(cors());

// API Routes
app.get('/api/games', (req, res) => {
	res.json(gamedata);
});

app.get('/api/gamemodes', (req, res) => {
	res.json(gamemodesdata);
});

app.get('/api/genres', (req, res) => {
	res.json(genredata);
});

app.get(`/${process.env.REFRESH_KEY}`, (req, res) => {
	refreshData();
	res.send('Refreshing data...');
});

// Redirecting all remaining requests to the front-end app
app.get('*', function (request, response) {
	response.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

// Server options
app.listen(3000);