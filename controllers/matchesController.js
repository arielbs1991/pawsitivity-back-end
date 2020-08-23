const router = require("express").Router();
const db = require("../models");

//BASE URL FOR ALL ROUTES ON THIS PAGE: /api/matches

//gets all matches associated with user by userid
router.get("/byUserId/", (req, res) => {
    // router.get("/byid/:id", (req, res) => {
    if (!req.session.user) {
        res.status(403).end();
    } else {
        db.AnimalMatch.findAll({
            where: {
                id: req.session.user.UserId
                // id: req.params.id
            },
            order: ['createdAt'],
            include: [
                {
                    model: db.AnimalShelter,
                }
            ]
        })
            .then(dbAnimalMatch => {
                db.PetfinderMatch.findAll({
                    where: {
                        UserId: req.session.user.UserId
                        // id: req.params.id
                    },
                    order: ['createdAt'],
                    // include: [
                    //     { model: db.PetfinderShelter }
                    // ]
                })
                    .then(dbPetfinderMatch => {
                        const Matches = { shelterMatches: dbAnimalMatch, petfinderMatches: dbPetfinderMatch };
                        res.json(Matches);
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).end();
            })
    }
});

//ANIMAL SHELTER ROUTES

router.post('/newMatch/', (req, res) => {
    if (!req.session.user) {
        res.status(403).end();
    } else {
        if (!req.body.AnimalId) {
            db.PetfinderMatch.create({
                PetfinderId: req.body.PetfinderId,
                isLiked: req.body.isLiked,
                UserId: req.session.user.UserId,
                // UserId: req.body.UserId,

            })
                .then(matchData => {
                    console.log("New Match", matchData);
                    res.json(matchData);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).end()
                })
        } else if (!req.body.PetfinderId) {
            db.AnimalMatch.create({
                isLiked: req.body.isLiked,
                UserId: req.session.user.UserId,
                // UserId: req.body.UserId,
                AnimalShelterId: req.body.AnimalShelterId,
                AnimalId: req.body.AnimalId
            })
                .then(matchData => {
                    console.log("New Match", matchData);
                    res.json(matchData);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).end()
                })
        } else {
            console.log(err, "you can't do that, dummy");
        }
    }
})

//return a match by animalmatchid -- userside
router.get('/animalId/:AnimalMatchId', (req, res) => {
    if (!req.session.user) {
        res.status(403).end();
    } else {
        db.AnimalMatch.findOne({
            where: {
                UserId: req.session.user.UserId,
                AnimalMatchId: req.params.AnimalMatchId
            }
        })
            .then(userMatchData => {
                console.log("user matches: ", userMatchData);
                res.json(userMatchData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).end()
            })
    }
})

//return a match by petfindermatch id
router.get('/petfinderId/:PetfinderMatchId', (req, res) => {
    if (!req.session.user || !req.session.shelter) {
        res.status(403).end();
    } else {
        db.PetfinderMatch.findOne({
            where: {
                UserId: req.session.user.UserId,
                PetfinderMatchId: req.params.PetfinderMatchId
            }
        })
            .then(userMatchData => {
                console.log("user matches: ", userMatchData);
                res.json(userMatchData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).end()
            })
    }
})

//update isliked route for shelter animal -- userside
router.put('/shelter/isLiked/:AnimalMatchId', (req, res) => {
    if (!req.session.user) {
        res.status(403).end();
    } else {
        db.AnimalMatch.update({
            isLiked: req.body.isLiked
        },
            {
                where: {
                    id: req.params.AnimalMatchId,

                }
            })
            .then(dbAnimalMatch => {
                console.log(dbAnimalMatch);
                res.json(dbAnimalMatch)
            })
            .catch(err => {
                console.log(err);
                res.status(500).end()
            })
    }
})

//update isliked route for petfinder animal
router.put('/isLikedPetfinder/:PetfinderMatchId', (req, res) => {
    if (!req.session.user) {
        res.status(403).end();
    } else {
        db.PetfinderMatch.update({
            isLiked: req.body.isLiked
        },
            {
                where: {
                    id: req.params.PetfinderMatchId
                }
            })
            .then(dbPetfinderMatch => {
                console.log(dbPetfinderMatch);
                res.json(dbPetfinderMatch)
            })
            .catch(err => {
                console.log(err);
                res.status(500).end()
            })
    }
})

//SHELTER SIDE ROUTES
//return all matches made for unique shelter animal -- TODO: might want to move into a shelter-use specific route/controller file
router.get('/shelter/animalId/:AnimalId', (req, res) => {
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
        db.AnimalMatch.findAll({
            where: {
                AnimalId: req.params.AnimalId
            },
            include: {
                model: db.User
            },
            order: ['createdAt']
        })
            .then(userMatchData => {
                console.log("user matches: ", userMatchData);
                res.json(userMatchData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).end()
            })
    }
})

//return all matches for animal with unique petfinderid
// router.get('/petfinderId/:PetfinderId', (req, res) => {
//     if (!req.session.shelter) {
//         res.status(403).end();
//     } else {
//         db.PetfinderMatch.findAll({
//             where: {
//                 PetfinderId: req.params.PetfinderId
//             }
//         })
//             .then(userMatchData => {
//                 console.log("user matches: ", userMatchData);
//                 res.json(userMatchData);
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.status(500).end()
//             })
//     }
// })

// Destroy animal shelter match
// router.delete('/:id', (req, res) => {
// if (!req.session.user || !req.session.shelter) {
//     res.status(403).end();
// } else {
//     db.AnimalMatch.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(matchData => {
//             res.json(matchData)
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).end()
//         })
// }
// })

//PETFINDER ROUTES

// Destroy petfinder match
// router.delete('/:id', (req, res) => {
// if (!req.session.user || !req.session.shelter) {
//     res.status(403).end();
// } else {
//     db.PetfinderMatch.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(matchData => {
//             res.json(matchData)
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).end()
//         })
// }
// })

//TESTING ROUTES COMMENT OUT IN FINAL VERSION FOR SECURITy
//get ALL animal shelter matches that currently exist -- ROUTE FOR TESTING USE
router.get("/", (req, res) => {
    db.AnimalMatch.findAll({
        order: ['createdAt'],
        include: [
            {
                model: db.AnimalShelter,
            }
        ]
    })
        .then(dbAnimalMatch => {
            db.PetfinderMatch.findAll({
                order: ['createdAt'],
                include: [
                    { model: db.PetfinderShelter }
                ]
            })
                .then(dbPetfinderMatch => {
                    const Matches = { shelterMatches: dbAnimalMatch, petfinderMatches: dbPetfinderMatch };
                    res.json(Matches);
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
});

module.exports = router;