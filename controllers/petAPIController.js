const router = require("express").Router();
const petAPIbyUserPref = require("../utils/petAPIbyUserPref/API.js");
const db = require("../models");
const shelterAPI = require("../utils/shelterAPI/API");

//BASE URL FOR ALL ROUTES ON THIS PAGE: /api/petAPI


//route for storing shelter info in shelter_table
router.post('/shelter', (req, res) => {
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

//I WAS TRYING TO GET USER INFORMATION / PREFERENCES BY ID AND THEN RUN A PETAPI QUERY BASED ON THOSE AND THEN TURN THAT INTO A JSON OBJECT BUT IDEFK
//STORE USER OBJECT IN SESSIONS THEN WE DON'T HAVE TO FIND IT

// router.get("/", (req, res) => {
//     db.User.findOne({
//         where: {
//             id: req.params.id
//         }
//     })
// })


router.get("/pets/", ({ body: { type, location, hasKids, hasCats, hasDogs } }, res) => {
    petAPIbyUserPref(type, location, hasKids, hasCats, hasDogs)
        .then(petResults => {
            res.json(petResults)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

router.post("/pets/", ({ body: { type, location, hasKids, hasCats, hasDogs } }, res) => {
    petAPIbyUserPref(type, location, hasKids, hasCats, hasDogs)
        .then(petResults => {
            res.json(petResults)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

module.exports = router;