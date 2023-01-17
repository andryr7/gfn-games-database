const refreshData = require('./refreshData');

// Program the next data refresh on next thursday a 9 am (time of GFN games availability release)
async function programDataRefresh() {
  const now = new Date();
  const nextRefreshTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
  const daysUntilThursday = (7 - now.getDay() + 4) % 7;
  nextRefreshTime.setDate(nextRefreshTime.getDate() + daysUntilThursday);
  if (nextRefreshTime < now) {
    nextRefreshTime.setDate(nextRefreshTime.getDate() + 7);
  };
  const timeUntilNextRefresh = nextRefreshTime - now;
  const planDataRefresh = () => {
    refreshData();
    setInterval(refreshData, 7 * 24 * 60 * 60 * 1000);
  };
  setTimeout(planDataRefresh, timeUntilNextRefresh);
  console.log(`Next data refresh will occur every 7 days, starting in ${Math.ceil(timeUntilNextRefresh / 1000 / 60 / 60) - 1} hours`);
}

module.exports = programDataRefresh;
