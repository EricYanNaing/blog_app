const db = require("../utils/database");

module.exports = class Post {
  constructor(title, description, imgUrl) {
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
  }

  static getAllPost() {
    return db.execute("SELECT * FROM post");
  }

  static getPost(id) {
    return db.execute("SELECT * FROM post WHERE post.id = ?", [id]);
  }

  setPost() {
    return db.execute(
      "INSERT INTO post (title,description,imgUrl) VALUES (?,?,?) ",
      [this.title, this.description, this.imgUrl]
    );
  }
};
