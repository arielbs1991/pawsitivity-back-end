const router = require("express").Router();
const petAPIbyUserPref = require("../utils/petAPIbyUserPref/API.js");
const petAPIbyId = require("../utils/petAPIbyId/API.js");
const db = require("../models");
const shelterAPI = require("../utils/shelterAPI/API.js");

//BASE URL FOR ALL ROUTES ON THIS PAGE: /api/petAPI

//I WAS TRYING TO GET USER INFORMATION / PREFERENCES BY ID AND THEN RUN A PETAPI QUERY BASED ON THOSE AND THEN TURN THAT INTO A JSON OBJECT BUT IDEFK
//STORE USER OBJECT IN SESSIONS THEN WE DON'T HAVE TO FIND IT

// router.get("/", (req, res) => {
//     db.User.findOne({
//         where: {
//             id: req.params.id
//         }
//     })
// })

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

// router.post("/pets/", (req, res) => {
//     const user = req.session.user;
//     const type = user.type;
//     const location = user.postcode;
//     const hasKids = user.hasKids;
//     const hasCats = user.hasCats;
//     const hasDogs = user.hasDogs;
//     petAPIbyUserPref(type, location, hasKids, hasCats, hasDogs)
//         .then(petResults => {
//             res.json(petResults)
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).end()
//         })
// })

//route being used by front-end to populate sessions data??
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