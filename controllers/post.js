const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  const { title, description, imgUrl } = req.body;
  const post = new Post(title, description, imgUrl);
  post
    .setPost()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.renderCreatePage = (req, res, next) => {
  res.render("addpost", { title: "Create New Post" });
};

exports.renderHomePage = (req, res, next) => {
  Post.getAllPost()
    .then(([rows]) => {
      console.log(rows);
      res.render("homepage", { title: "Home Page", postsArr: rows });
    })
    .catch((err) => console.log(err));
};

exports.renderDetailPage = (req, res, next) => {
  const postId = Number(req.params.postId);
  Post.getPost(postId)
    .then(([row]) => {
      console.log(row);
      res.render("detail", { title: row[0].title, post: row[0] });
    })
    .catch((err) => err);
};
