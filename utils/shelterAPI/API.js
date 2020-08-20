const axios = require('axios');
require('dotenv').config();

const shelterAPI = async (orgId, token) => {
  const BASEURL = `https://api.petfinder.com/v2/organizations/${orgId}`

  const results = await axios.get(BASEURL, { headers: { "Authorization": `Bearer ${token}` } })
  return results.data
};

module.exports = shelterAPI;
