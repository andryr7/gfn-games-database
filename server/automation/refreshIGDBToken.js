import axios from "axios";

export async function refreshIGDBToken() {
  await axios
    .post(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`
    )
    .then((res) => {
      console.log(`New token is ${res.data.access_token}`);
      console.log(
        `and expires in ${Math.ceil(res.data.expires_in / 60 / 60)} hours`
      );
      process.env.IGDB_TEMPORARY_TOKEN = res.data.access_token;
      process.env.TOKEN_EXPIRATION = res.data.expires_in;
      axios.defaults.headers.post.Authorization = `Bearer ${res.data.access_token}`;
    })
    .catch((err) => {
      console.log(err);
    });
}
