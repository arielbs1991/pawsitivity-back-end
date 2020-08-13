const nodemailer = require ("nodemailer");

async function main() {

    let testAccount = await nodemailer.createTestAccount

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port:587,
        secure:false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    let info = await transporter.sendMail({
        from: '"Trish" <trishnss@gmail.com>',
        to: "pawsitivity.ATACK@gmail.com",
        subject: "hello",
        text: "Does this work?",
        html: "<b>Does this work?</b>",
    });

    console.log("Message sent: %s", info.messageId);

    console.log("preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);