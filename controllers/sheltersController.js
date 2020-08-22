const router = require("express").Router();
const shelterAPI = require("../utils/shelterAPI/API.js")
const db = require("../models");
const getToken = require("../utils/petAPI/getToken");

//BASE URL FOR ALL ROUTES ON THIS PAGE: api/shelterAPI
//planning to change to: api/shelters

//route to find petfinder shelter data by organization id --shelterside
router.get("/PetfinderShelter/:orgId", (req, res) => {
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
        shelterAPI(req.params.orgId, req.session.shelter.token)
            .then(dbPetfinderShelter => {
                res.json(dbPetfinderShelter)
                console.log("PetfinderShelter results", dbPetfinderShelter);
            })
            .catch(err => {
                console.log(err);
                res.status(500).end()
            })
    }
})

//Route for grabbing user info for shelters to look at, potentially
router.get("/finduser/:id", (req, res) => {
    // if (!req.session.shelter) {
    //     res.status(403).end();
    // } else {
    db.User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(dbUser => {
            res.json(dbUser)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
    // }
})

//get animal shelter by id --shelterside
router.get("/AnimalShelter/", (req, res) => {
    // router.get("/AnimalShelter/:AnimalShelterId", (req, res) => {
    if (!req.session.shelter) {
        // if (!req.session.user) {
        res.status(403).end();
    } else {
        db.AnimalShelter.findOne({
            where: {
                id: req.session.shelter.ShelterId
                // id: req.params.AnimalShelterId
            }
        })
            .then(dbAnimalShelter => {
                res.json(dbAnimalShelter)
            })
            .catch(err => {
                console.log(err);
                res.status(500).end()
            })
    }
})

//create new animal shelter --shelterside
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
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
        res.json(req.session.shelter)
    }
})

router.get('/logout', (req, res) => {
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
        req.session.destroy();
        res.send('logout complete!');
    }
})

//login route --shelterside
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

//update all animal shelter info --shelterside
router.put('/updateAll/', (req, res) => {
    // router.put('/updateAll/:AnimalShelterId', (req, res) => {
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
        db.AnimalShelter.update({
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
                    id: req.session.shelter.ShelterId
                    // id: req.params.AnimalShelterId
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
    }
})

//update orgId
router.put('/orgId/', (req, res) => {
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
    db.AnimalShelter.update({
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
    }
})

//update AnimalShelterName
router.put('/AnimalshelterName/', (req, res) => {
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
    db.AnimalShelter.update({
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
    }
})

//Update address line 1
router.put('/address1/', (req, res) => {
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
    db.AnimalShelter.update({
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
    }
})

//update address line 2
router.put('/address2/', (req, res) => {
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
    db.AnimalShelter.update({
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
    }
})

//update city
router.put('/city/', (req, res) => {
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
    db.AnimalShelter.update({
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
    }
})

//update state
router.put('/state/', (req, res) => {
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
    db.AnimalShelter.update({
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
    }
})

//update postcode
router.put('/postcode/', (req, res) => {
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
    db.AnimalShelter.update({
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
    }
})

//update phone number
router.put('/phoneNumber/', (req, res) => {
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
    db.AnimalShelter.update({
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
    }
})

//Delete route
router.delete('/', (req, res) => {
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
    db.AnimalShelter.destroy({
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
    }
})

module.exports = router;