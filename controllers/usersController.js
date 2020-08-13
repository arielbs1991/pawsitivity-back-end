const router = require("express").Router();
const db = require("../models");

//will need to do initial sessions timeout/login page at beginning of each function

router.get("/:id", (req, res) => {
    db.User.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: db.Match,
                include: { model: db.Shelter }
            }
        ]
        //add an order here if we want to sort past matches by something (timestamp?)
    })
        .then(dbUser => {
            db.Match.findAll({
                order: [
                    ['createdAt']
                ]
            })
                .then(dbMatches => {
                    const dbUserJson = dbUser.toJSON();
                    const dbMatchesJson = dbMatches.map(match => match.toJSON());
                    var userObject = { userData: dbUserJson, userMatches: dbMatchesJson };
                    console.log("userObject", userObject);
                    //how to return object for use with react??
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).end()
                })
        })
})

router.post('/', (req, res) => {
    db.User.create({
        userName: req.body.userName,
        email: req.body.email,
        city: req.body.city,
        state: req.body.state,
        phoneNumber: req.body.phoneNumber,
        hasKids: req.body.hasKids,
        hasCats: req.body.hasCats,
        hasDogs: req.body.hasDogs,
        whichSpecies: req.body.whichSpecies
    })
        .then(userData => {
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

router.delete('/:id', (req, res) => {
    db.User.destroy({
        userName: req.body.userName,
        email: req.body.email,
        location: req.body.location,
        phoneNumber: req.body.phoneNumber,
        hasKids: req.body.hasKids,
        hasCats: req.body.hasCats,
        hasDogs: req.body.hasDogs,
        whichSpecies: req.body.whichSpecies
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

router.put('/userName/:id', (req, res) => {
    db.User.update({
        userName: req.body.userName
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbUser => {
            console.log(dbUser);
            res.json(dbUser)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

router.put('/location/:id', (req, res) => {
    db.User.update({
        location: req.body.location
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbUser => {
            console.log(dbUser);
            res.json(dbUser)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

router.put('/phoneNumber/:id', (req, res) => {
    db.User.update({
        phoneNumber: req.body.phoneNumber
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbUser => {
            console.log(dbUser);
            res.json(dbUser)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

router.put('/hasKids/:id', (req, res) => {
    db.User.update({
        hasKids: req.body.hasKids
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbUser => {
            console.log(dbUser);
            res.json(dbUser)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

router.put('/hasDogs/:id', (req, res) => {
    db.User.update({
        hasDogs: req.body.hasDogs
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbUser => {
            console.log(dbUser);
            res.json(dbUser)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

router.put('/hasCats/:id', (req, res) => {
    db.User.update({
        hasCats: req.body.hasCats
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbUser => {
            console.log(dbUser);
            res.json(dbUser)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

router.put('/whichSpecies/:id', (req, res) => {
    db.User.update({
        whichSpecies: req.body.whichSpecies
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbUser => {
            console.log(dbUser);
            res.json(dbUser)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
});

module.exports = router;