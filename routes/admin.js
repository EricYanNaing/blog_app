const express = require("express");
const router = express.Router();

const postController = require("../controllers/post");

router.get("/create-post", postController.renderCreatePage);
router.post("/", postController.createPost);

module.exports = router;
