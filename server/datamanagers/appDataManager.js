import jsonfile from "jsonfile";

const appData = {};

export function setData(key, value) {
  appData[key] = value;
}

export function getData(key) {
  return appData[key];
}

// Function that saves all fetched data into a JSON file that will be served
export async function saveToFile(fileName, data) {
  const filePath = `./tmp/${fileName}.json`;
  await jsonfile
    .writeFile(filePath, data)
    .then(() => {
      console.log("Finished saving game genres data");
    })
    .catch((err) => {
      console.error(err);
    });
}

// Reloading data in memory
export async function reloadData() {
  jsonfile
    .readFile("./tmp/gamedata.json")
    .then((obj) => {
      setData("gamedata", obj);
      console.log("Reloaded game data");
    })
    .catch((err) => {
      console.error(err);
    });
  jsonfile
    .readFile("./tmp/gamemodesdata.json")
    .then((obj) => {
      setData("gamemodedata", obj);
      console.log("Reloaded gamemodes data");
    })
    .catch((err) => {
      console.error(err);
    });
  jsonfile
    .readFile("./tmp/gamegenresdata.json")
    .then((obj) => {
      setData("genredata", obj);
      console.log("Reloaded gamegenres data");
    })
    .catch((err) => {
      console.error(err);
    });
}
