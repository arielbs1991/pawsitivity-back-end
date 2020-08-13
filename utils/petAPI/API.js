const axios = require('axios');

const petAPI = async (type, breed, location) => {
  const BASEURL = `https://api.petfinder.com/v2/animals?type=${type}&breed=${breed}&limit=100&location=${location}`
  const publicKey = 'yaD3Y8GufBtJCkntjc4byTSBHVYUPeD42PJAZq3GO2SfRx8p9g'
  const secretKey = 'TLsMatYIB2EQQhUzmkkbPY1M2m0KljgiXqInort4'
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
  
  let { data: { access_token } } = await axios(config);
  const { data: { animals } } = await axios.get(BASEURL, { headers: { "Authorization": `Bearer ${access_token}` } })
  return animals
}

module.exports = petAPI;