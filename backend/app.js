const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth, requireAuth } = require("./middleware/auth.middleware");
const path = require("path");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");


const app = express();


const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
};
app.use(cors(corsOptions));
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
app.use("/api/post", postRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;