const refreshIGDBToken = require('./refreshIGDBToken');

// Default token update interval
const tokenRefreshInterval = (process.env.TOKEN_EXPIRATION - (24 * 60 * 60)) * 1000;

function timeout(ms) {
  setTimeout(() => {
    refreshIGDBToken();
    programNextTokenRefresh();
  }, ms);
}

async function programNextTokenRefresh() {
  let timeRemaining = tokenRefreshInterval;
  const interval = 2147483647; // maximum time that can be set for setTimeout
  (function recursiveTimeout() {
    if (timeRemaining > 0) {
      timeout(Math.min(interval, timeRemaining));
      timeRemaining -= interval;
      setTimeout(recursiveTimeout, Math.min(interval, timeRemaining));
    }
  }());
}

module.exports = programNextTokenRefresh;
