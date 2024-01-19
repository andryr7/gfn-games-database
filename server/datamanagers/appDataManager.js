import jsonfile from 'jsonfile';

class AppData {
  constructor() {
    this.data = {};
  }

  setData(key, value) {
    this.data[key] = value;
  }

  getData(key) {
    return this.data[key];
  }
}

export const appData = new AppData();

// Function that saves all fetched data into a JSON file that will be served
export async function saveToFile(fileName, data) {
  const filePath = `./tmp/${fileName}.json`;
  await jsonfile
    .writeFile(filePath, data)
    .then(() => {
      console.log('Finished saving game genres data');
    })
    .catch((err) => {
      console.error(err);
    });
}

// Reloading data in memory
export async function reloadData() {
  jsonfile
    .readFile('./tmp/gamedata.json')
    .then((obj) => {
      appData.setData('gamedata', obj);
      console.log('Reloaded game data');
    })
    .catch((err) => {
      console.error(err);
    });
  jsonfile
    .readFile('./tmp/gamemodesdata.json')
    .then((obj) => {
      appData.setData('gamemodedata', obj);
      console.log('Reloaded gamemodes data');
    })
    .catch((err) => {
      console.error(err);
    });
  jsonfile
    .readFile('./tmp/gamegenresdata.json')
    .then((obj) => {
      appData.setData('genredata', obj);
      console.log('Reloaded gamegenres data');
    })
    .catch((err) => {
      console.error(err);
    });
  jsonfile
    .readFile('./tmp/metadata.json')
    .then((obj) => {
      appData.setData('metadata', obj);
      console.log('Reloaded metadata');
    })
    .catch((err) => {
      console.error(err);
    });
}
