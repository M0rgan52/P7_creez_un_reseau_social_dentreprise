const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("../middleware/multer.config.middleware");


// Routes utilisateurs
router.get("/", postController.readPost);
router.post("/", multer, postController.createPost);
router.get("/:id", postController.readOnePost);
router.put("/:id", multer, postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/dislike-post/:id", postController.dislikePost);
router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment-post/:id", postController.editCommentPost);
router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;