import axios from 'axios';

const petAPI = () => {
  const BASEURL = 'https://api.petfinder.com/v2/animals?type=dog&breed='
  const publicKey = 'yaD3Y8GufBtJCkntjc4byTSBHVYUPeD42PJAZq3GO2SfRx8p9g'
  const secretKey = 'TLsMatYIB2EQQhUzmkkbPY1M2m0KljgiXqInort4'
  
  const getToken = async () => {
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
  }
  const queryPetfinder = async (token, breed) => {
    return await axios.get(BASEURL + breed, { headers: { "Authorization": `Bearer ${token}` } })
  }
  
  getToken().then(token => queryPetfinder(token, "retriever").then(res => {
    return res.data.animals
  }))
}

export default petAPI;