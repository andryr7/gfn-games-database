import { reloadData } from '../datamanagers/appDataManager.js';
import { refreshData } from './refreshData.js';
import { programNextDataRefresh } from './refreshDataPlanner.js';
import { refreshIGDBToken } from './refreshIGDBToken.js';
import { programNextTokenRefresh } from './refreshIGDBTokenPlanner.js';

export async function automateApp() {
  await refreshIGDBToken();
  await programNextTokenRefresh();
  await refreshData();
  await programNextDataRefresh();
  await reloadData();
  console.log('Finished automating app');
}
