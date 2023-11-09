import jsonfile from 'jsonfile';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Function that fetches data about a game from IGDB
async function fetchGameModesData() {
  const postData = `
    fields *; limit 100;
  `;

  return axios
    .post("https://api.igdb.com/v4/game_modes", postData)
    .then((res) => res.data)
    .catch((err) => {
      console.error("AXIOS ERROR: ", err);
    });
}

// Function that saves all fetched data into a JSON file that will be served
async function saveToFile(data) {
  const file = "./tmp/gamemodesdata.json";
  await jsonfile
    .writeFile(file, data)
    .then(() => {
      console.log("Finished saving game modes data");
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function refreshGameModesData() {
  const gameModesData = await fetchGameModesData();
  await saveToFile(gameModesData);
}
