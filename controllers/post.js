const posts = [];

exports.createPost = (req, res, next) => {
  const { title, description, imgUrl } = req.body;
  console.log(title, description);
  posts.push({
    id: Math.random(),
    title,
    description,
    imgUrl,
  });
  res.redirect("/");
};

exports.renderCreatePage = (req, res, next) => {
  res.render("addpost", { title: "Create New Post" });
};

exports.renderHomePage = (req, res, next) => {
  console.log(posts);
  res.render("homepage", { title: "Home Page", postsArr: posts });
};

exports.renderDetailPage = (req, res, next) => {
  const postId = Number(req.params.postId);
  const post = posts.find((post) => post.id === postId);
  console.log(post);
  res.render("detail", { title: "Edit Post", post });
};
