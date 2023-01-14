const axios = require("axios");

// Default token update interval
let tokenRefreshInterval = 59 * 24 * 60 * 60 * 1000;

function refreshIGDBToken () {
	axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`)
		.then(res=>{
			process.env.IGDB_TEMPORARY_TOKEN = res.data.access_token;
			axios.defaults.headers.post['Authorization'] = `Bearer ${res.data.access_token}`;
      tokenRefreshInterval = res.data.expires_in * 1000 - (24 * 60 * 60 * 1000);
      programNextTokenRefresh();
		})
		.catch(err=>{
			console.log(err)
		})
};

module.exports = refreshIGDBToken