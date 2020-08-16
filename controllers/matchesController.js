const router = require("express").Router();
const db = require("../models");

//BASE URL FOR ALL ROUTES ON THIS PAGE: /api/matches

router.post('/newMatch/', (req, res) => {
    //will eventually need to tie in which userid and shelterid the match is being created under
    db.Match.create({
        isLiked: req.body.isLiked,
        petfinderId: req.body.petfinderId,
        // petName: req.body.petName,
        // isDog: req.body.isDog,
        // age: req.body.age,
        // breed: req.body.breed,
        // sex: req.body.sex,
        // size: req.body.size,
        // likesKids: req.body.likesKids,
        // likesDogs: req.body.likesDogs,
        // likesCats: req.body.likesCats,
        // userId: req.body.userId,
        // shelterId: req.body.shelterId
    })
        .then(matchData => {
            res.json(matchData)
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
//         isLike: req.body.isLike,
//         petName: req.body.petName,
//         isDog: req.body.isDog,
//         age: req.body.age,
//         breed: req.body.breed,
//         sex: req.body.sex,
//         size: req.body.size,
//         likesKids: req.body.likesKids,
//         likesDogs: req.body.likesDogs,
//         likesCats: req.body.likesCats
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

