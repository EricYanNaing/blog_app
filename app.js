//import express.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//import path
const postRouter = require("./routes/post");
const adminRouter = require("./routes/admin");
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.listen(8080);
