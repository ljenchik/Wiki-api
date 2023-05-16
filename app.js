//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
});

// Schema for creating a blog entry
const articlesSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// Article model
const Article = mongoose.model("Article", articlesSchema);

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Better way to use express route to chain methods

app
  .route("/articles")
  .get(async function (req, res) {
    await Article.find({})
      .then(function (allArticlesFound) {
        res.send(allArticlesFound);
      })
      .catch(function (err) {
        console.log(err);
        res.send(err);
      });
  })
  .post(async function (req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    await Article.insertMany([newArticle])
      .then(function () {
        res.send("Successfully added a new article");
      })
      .catch(function (err) {
        console.log(err);
        res.send(err);
      });
  })
  .delete(async function (req, res) {
    await Article.deleteMany({})
      .then(function () {
        res.send("Successfully deleted all articles!");
      })
      .catch(function (err) {
        res.send(err);
      });
  });

// Requests targeting a specific article
// Route parameters
app
  .route("/articles/:articleTitle")
  .get(async function (req, res) {
    await Article.findOne({ title: req.params.articleTitle })
      .then(function (articleFound) {
        res.send(articleFound);
      })
      .catch(function (err) {
        console.log(err);
        res.send(err);
      });
  })
  .put(async function (req, res) {
    await Article.findOneAndUpdate(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { new: true }
    )
      .then(function () {
        res.send("Successfully updated!");
      })
      .catch(function (err) {
        console.log(err);
        res.send(err);
      });
  })
  .patch(async function (req, res) {
    await Article.findOneAndUpdate(
      { title: req.params.articleTitle },
      { $set: req.body }
    )
      .then(function () {
        res.send("Successfully updated!");
      })
      .catch(function (err) {
        console.log(err);
        res.send(err);
      });
  })
  .delete(async function (req, res) {
    await Article.deleteOne({ title: req.params.articleTitle })
      .then(function () {
        res.send("Successfully deleted an article!");
      })
      .catch(function (err) {
        res.send(err);
      });
  });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
