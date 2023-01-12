const express = require('express');
const app = express();
const axios = require("axios");
const jsonfile = require('jsonfile');
const cors = require('cors');
const path = require('path');
const refreshGameData = require('./datafetchers/gameDataFetcher');
const refreshGameModesData = require('./datafetchers/gameModesDataFetcher');
const refreshGameGenresData = require('./datafetchers/gameGenresDataFetcher');

// Loading data in memory
let gamedata = jsonfile.readFileSync('./tmp/gamedata.json');
let genredata = jsonfile.readFileSync('./tmp/gamegenresdata.json');
let gamemodesdata = jsonfile.readFileSync('./tmp/gamemodesdata.json');

// Setting axios config to request from IGDB API
axios.defaults.headers.post['Client-ID'] = process.env.IGDB_CLIENT_ID;

getIGDBAPIToken();

// Getting IGDB token an programming the next token fetching
function getIGDBAPIToken () {
	axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`)
		.then(res=>{
			process.env.IGDB_TEMPORARY_TOKEN = res.data.access_token;
			axios.defaults.headers.post['Authorization'] = `Bearer ${res.data.access_token}`;
			programNextTokenRefresh();
		})
		.catch(err=>{
			console.log(err)
		})
};

const tokenRefreshInterval = 59 * 24 * 60 * 60 * 1000;

function timeout(ms) {
  setTimeout(() => {
    getIGDBAPIToken();
  }, ms);
}

function programNextTokenRefresh() {
  let timeRemaining = tokenRefreshInterval;
  let interval = 2147483647; // maximum time that can be set for setTimeout
  (function recursiveTimeout() {
    if (timeRemaining > 0) {
      timeout(Math.min(interval, timeRemaining));
      timeRemaining -= interval;
      setTimeout(recursiveTimeout, Math.min(interval, timeRemaining));
    }
  })();
}

// Programming the next data refresh on next thursday a 9 am (time of GFN games availability release)
const now = new Date();
const nextRefreshTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
const daysUntilThursday = (7 - now.getDay() + 4) % 7;
nextRefreshTime.setDate(nextRefreshTime.getDate() + daysUntilThursday);
if (nextRefreshTime < now) {
	nextRefreshTime.setDate(nextRefreshTime.getDate() + 7);
};
const timeUntilNextRefresh = nextRefreshTime - now;
const programRefresh = () => {
	refreshData();
	setInterval(refreshData, 7 * 24 * 60 * 60 * 1000);
}
setTimeout(programRefresh, timeUntilNextRefresh);

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