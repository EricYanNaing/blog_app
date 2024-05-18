//import express.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//import Models to connect each
const Post = require("./models/post");
const User = require("./models/uesr");

//import sequelize to connect to db
const sequelize = require("./utils/database");

//import path
const postRouter = require("./routes/post");
const adminRouter = require("./routes/admin");
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//import User to every page
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      console.log("User =====> ", user);
      next();
    })
    .catch((err) => console.log(err));
});
//declare middleware
app.use("/post", (req, res, next) => {
  console.log("I am post middlewrae");
  next();
});
app.use("/admin", (req, res, next) => {
  console.log("I am admin middlewrae");
  next();
});
app.use("/admin", adminRouter);
app.use(postRouter);

//render views
app.set("view engine", "ejs");
app.set("views", "views");

//connect db tables
Post.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Post);
//connect to DB
sequelize
  .sync({ force: true })
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "zyn", email: "zyn@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    app.listen("8080");
  })
  .catch((err) => console.log(err));
