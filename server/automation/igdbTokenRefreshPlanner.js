const refreshIGDBToken = require('./igdbTokenRefresh');

// Default token update interval
let tokenRefreshInterval = 59 * 24 * 60 * 60 * 1000;

function timeout(ms) {
  setTimeout(() => {
    refreshIGDBToken();
    programNextTokenRefresh();
  }, ms);
}

function programNextTokenRefresh() {
  let timeRemaining = tokenRefreshInterval;
  let interval = 2147483647; // maximum time that can be set for setTimeout
  (function recursiveTimeout() {
    if (timeRemaining > 0) {
      timeout(Math.min(interval, timeRemaining));
      timeRemaining -= interval;
      setTimeout(recursiveTimeout, Math.min(interval, timeRemaining));
    }
  })();
}

module.exports = programNextTokenRefresh