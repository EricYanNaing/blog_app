const express = require("express");
const router = express.Router();

let posts = [];

router.get("/create-post", (req, res, next) => {
  res.render("addpost", { title: "Create New Post" });
});
router.post("/", (req, res, next) => {
  const { title, description, imgUrl } = req.body;
  posts.push({
    title,
    description,
    imgUrl,
  });
  console.log(req.body);
  res.redirect("/");
});

module.exports = { adminRouter: router, posts };
