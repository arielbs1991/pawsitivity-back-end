const router = require("express").Router();
const petAPI = require("../utils/petAPI/API.js");
const db = require("../models");

//I WAS TRYING TO GET USER INFORMATION / PREFERENCES BY ID AND THEN RUN A PETAPI QUERY BASED ON THOSE AND THEN TURN THAT INTO A JSON OBJECT BUT IDEFK
//STORE USER OBJECT IN SESSIONS THEN WE DON'T HAVE TO FIND IT

router.get("/pets/", ({ body: { type, location, good_with_children, goot_with_cats, good_with_dogs } }, res) => {
    petAPI(type, location, good_with_children, goot_with_cats, good_with_dogs)
        .then(petResults => {
            res.json(petResults)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

module.exports = router