const express = require('express')
const sendEmailRouter = express.Router()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'pawsitivity.ATACK@gmail.com',
        pass: 'NewPassword1!'
    }
})

var message = {
    from: 'pawsitivity.ATACK@gmail.com',
    to: "ariel.strayer@gmail.com",
    subject: "Welcome to Pawsitivity!",
    text: "Chicky nug nugs are good",
    html: "<p>Chicky nug nugs are good</p>"
}

  transporter.sendMail(message, function(error,info){
      if (error) {
          console.log(error);
      } else {
          console.log("email send: " +info.response)
      }
  })
