const router = require("express").Router();
const shelterAPI = require("../utils/shelterAPI/API.js")
const db = require("../models");

//BASE URL FOR ALL ROUTES ON THIS PAGE: api/shelterAPI

//route to find shelter data by id
router.get("/PetfinderShelter/:orgId", (req, res) => {
    shelterAPI(req.params.orgId, req.session.user.token)
        .then(dbPetfinderShelter => {
            res.json(dbPetfinderShelter)
            console.log("PetfinderShelter results", dbPetfinderShelter);
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

//route for storing shelter info in shelter_table - tested in postman and working as of 8/15 12:00
router.post("/PetfinderShelter", (req, res) => {
    db.PetfinderShelter.create({
        orgId: req.body.orgId
    })
        .then(dbPetfinderShelter => {
            res.json(dbPetfinderShelter)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

module.exports = router;