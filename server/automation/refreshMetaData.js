import { saveToFile } from '../datamanagers/appDataManager.js';

//Function that orchestrates all data gathering and storing
export async function refreshMetaData() {
  console.log('Refreshing meta data');
  const now = Date.now();

  const metaData = {
    lastUpdate: now,
  };

  //Storing the aggregated data
  await saveToFile('metadata', metaData);
}
