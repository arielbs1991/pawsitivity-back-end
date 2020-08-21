const axios = require('axios');
require('dotenv').config();

const petAPIbyId = async (petId, token) => {
  const BASEURL = `https://api.petfinder.com/v2/animals/${petId}`

  const results = await axios.get(BASEURL, { headers: { "Authorization": `Bearer ${token}` } })
  return results.data
}
module.exports = petAPIbyId;