// const axios = require('axios');

// const shelterAPI = async (orgId) => {
//   const BASEURL = `https://api.petfinder.com/v2/organizations/${orgId}`
//   const publicKey = ('yaD3Y8GufBtJCkntjc4byTSBHVYUPeD42PJAZq3GO2SfRx8p9g' || 'Id4PWiv8ndIIegWRHTHLuj9sxhelO9TS0G2A0UNKbSDpm6117V')
//   const secretKey = ('TLsMatYIB2EQQhUzmkkbPY1M2m0KljgiXqInort4' || 'Id4PWiv8ndIIegWRHTHLuj9sxhelO9TS0G2A0UNKbSDpm6117V')
//   const config = {
//     url: "oauth2/token",
//     method: "post",
//     baseURL: "https://api.petfinder.com/v2/",
//     data: {
//       grant_type: "client_credentials",
//       client_id: `${publicKey}`,
//       client_secret: `${secretKey}`,
//     },
//   };

//   let { data: { access_token } } = await axios(config);
//   const { data: { shelterData } } = await axios.get(BASEURL, { headers: { "Authorization": `Bearer ${access_token}` } })
//   return shelterData
// }

// module.exports = shelterAPI;

const fetch = require("node-fetch");

const shelterAPI = async (orgId) => {

    // Client credentials
    // Replace these with your key/secret
    var key = 'yaD3Y8GufBtJCkntjc4byTSBHVYUPeD42PJAZq3GO2SfRx8p9g';
    var secret = 'TLsMatYIB2EQQhUzmkkbPY1M2m0KljgiXqInort4';

    // Call details
    var org = 'RI77';
    var status = 'adoptable';

    // Call the API
    // This is a POST request, because we need the API to generate a new token for us
    fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (resp) {

        // Return the response as JSON
        return resp.json();

    }).then(function (data) {

        // Log the API data
        console.log('token', data);

        // Return a second API call
        // This one uses the token we received for authentication
        return fetch(`https://api.petfinder.com/v2/organizations/${orgId}`, {
            headers: {
                'Authorization': data.token_type + ' ' + data.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

    }).then(function (resp) {

        // Return the API response as JSON
        return resp.json();

    }).then(function (data) {

        // Log the pet data
        console.log('pets', data);

    }).catch(function (err) {

        // Log any errors
        console.log('something went wrong', err);

    });
};

module.exports = shelterAPI;

// const shelterAPI = async (orgId) => {

//     const url = 'http://api.petfinder.com/shelter.get';
//     const publicKey = ('yaD3Y8GufBtJCkntjc4byTSBHVYUPeD42PJAZq3GO2SfRx8p9g' || 'Id4PWiv8ndIIegWRHTHLuj9sxhelO9TS0G2A0UNKbSDpm6117V')
//     const secretKey = ('TLsMatYIB2EQQhUzmkkbPY1M2m0KljgiXqInort4' || 'Id4PWiv8ndIIegWRHTHLuj9sxhelO9TS0G2A0UNKbSDpm6117V')

//     $.ajax({
//         url: url,
//         jsonp: "callback",
//         dataType: "jsonp",
//         data: {
//             key: publicKey,
//             id: 'WA622',
//             output: 'basic',
//             format: 'json'
//         }

//     })
// }

// module.exports = shelterAPI;
