const express = require("express");
const router = express.Router();
const { posts } = require("./admin");

router.get("/", (req, res, next) => {
  console.log(posts);
  res.render("homepage", { title: "Home Page", postsArr: posts });
});
router.get("/post", (req, res, next) => {
  res.render("postpage", { title: "Post Page" });
});

module.exports = router;
