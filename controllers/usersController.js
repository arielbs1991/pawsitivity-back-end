const router = require("express").Router();
const db = require("../models");
const bcrypt = require('bcrypt')

//BASE URL FOR ALL ROUTES ON THIS PAGE: /api/users

//will need to do initial sessions timeout/login page at beginning of each function

//TODO: Remove or comment out on official deployment for security
router.get("/userlist/", (req, res) => {
    db.User.findAll({})
    .then(userList => {
        res.json(userList);
    })
    .catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

// CHANGED ROUTE SO THAT THE OTHER ROUTES WOULD NOT HIT THIS ROUTE BY ACCIDENT.
router.get("/finduser/:id", (req, res) => {
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
                    return res.json(userObject);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).end()
                })
        })
})

router.get('/readsessions', (req, res) => {
    res.json(req.session.user)
})

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("logout complete!")
})

router.post('/', (req, res) => {
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city,
        state: req.body.state,
        postcode: req.body.postcode,
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

router.post('/login', (req, res) => {
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            res.status(404).send("No such user exists");
        } else {
            if (
                // UNCOMMENT WHEN YOU WANT TO AUTHENTICATE.
                bcrypt.compareSync
                    (req.body.password, user.password)) {
                req.session.user = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    userId: user.id,
                    postcode: user.postcode,
                    hasKids: user.hasKids,
                    hasCats: user.hasCats,
                    hasDogs: user.hasDogs,
                    whichSpecies: user.whichSpecies
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

router.delete('/:id', (req, res) => {
    db.User.destroy({
        userName: req.body.userName,
        email: req.body.email,
        city: req.body.city,
        state: req.body.state,
        postcode: req.body.postcode,
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

router.put('/firstName/', ({ session: { user: { userId } } }, res) => {
    db.User.update({
        firstName: req.body.firstName
    },
        {
            where: {
                id: userId
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

router.put('/lastName/:id', (req, res) => {
    db.User.update({
        lastName: req.body.lastName
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


router.put('/city/:id', (req, res) => {
    db.User.update({
        city: req.body.city
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
router.put('/state/:id', (req, res) => {
    db.User.update({
        state: req.body.state
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
router.put('/postcode/:id', (req, res) => {
    db.User.update({
        postcode: req.body.postcode
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