import axios from 'axios';
import dotenv from 'dotenv';
import { saveToFile } from '../datamanagers/appDataManager.js';

dotenv.config();

// Function that fetches data about a game from IGDB
async function fetchGameGenresData() {
  const postData = `
    fields *; limit 100;
  `;

  return axios
    .post("https://api.igdb.com/v4/genres", postData)
    .then((res) => res.data)
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });
}

export async function refreshGameGenresData() {
  const gameGenresData = await fetchGameGenresData();
  await saveToFile("gamegenresdata", gameGenresData);
}
