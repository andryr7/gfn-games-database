const { refreshGameData } = require('../datafetchers/gameDataFetcher');
const refreshGameModesData = require('../datafetchers/gameModesDataFetcher');
const refreshGameGenresData = require('../datafetchers/gameGenresDataFetcher');
const appData = require('../datamanagers/appDataManager');

async function refreshData() {
  await refreshGameData();
  await refreshGameGenresData();
  await refreshGameModesData();
  await appData.reloadData();
}

module.exports = refreshData;
