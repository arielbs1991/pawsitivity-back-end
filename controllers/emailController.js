const router = require("express").Router();
const sendEmail = require("../routes/sendEmail.js");


router.post('/sendEmail', (req, res) => {
    if (!req.session.user) {
        res.redirect("/api/users/login");
    } else {
        const emailContent = {
            firstName: req.session.user.firstName,
            lastName: req.session.user.lastName,
            email: req.session.user.email,
            shelterEmail: req.body.shelterEmail,
            petName: req.body.petName
        }
        // console.log(emailContent)
        sendEmail(emailContent, res)
        // res.json(emailContent)
        // res.send("email sent")
    }
})

module.exports = router