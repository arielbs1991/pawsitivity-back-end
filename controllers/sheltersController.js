const router = require("express").Router();
const shelterAPI = require("../utils/shelterAPI/API.js")
const db = require("../models");

//BASE URL FOR ALL ROUTES ON THIS PAGE: api/shelterAPI

//route to find shelter data by id
router.get("/shelter/:orgId", ({ params: { orgId } }, res) => {
  
    shelterAPI(orgId)
        .then(shelterResults => {
            res.json(shelterResults)
            console.log("shelter results", shelterResults);
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

//route for storing shelter info in shelter_table - tested in postman and working as of 8/15 12:00
router.post("/shelter", (req, res) => {
    db.Shelter.create({
        orgId: req.body.orgId,
        // shelterName: req.body.shelterName,
        // email: req.body.email,
        // address: req.body.address,
        // phoneNumber: req.body.phoneNumber
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