const express = require("express");
const router = express.Router();
const petAPI = require('../utils/petAPI/API')

router.get("/api/pets/", ({ body: { type, location } }, res) => {
    petAPI(type, location)
        .then(petResults => {

            res.json(petResults)
        })
})
// module.exports = petAPI;
module.exports = router