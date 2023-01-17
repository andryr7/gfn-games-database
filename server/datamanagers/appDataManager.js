const jsonfile = require('jsonfile');

const appData = {};

function setData(key, value) {
  appData[key] = value;
}

function getData(key) {
  return appData[key];
}

// Reloading data in memory
async function reloadData() {
  jsonfile.readFile('./tmp/gamedata.json')
    .then((obj) => {
      setData('gamedata', obj);
      console.log('Reloaded game data');
    })
    .catch((err) => {
      console.log(err);
    });
  jsonfile.readFile('./tmp/gamemodesdata.json')
    .then((obj) => {
      setData('gamemodedata', obj);
      console.log('Reloaded gamemodes data');
    })
    .catch((err) => {
      console.log(err);
    });
  jsonfile.readFile('./tmp/gamegenresdata.json')
    .then((obj) => {
      setData('genredata', obj);
      console.log('Reloaded gamegenres data');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { setData, getData, reloadData };
