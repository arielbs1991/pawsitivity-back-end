const router = require("express").Router();
const db = require("../models");
// const petAPI = require("../utils/petAPI/API.js");


router.post('/', (req, res) => {
    db.Shelter.create({
        shelterName: req.body.shelterName,
        email: req.body.email,
        location: req.body.location,
        phoneNumber: req.body.phoneNumber
    })
    .then(shelterData => {
        res.json(shelterData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

module.exports = router;