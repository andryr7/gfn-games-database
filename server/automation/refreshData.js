import { refreshGameData } from '../datafetchers/gameDataFetcher.js';
import { refreshGameModesData } from '../datafetchers/gameModesDataFetcher.js';
import { refreshGameGenresData } from '../datafetchers/gameGenresDataFetcher.js';
import { reloadData } from '../datamanagers/appDataManager.js';
import { refreshMetaData } from './refreshMetaData.js';

export async function refreshData() {
  await refreshGameData();
  await refreshGameGenresData();
  await refreshGameModesData();
  await refreshMetaData();
  await reloadData();
}
