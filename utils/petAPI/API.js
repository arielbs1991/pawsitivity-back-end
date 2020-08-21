const axios = require('axios');
require('dotenv').config();

const petAPI = async (postcode, hasKids, hasCats, hasDogs, type, token) => {
  const BASEURL = `https://api.petfinder.com/v2/animals?type=${type}&limit=100&location=${postcode}`
  let kidParam = "";
  let catParam = "";
  let dogParam = "";
  if (hasKids) kidParam = '&good_with_kids=true'
  if (hasCats) catParam = '&good_with_cats=true'
  if (hasDogs) dogParam = '&good_with_dogs=true'

  const { data: { animals } } = await axios.get(BASEURL+kidParam+dogParam+catParam, { headers: { "Authorization": `Bearer ${token}` } })
  return animals
}

module.exports = petAPI;