const router = require("express").Router();
const shelterAPI = require("../utils/shelterAPI/API.js")
const db = require("../models");


//BASE URL FOR AL ROUTES ON THIS PAGE: /api/animals

router.get("/", (req, res) => {
    db.Animal.findAll({})
        .then(animalData => {
            res.json(animalData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
});

router.get(`/search/`, (req, res) => {
    if (!req.session.user) {
        res.status(403).end();
    } else {
        db.Animal.findAll({
            where: {
                state: req.session.user.state,
                type: req.session.user.whichSpecies,
                likesCats: req.session.user.likesCats,
                likesDogs: req.session.user.likesDogs,
                likesKids: req.session.user.likesKids
            }

        }).then(dbAnimals => {
            res.json(dbAnimals)
        })
            .catch(err => {
                console.log(err);
                res.status(500).end();
            })
    }
})

router.post("/animal", (req, res) => {
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
        db.Animal.create({
            name: req.body.name,
            type: req.body.type,
            imageSrc: req.body.imageSrc,
            breed: req.body.breed,
            secondaryBreed: req.body.secondaryBreed,
            age: req.body.age,
            sex: req.body.sex,
            size: req.body.size,
            bio: req.body.bio,
            likesCats: req.body.likesCats,
            likesDogs: req.body.likesDogs,
            likesKids: req.body.likesKids,
            AnimalMatchId: req.body.AnimalMatchId
        })
            .then(animalData => {
                res.json(animalData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).end();
            })
    }
})

router.delete('/delete/:id', (req, res) => {
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
        db.Animal.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(deleted => {
                res.json(deleted)
            })
            .catch(err => {
                console.log(err);
                res.status(500).end()
            })
    }
})

router.put("/animal/:AnimalId", (req, res) => {
    if (!req.session.shelter) {
        res.status(403).end();
    } else {
        db.Animal.update({
            name: req.body.name,
            type: req.body.type,
            imageSrc: req.body.imageSrc,
            breed: req.body.breed,
            secondaryBreed: req.body.secondaryBreed,
            age: req.body.age,
            sex: req.body.sex,
            size: req.body.size,
            bio: req.body.bio,
            likesCats: req.body.likesCats,
            likesDogs: req.body.likesDogs,
            likesKids: req.body.likesKids,
        },
            {
                where: {
                    id: req.params.AnimalId
                }
            })
            .then(animalData => {
                res.json(animalData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).end();
            })
    }
})

module.exports = router;