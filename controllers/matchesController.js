const router = require("express").Router();
const db = require("../models");

//BASE URL FOR ALL ROUTES ON THIS PAGE: /api/matches

//we have a route to find all matches by userid over in userController. Don't make one, Ariel

router.get("/byid/:id", (req, res) => {
    db.AnimalMatch.findAll({
        where: {
            // id: req.session.user.UserId
            id: req.params.id
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
                    // id: req.session.user.UserId
                    id: req.params.id
                },
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

router.post('/newShelterMatch/', (req, res) => {
    db.AnimalMatch.create({
        isLiked: req.body.isLiked,
        UserId: req.body.UserId,
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
})
router.post('/newPetfinderMatch/', (req, res) => {
    db.PetfinderMatch.create({
        PetfinderId: req.body.PetfinderId,
        isLiked: req.body.isLiked
    })
        .then(matchData => {
            console.log("New Match", matchData);
            res.json(matchData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})


router.get('/petfinderId/:PetfinderId', (req, res) => {
    db.PetfinderMatch.findOne({
        where: {
            UserId: req.session.user.UserId,
            PetfinderId: req.params.PetfinderId
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
})

router.get('/animalId/:AnimalId', (req, res) => {
    db.PetfinderMatch.findOne({
        where: {
            UserId: req.session.user.UserId,
            AnimalId: req.params.AnimalId
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
})

//not sure if we're using this route


router.put('/isLikedShelter/:AnimalId', (req, res) => {
    db.AnimalMatch.update({
        isLiked: req.body.isLiked
    },
        {
            where: {
                AnimalId: req.params.AnimalId
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
})

router.put('/isLikedPetfinder/:PetfinderId', (req, res) => {
    db.PetfinderMatch.update({
        isLiked: req.body.isLiked
    },
        {
            where: {
                PetfinderId: req.params.PetfinderId
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
})

// router.delete('/:id', (req, res) => {
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
// })

// router.delete('/:id', (req, res) => {
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
// })

module.exports = router;

