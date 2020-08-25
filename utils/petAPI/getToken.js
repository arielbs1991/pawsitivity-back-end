const axios = require('axios');
require('dotenv').config();

const getToken = () => {
  //Ariel Key
  // const publicKey = 'Id4PWiv8ndIIegWRHTHLuj9sxhelO9TS0G2A0UNKbSDpm6117V'
  //Cody Key
  const publicKey = 'yaD3Y8GufBtJCkntjc4byTSBHVYUPeD42PJAZq3GO2SfRx8p9g'
  const secretKey = process.env.PETFINDER_API
  const config = {
    url: "oauth2/token",
    method: "post",
    baseURL: "https://api.petfinder.com/v2/",
    data: {
      grant_type: "client_credentials",
      client_id: `${publicKey}`,
      client_secret: `${secretKey}`,
    },
  };

  return axios(config);
}

module.exports = getToken;