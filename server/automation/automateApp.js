import { refreshData } from "./refreshData.js";
import { programDataRefresh } from "./refreshDataPlanner.js";
import { refreshIGDBToken } from "./refreshIGDBToken.js";
import { programNextTokenRefresh } from "./refreshIGDBTokenPlanner.js";

export async function automateApp() {
  await refreshIGDBToken();
  await programNextTokenRefresh();
  await refreshData();
  await programDataRefresh();
  console.log("Finished automating app");
}