import axios from 'axios';

const petAPI = (type, breed, location) => {

  const BASEURL = `https://api.petfinder.com/v2/animals?type=${type}&breed=${breed}&limit=100&location=${location}`
  const publicKey = 'yaD3Y8GufBtJCkntjc4byTSBHVYUPeD42PJAZq3GO2SfRx8p9g'
  const secretKey = 'TLsMatYIB2EQQhUzmkkbPY1M2m0KljgiXqInort4'

  const getToken = async () => {
    try {
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

      let res = await axios(config);
      return res.data.access_token


    } catch (err) {
      console.error(err)
    }
  }

  const queryPetfinder = async (token) => {
    try {
      return await axios.get(BASEURL, { headers: { "Authorization": `Bearer ${token}` } })
    } catch (err) {
      console.error(err)
    }
  }

  return getToken().then(token => queryPetfinder(token).catch(err => console.log(err)))
}

export default petAPI;