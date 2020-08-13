const router = require("express").Router();
const petAPI = require("../utils/petAPI/API.js");
const db = require("../models");

//I WAS TRYING TO GET USER INFORMATION / PREFERENCES BY ID AND THEN RUN A PETAPI QUERY BASED ON THOSE AND THEN TURN THAT INTO A JSON OBJECT BUT IDEFK
//STORE USER OBJECT IN SESSIONS THEN WE DON'T HAVE TO FIND IT

router.get("/api/pets/", ({ body: { type, location } }, res) => {
    petAPI(type, location)
        .then(petResults => {

            res.json(petResults)
        })
})

module.exports = router