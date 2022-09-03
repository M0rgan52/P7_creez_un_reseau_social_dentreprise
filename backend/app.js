const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth, requireAuth } = require("./middleware/auth.middleware");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/user.routes");


const app = express();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

mongoose
.connect(process.env.SECRET_DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    })
.then(() => console.log("Connexion à MongoDB réussie !"))
.catch((error) => console.log("Connexion à MongoDB échouée !", error));

app.get("*", auth);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send( res.locals.user._id )
});
app.use("/api/user", userRoutes);

module.exports = app;