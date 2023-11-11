import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const axiosApiInstance = axios.create({
  headers: {
    post: {
      'Client-ID': process.env.IGDB_CLIENT_ID,
    },
  },
});

//Test interceptor
// axiosApiInstance.interceptors.request.use(async (config) => {
//   console.log(config);
//   return config;
// });
