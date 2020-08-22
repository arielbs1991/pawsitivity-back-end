const router = require("express").Router();
const petAPI = require("../utils/petAPI/API.js");
const petAPIbyId = require("../utils/petAPIbyId/API.js");
const db = require("../models");

//BASE URL FOR ALL ROUTES ON THIS PAGE: /api/petAPI

//route to return a single pet by id provided by petfinder
router.get("/pets/:petId", (req, res) => {
    if (!req.session.user || !req.session.shelter) {
        res.status(403).end();
    } else {
    petAPIbyId(req.params.petId, req.session.user.token)
        .then(petResults => {
            res.json(petResults)
            console.log("pet by id", petResults);
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
    }
})

//route to get array of animals by user preferences
router.get("/pets/", ({ session: { user: { postcode, hasCats, hasDogs, hasKids, whichSpecies, token } } }, res) => {
    if (!req.session.user) {
        res.status(403).end();
    } else {
        petAPI(postcode, hasDogs, hasKids, hasCats, whichSpecies, token)
            .then(petResults => {
                res.json(petResults)
            }).catch(err => {
                console.log(err);
                res.status(500).end()
            })
    }
})

module.exports = router;