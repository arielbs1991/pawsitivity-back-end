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
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        postcode: req.body.postcode,
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

router.get('/readsessions', (req, res) => {
    res.json(req.session.shelter)
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('logout complete!');
})

//login route
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
                    address1: shelter.address1,
                    address2: shelter.address2,
                    city: shelter.city,
                    state: shelter.state,
                    postcode: shelter.postcode,
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

//update all shelter info
router.put('/updateAll/:ShelterId', (req, res) => {
    db.Shelter.update({
        orgId: req.body.orgId,
        AnimalshelterName: req.body.AnimalshelterName,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        postcode: req.body.postcode,
        phoneNumber: req.body.phoneNumber
    },
        {
            where: {
                // id: req.session.shelter.ShelterId
                id: req.params.ShelterId
            }
        })
        .then(dbShelter => {
            req.session.shelter.orgId = req.body.orgId
            req.session.shelter.AnimalshelterName = req.body.AnimalshelterName
            req.session.shelter.address1 = req.body.address1
            req.session.shelter.address2 = req.body.address2
            req.session.shelter.city = req.body.city
            req.session.shelter.state = req.body.state
            req.session.shelter.postcode = req.body.postcode
            req.session.shelter.phoneNumber = req.body.phoneNumber
            res.json(dbShelter)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

router.put('/orgId/', (req, res) => {
    db.Shelter.update({
        orgId: req.body.orgId
    },
        {
            where: {
                id: req.session.shelter.ShelterId
            }
        })
        .then(dbShelter => {
            req.session.shelter.orgId = req.body.orgId
            res.json(dbShelter)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
})

router.put('/AnimalshelterName/', (req, res) => {
    db.Shelter.update({
        AnimalshelterName: req.body.AnimalshelterName
    },
        {
            where: {
                id: req.session.shelter.ShelterId
            }
        })
        .then(dbShelter => {
            req.session.shelter.AnimalshelterName = req.body.AnimalshelterName
            res.json(dbShelter)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
})

router.put('/address1/', (req, res) => {
    db.Shelter.update({
        address1: req.body.address1
    },
        {
            where: {
                id: req.session.shelter.ShelterId
            }
        })
        .then(dbShelter => {
            req.session.shelter.address1 = req.body.address1
            res.json(dbShelter)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
})

router.put('/address2/', (req, res) => {
    db.Shelter.update({
        address2: req.body.address2
    },
        {
            where: {
                id: req.session.shelter.ShelterId
            }
        })
        .then(dbShelter => {
            req.session.shelter.address2 = req.body.address2
            res.json(dbShelter)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
})

router.put('/city/', (req, res) => {
    db.Shelter.update({
        city: req.body.city
    },
        {
            where: {
                id: req.session.shelter.ShelterId
            }
        })
        .then(dbShelter => {
            req.session.shelter.city = req.body.city
            res.json(dbShelter)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
})

router.put('/state/', (req, res) => {
    db.Shelter.update({
        state: req.body.state
    },
        {
            where: {
                id: req.session.shelter.ShelterId
            }
        })
        .then(dbShelter => {
            req.session.shelter.state = req.body.state
            res.json(dbShelter)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
})

router.put('/postcode/', (req, res) => {
    db.Shelter.update({
        postcode: req.body.postcode
    },
        {
            where: {
                id: req.session.shelter.ShelterId
            }
        })
        .then(dbShelter => {
            req.session.shelter.postcode = req.body.postcode
            res.json(dbShelter)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
})

router.put('/phoneNumber/', (req, res) => {
    db.Shelter.update({
        phoneNumber: req.body.phoneNumber
    },
        {
            where: {
                id: req.session.shelter.ShelterId
            }
        })
        .then(dbShelter => {
            req.session.shelter.phoneNumber = req.body.phoneNumber
            res.json(dbShelter)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
})

//Delete route
router.delete('/', (req, res) => {
    db.Shelter.destroy({
        where: {
            id: req.session.shelter.ShelterId
        }
    })
    .then(shelterData => {
        res.json(shelterData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).end();
    })
})

module.exports = router;