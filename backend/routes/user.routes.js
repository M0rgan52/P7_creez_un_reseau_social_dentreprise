const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();

// Routes d'authentification
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// Routes utilisateurs
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUsers);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// Routes avec images
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;