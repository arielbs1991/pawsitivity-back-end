const router = require("express").Router();
const db = require("../models");

//BASE URL FOR ALL ROUTES ON THIS PAGE: /api/matches

//we have a route to find all matches by userid over in userController. Don't make one, Ariel

router.post('/newMatch/', (req, res) => {
    //will eventually need to tie in which userid and shelterid the match is being created under
    db.Match.create({
        isLiked: req.body.isLiked,
        petfinderId: req.body.petfinderId,
        userId: req.session.userId,
        orgId: req.body.orgId,
        animalId: req.body.animalId,
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
    })
        .then(matchData => {
            res.json(matchData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})


router.get('/petfinderId/:petfinderId', (req, res) => {
    db.Match.findOne({
        where: {
            userId: req.session.userId,
            petfinderId: req.params.petfinderId
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
router.get('/userId/:userId', (req, res) => {
    db.Match.findAll({
        where: {
            userId: req.session.userId
        }
    })
        .then(userMatchesData => {
            console.log("user matches: ", userMatchesData);
            res.json(userMatchesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

router.put('/isLiked/:id', (req, res) => {
    db.Match.update({
        isLiked: req.body.isLiked
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbMatch => {
            console.log(dbMatch);
            res.json(dbMatch)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

// router.delete('/:id', (req, res) => {
//     db.Match.destroy({
//         isLiked: req.body.isLiked,
//         petfinderId: req.body.petfinderId,
//     }, {
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

