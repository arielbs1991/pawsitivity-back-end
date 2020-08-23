const express = require("express");
const app = express();
const db = require("./models");
const session = require('express-session')
var PORT = process.env.PORT || 3001;
const morgan = require("morgan"); //added for mail
const nodemailer = require("nodemailer"); //added for mail
const cors = require("cors"); //added for cors
require('dotenv').config(); //added for mail

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev')) //added for mail

// TODO:change to front-end deployed link when front end is deployed
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}))

// app.use(cors({
//   origin: ["https://pawsitivity-atack-api.herokuapp.com/"],
//   credentials: true
// }))

// USE ON DEPLOYED
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true
  }
}))

//Comment out on deployed
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 2 * 60 * 60 * 1000,
//   }
// }))

app.get("/", (req, res) => {
  res.send("nothing to see here");
})

const usersController = require("./controllers/usersController.js");
app.use("/api/users", usersController);
const matchesController = require("./controllers/matchesController.js");
app.use("/api/matches", matchesController);
const sheltersController = require("./controllers/sheltersController.js");
app.use("/api/shelterAPI", sheltersController);
const petAPIController = require("./controllers/petAPIController.js");
app.use("/api/petAPI", petAPIController);
const animalController = require("./controllers/animalController.js");
app.use("/api/animals", animalController);
const emailController = require("./controllers/emailController.js");
app.use(emailController);



//TODO: once our db is where we want it, change to force:false
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("listen to me, heroku. Changes have been made, I swear");
    console.log("App listening on PORT " + PORT);
  });
});