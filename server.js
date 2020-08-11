const express = require("express");
const app = express();
const db = require("./models");

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 720000
  }
}))

app.use(express.static("client/src"));



//TODO: once our db is where we want it, change to force:false
db.sequelize.sync({ force:false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
