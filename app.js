const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, eaque non error illum ad corporis. Tenetur mollitia, aut officiis fuga aperiam at dignissimos obcaecati consequatur accusantium! Accusamus deserunt, ad consectetur sint autem earum in qui est voluptatibus aliquam alias, voluptates voluptatem, magnam vel eos sit modi aspernatur non! Quae, laboriosam?";
const aboutContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, eaque non error illum ad corporis. Tenetur mollitia, aut officiis fuga aperiam at dignissimos obcaecati consequatur accusantium! Accusamus deserunt, ad consectetur sint autem earum in qui est voluptatibus aliquam alias, voluptates voluptatem, magnam vel eos sit modi aspernatur non! Quae, laboriosam?";
const contactContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, eaque non error illum ad corporis. Tenetur mollitia, aut officiis fuga aperiam at dignissimos obcaecati consequatur accusantium! Accusamus deserunt, ad consectetur sint autem earum in qui est voluptatibus aliquam alias, voluptates voluptatem, magnam vel eos sit modi aspernatur non! Quae, laboriosam?";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin:admin@cluster0.guh6svr.mongodb.net/blogDB");

const postSchema = {
  title: String,
  content: String
 };

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
    });
  });
  
  app.get("/compose", function (req, res) {
    res.render("compose");
  });
  
  app.post("/compose", function (req, res) {
    const post = new Post ({
      title: req.body.postTitle,
      content: req.body.postContent
    });
    post.save(function(err){
      if(!err){
        res.redirect("/");
      }
    });
  });

  app.get("/posts/:postId", function(req, res){

    const requestedPostId = req.params.postId;
    
      Post.findOne({_id: requestedPostId}, function(err, post){
        res.render("post", {
          title: post.title,
          content: post.content
        });
      });
    });

app.get("/about", function (req, res) {
  res.render("about", { aboutPage: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactPage: contactContent });
});

app.listen(2920, function () {
  console.log("2920 port is OK");
});
