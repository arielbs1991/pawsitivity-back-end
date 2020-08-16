const fetch = require("node-fetch");

const petAPIbyId = async (petId) => {

    // Client credentials
    // Replace these with your key/secret
    var key = 'yaD3Y8GufBtJCkntjc4byTSBHVYUPeD42PJAZq3GO2SfRx8p9g';
    var secret = 'TLsMatYIB2EQQhUzmkkbPY1M2m0KljgiXqInort4';

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
        return fetch(`https://api.petfinder.com/v2/animals/${petId}`, {
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

module.exports = petAPIbyId;
