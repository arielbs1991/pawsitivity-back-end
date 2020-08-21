const router = require("express").Router();
const shelterAPI = require("../utils/shelterAPI/API.js")
const db = require("../models");
const getToken = require("../utils/petAPI/getToken");

//BASE URL FOR ALL ROUTES ON THIS PAGE: api/shelterAPI

//route to find petfinder shelter data by organization id, not gonna 
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

//create new petfinder shelter
router.post("/PetfinderShelter/", (req, res) => {
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

//get animal shelter by id
router.get("/AnimalShelter/:AnimalShelterId", (req, res) => {
    db.AnimalShelter.findOne({
        where: {
            // id: req.session.shelter.ShelterId
            id: req.params.AnimalShelterId
        }
    })
    .then(dbAnimalShelter => {
        res.json(dbAnimalShelter)
    })
    .catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

//create new animal shelter
router.post("/AnimalShelter/", (req, res) => {
    db.AnimalShelter.create({
        orgId: req.body.orgId,
        AnimalshelterName: req.body.AnimalshelterName,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    })
    .then(dbAnimalShelter => {
        res.json(dbAnimalShelter)
    })
    .catch(err => {
        console.log(err);
        res.status(500).end();
    })
})

router.post('/login', (req, res) => {
    db.AnimalShelter.findOne({
        where: {
            email: req.body.email
        }
    }).then(async shelter => {
        if (!shelter) {
            res.status(404).send("No such shelter exists");
        } else {
            if (
                bcrypt.compareSync
                    (req.body.password, shelter.password)) {
                const { data: { access_token } } = await getToken()
                req.session.shelter = {
                    orgId: shelter.orgId,
                    AnimalShelterName: shelter.AnimalShelterName,
                    email: shelter.email,
                    ShelterId: shelter.id,
                    address: shelter.address,
                    phoneNumber: shelter.phoneNumber,
                    token: access_token
                }
                res.json(req.session);
            } else {
                res.status(401).send("Incorrect password")
            }
        }
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

module.exports = router;