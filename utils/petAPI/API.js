const axios = require('axios');
require('dotenv').config();

const petAPI = async (
  postcode, hasKids, hasCats, hasDogs, type
  ) => {
  const BASEURL = `https://api.petfinder.com/v2/animals?type=${type}&limit=100&location=${postcode}`
  // UN COMMENT FOR LIVE VERSION
  let kidParam;
  let catParam;
  let dogParam;
  if (hasKids) kidParam = '&good_with_kids=true'
  if (hasCats) catParam = '&good_with_cats=true'
  if (hasDogs) dogParam = '&good_with_dogs=true'


  // JUST FOR BASIC TESTING
  // const BASEURL = `https://api.petfinder.com/v2/animals?type=dog&limit=100&location=98125`

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

  let { data: { access_token } } = await axios(config);
  const animals = await axios.get(BASEURL
    +kidParam+dogParam+catParam
    , { headers: { "Authorization": `Bearer ${access_token}` } })
  return animals.data
}

module.exports = petAPI;