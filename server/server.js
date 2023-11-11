import express from "express";
import axios from "axios";
import cors from "cors";
import { fileURLToPath } from 'url';
import path from "path";
import { appData, reloadData } from "./datamanagers/appDataManager.js";
import { automateApp } from "./automation/automateApp.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Setting axios config to request from IGDB API
axios.defaults.headers.post["Client-ID"] = process.env.IGDB_CLIENT_ID;

// Enabling automation if necessary
switch (process.env.AUTOMATE_APP) {
  case "true":
    automateApp();
    break;
  case "false":
    reloadData();
    break;
  default:
    console.log("Error: automation env variable was not properly set");
}

// Serving the front-end app
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// API Routes
app.use(cors());

app.get("/api/games", (req, res) => {
  res.json(appData.getData("gamedata"));
});

app.get("/api/gamemodes", (req, res) => {
  res.json(appData.getData("gamemodedata"));
});

app.get("/api/genres", (req, res) => {
  res.json(appData.getData("genredata"));
});

// Redirecting all remaining possible requests to the front-end app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// Server options
app.listen(3000);
