const axios = require('axios');
require('dotenv').config();

const shelterAPI = async (orgId) => {
    const BASEURL = `https://api.petfinder.com/v2/organizations/${orgId}`
    const publicKey = 'Id4PWiv8ndIIegWRHTHLuj9sxhelO9TS0G2A0UNKbSDpm6117V'
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
    const results = await axios.get(BASEURL, { headers: { "Authorization": `Bearer ${access_token}` } })
    return results.data
};

module.exports = shelterAPI;
