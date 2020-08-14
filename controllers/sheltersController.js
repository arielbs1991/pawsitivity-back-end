const router = require("express").Router();
const db = require("../models");
const shelterAPI = require("../utils/shelterAPI/API");


//route for storing shelter info in shelter_table
router.post('/', (req, res) => {
    db.Shelter.create({
        shelterName: req.body.shelterName,
        orgId: req.body.orgId,
        email: req.body.email,
        address: req.body.address,
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

//route to find shelter data by id
router.get('/shelter/:id', (req, res) => {
    id = req.body.orgId;
    shelterAPI(id)
        .then(shelterResults => {
            res.json(shelterResults)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

module.exports = router;