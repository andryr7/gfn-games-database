const refreshData = require('./dataRefresh')

// Programming the next data refresh on next thursday a 9 am (time of GFN games availability release)
function programDataRefresh() {
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
  }
  setTimeout(planDataRefresh, timeUntilNextRefresh);
}

module.exports = programDataRefresh