const router = require("express").Router();
const sendEmail = require("../routes/sendEmail.js");


router.post('/sendEmail', (req, res) => {
    const emailContent = {
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        email: req.session.user.email,
        shelterEmail: req.body.email,
        petName: req.body.petName
    }

    sendEmail(emailContent); 
})
.then(emailData => {
    console.log("SUCCESS EMAIL STUFF", emailData);
    res.json("success");
})
.catch(err => {
    console.log(err);
    res.status(500).end()
})