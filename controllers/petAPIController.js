const router = require("express").Router();
const petAPI = require("../utils/petAPI/API.js");
const petAPIbyId = require("../utils/petAPIbyId/API.js");
const db = require("../models");
const shelterAPI = require("../utils/shelterAPI/API.js");

//BASE URL FOR ALL ROUTES ON THIS PAGE: /api/petAPI

//route to return a single pet by id provided by petfinder
router.get("/pets/:petId", ({ body: { petId } }, res) => {
    petAPIbyId(petId)
        .then(petResults => {
            res.json(petResults)
            console.log("pet by id", petResults);
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

//route to get array of animals by user preferences - should hopefully work once we have a sessions object

router.get("/pets/", ({ session: { user: {postcode, hasCats, hasDogs, hasKids, whichSpecies } } }, res) => {
    console.log(postcode, hasDogs, hasKids, hasCats, whichSpecies)
    petAPI(postcode, hasDogs, hasKids, hasCats, whichSpecies)
        .then(petResults => {
            res.json(petResults)
        }).catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

module.exports = router;