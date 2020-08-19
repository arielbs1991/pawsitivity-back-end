const nodemailer = require('nodemailer')

sendEmail = ({firstName, lastName, email, shelterEmail, petName}, res) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pawsitivity.ATACK@gmail.com',
            pass: 'NewPassword1!'
        }
    })

    const message = {
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
        <br>
        Name: ${firstName} ${lastName} <br>
        Email: ${email} <br>
        This is will go into the to field eventualy: ${shelterEmail}<br>
        </p>`
    }
    console.log("----------FIRSTNAME---------",firstName)

    transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("email send: " + info.response)
            res.json(info)
        }
    })

}

// module.exorts = sendEmailRouter
module.exports = sendEmail