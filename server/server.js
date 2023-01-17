const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const appData = require('./datamanagers/appDataManager');

// Automation functions
const refreshData = require('./automation/refreshData');
const refreshIGDBToken = require('./automation/refreshIGDBToken');
const programDataRefresh = require('./automation/refreshDataPlanner');
const programNextTokenRefresh = require('./automation/refreshIGDBTokenPlanner');

// Setting axios config to request from IGDB API
axios.defaults.headers.post['Client-ID'] = process.env.IGDB_CLIENT_ID;

async function automateApp() {
  await refreshIGDBToken();
  await programNextTokenRefresh();
  await refreshData();
  await programDataRefresh();
  console.log('Finished automating app');
}

// Enabling automation if necessary
switch (process.env.AUTOMATE_APP) {
  case 'true':
    automateApp();
    break;
  case 'false':
    appData.reloadData();
    break;
  default:
    console.log('Error: automation env variable was not properly set');
}

// Serving the front-end app
app.use(express.static(path.resolve(__dirname, '../client/dist')));

// API Routes
app.use(cors());

app.get('/api/games', (req, res) => {
  res.json(appData.getData('gamedata'));
});

app.get('/api/gamemodes', (req, res) => {
  res.json(appData.getData('gamemodedata'));
});

app.get('/api/genres', (req, res) => {
  res.json(appData.getData('genredata'));
});

// Redirecting all remaining possible requests to the front-end app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

// Server options
app.listen(3000);
