const express = require("express");
const app = express();
const db = require("./models");
const session = require('express-session')
var PORT = process.env.PORT || 3001;
const morgan = require("morgan"); //added for mail
const nodemailer = require("nodemailer"); //added for mail
const cors = require("cors"); //added for cors
require('dotenv').config(); //added for mail
app.use('/sendEmail', require('./routes/sendEmail')) //added for mail
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev')) //added for mail

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}))

// USE ON DEPLOYED
// app.use(session({
//   secret: "keyboard cat",
//   resave: false,
//   saveUninitialized: false,
//   proxy: true,
//   cookie: {
//     maxAge: 2 * 60 * 60 * 1000,
//     sameSite: "none",
//     secure: true
//   }
// }))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000,
  }
}))


//this one is a holdover from login process from winekey
// app.use(session({
//   secret: "keyboard cat",
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//       maxAge: 720000
//   }
// }))

// app.use(express.static("src"));

const usersController = require("./controllers/usersController.js");
app.use("/api/users", usersController);
const matchesController = require("./controllers/matchesController.js");
app.use("/api/matches", matchesController);
const sheltersController = require("./controllers/sheltersController.js");
app.use("/api/shelterAPI", sheltersController);
const petAPIController = require("./controllers/petAPIController.js");
app.use("/api/petAPI", petAPIController);



//TODO: once our db is where we want it, change to force:false
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});