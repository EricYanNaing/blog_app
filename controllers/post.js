const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  const { title, description, imgUrl } = req.body;
  Post.create({
    title,
    description,
    imgUrl,
    userId: req.user.id,
  })
    .then((post) => {
      console.log(post);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.renderCreatePage = (req, res, next) => {
  res.render("addpost", { title: "Create New Post" });
};

exports.renderHomePage = (req, res, next) => {
  Post.findAll()
    .then((rows) => {
      console.log(rows);
      res.render("homepage", { title: "Home Page", postsArr: rows });
    })
    .catch((err) => console.log(err));
};

exports.renderDetailPage = (req, res, next) => {
  const postId = req.params.postId;
  Post.findOne({ where: { id: postId } })
    .then((post) => {
      res.render("detail", { title: post.title, post });
    })
    .catch((err) => err);
};

exports.renderEditPage = (req, res) => {
  const postId = req.params.postId;
  Post.findOne({ where: { id: postId } }).then((post) => {
    res.render("edit", { title: "Edit Post", post });
  });
};

exports.updatePost = (req, res) => {
  const { postId, title, description, imgUrl } = req.body;
  Post.findByPk(postId)
    .then((post) => {
      if (!post) {
        res.redirect("/edit");
      } else {
        post.title = title;
        post.description = description;
        post.imgUrl = imgUrl;
        return post.save();
      }
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deletePost = (req, res) => {
  const { postId } = req.body;
  Post.findByPk(postId)
    .then((post) => {
      if (!post) {
        res.redirect("/edit");
      } else {
        return post.destroy();
      }
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
