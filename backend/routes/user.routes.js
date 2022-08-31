const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// Routes d'authentification
router.post("/register", authController.signUp);

// Routes utilisateurs
router.get("/", userController.getAllUsers);

module.exports = router;