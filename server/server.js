const express = require('express');
const app = express();
const axios = require("axios");
const jsonfile = require('jsonfile');
const cors = require('cors');
const path = require('path');

// Automation functions
const { refreshData } = require('./automation/dataRefresh');
const refreshIGDBToken = require('./automation/igdbTokenRefresh');
const programDataRefresh = require('./automation/dataRefreshPlanner');
const programNextTokenRefresh = require('./automation/igdbTokenRefreshPlanner');

// Loading data in globally accessibles variables
gamedata = jsonfile.readFileSync('./tmp/gamedata.json');
genredata = jsonfile.readFileSync('./tmp/gamegenresdata.json');
gamemodesdata = jsonfile.readFileSync('./tmp/gamemodesdata.json');

// Setting axios config to request from IGDB API
axios.defaults.headers.post['Client-ID'] = process.env.IGDB_CLIENT_ID;
axios.defaults.headers.post['Authorization'] = `Bearer ${process.env.IGDB_TEMPORARY_TOKEN}`;

// Serving the front-end app
app.use(express.static(path.resolve(__dirname, '../client/dist')));

// API Routes
app.use(cors());

app.get('/api/games', (req, res) => {
	res.json(gamedata);
});

app.get('/api/gamemodes', (req, res) => {
	res.json(gamemodesdata);
});

app.get('/api/genres', (req, res) => {
	res.json(genredata);
});

// Redirecting all remaining possible requests to the front-end app
app.get('*', function (request, response) {
	response.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

// Server options
app.listen(3000);

refreshData();