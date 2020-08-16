const axios = require('axios');

const petAPIbyUserPref = async (type, location, hasKids, hasCats, hasDogs) => {
  const BASEURL = `https://api.petfinder.com/v2/animals?type=${type}&limit=100&location=${location}&status=adoptable&good_with_children=${hasKids}&good_with_cats=${hasCats}&good_with_dogs=${hasDogs}&sort=random`
  const publicKey = ('yaD3Y8GufBtJCkntjc4byTSBHVYUPeD42PJAZq3GO2SfRx8p9g' || 'Id4PWiv8ndIIegWRHTHLuj9sxhelO9TS0G2A0UNKbSDpm6117V')
  const secretKey = ('TLsMatYIB2EQQhUzmkkbPY1M2m0KljgiXqInort4' || 'Id4PWiv8ndIIegWRHTHLuj9sxhelO9TS0G2A0UNKbSDpm6117V')
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

module.exports = petAPIbyUserPref;
