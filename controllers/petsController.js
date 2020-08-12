// const router = require("express").Router();
// const db = require("../models");



// router.post('seenpets/', (req, res) => {
//     // if (!req.session.user) {
//     //     res.redirect("/auth/login");
//     // } else {
//     db.Pet.create({
//         petName: req.body.petName,
//         year: req.body.wineYear
//     })
//         .then(inventoryData => {
//             res.json(inventoryData)
//         })

//         .catch(err => {
//             console.log(err);
//             res.status(500).end()
//         })
// }
// );