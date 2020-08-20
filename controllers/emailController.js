const router = require("express").Router();
const sendEmail = require("../routes/sendEmail.js");


router.post('/sendEmail', (req, res) => {
    const emailContent = {
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        email: req.session.user.email,
        shelterEmail: req.body.shelterEmail,
        petName: req.body.petName
    }
    sendEmail(emailContent, res)
})

module.exports=router