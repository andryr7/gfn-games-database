import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { appData, reloadData } from './datamanagers/appDataManager.js';
import { automateApp } from './automation/automateApp.js';
import dotenv from 'dotenv';
import { checkEnvVariables } from './utils/checkEnvVariables.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

//Checking env variables
checkEnvVariables();

// Loading data and launching automation process
reloadData();
process.env.AUTOMATE_APP === 'true' && automateApp();

// Serving the front-end app
process && app.use(express.static(path.resolve(__dirname, '../client/dist')));

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
app.get('/api/metadata', (req, res) => {
  res.json(appData.getData('metadata'));
});

// Redirecting all remaining possible requests to the front-end app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

// Server options
app.listen(process.env.HOST_PORT);
console.log(`App ready and listening on ${process.env.HOST_PORT}`);
