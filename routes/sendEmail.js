// const express = require('express')
const nodemailer = require('nodemailer')
// const sendEmailRouter = express.Router()

sendEmail = ({firstName, lastName, email, shelterEmail, petName}) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pawsitivity.ATACK@gmail.com',
            pass: 'NewPassword1!'
        }
    })

    // var message = {
    //     from: 'pawsitivity.ATACK@gmail.com',
    //     to: "pawsitivity.ATACK@gmail.com",
    //     subject: "Welcome to Pawsitivity!",
    //     text: "Chicky nug nugs are good",
    //     html: "<p>Chicky nug nugs are good</p>"
    // }

    var message = {
        //TO DO FOR LIVE
        from: 'pawsitivity.ATACK@gmail.com',
        // to:`${shelterEmail}`,
        to: "pawsitivity.ATACK@gmail.com",
        subject: `${firstName} ${lastName} is interested in ${petName}`,
        text: `Hello! ${firstName} is interested in adopting ${petName}. If this pet is still available, please contact ${firstName} directly to begin the application process.
        ${firstName}
        ${lastName}
        ${shelterEmail}
        ${email}`,
        html: `<p>Hello! ${firstName} is interested in adopting ${petName}. If this pet is still available, please contact ${firstName} directly to begin the application process.
        ${firstName}
        ${lastName}
        ${email}
        ${shelterEmail}
        </p>`
    }

    transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("email send: " + info.response)
        }
    })

}

// module.exorts = sendEmailRouter
module.exports = sendEmail