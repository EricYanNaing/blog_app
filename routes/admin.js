const express = require("express");
const router = express.Router();

const postController = require("../controllers/post");

router.get("/create-post", postController.renderCreatePage);
router.post("/", postController.createPost);

router.get("/edit-post/:postId", postController.renderEditPage);
router.post("/edit-post", postController.updatePost);

router.post("/delete", postController.deletePost);

module.exports = router;
