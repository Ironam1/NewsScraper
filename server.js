const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
const PORT = process.env.PORT || 8080;
const app = express();

// middleware

app.use(logger("dev"));
// JSON parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// handlebars set up
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// DB setup
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/NewsScraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Set Routes

// require("./routes")(app);
app.get("/", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      // res.json(dbArticle);
      res.render("index", {
        msg: "Welcome!",
        articles: dbArticle
      });
    })
    .catch(function(err) {
      res, json(err);
    });
});
app.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      // res.json(dbArticle);
      res.render("index", {
        msg: "Welcome!",
        articles: dbArticle
      });
    })
    .catch(function(err) {
      res, json(err);
    });
});
app.get("/scrape", function(req, res) {
  axios.get("https://www.npr.org/").then(function(resp) {
    let $ = cheerio.load(resp.data);
    // looks for these tags
    $(".story-wrap").each(function(i, element) {
      let result = {};
      // gets the text and the link we are looking for
      result.title = $(element)
        .find("h3")
        .text();
      result.link = $(element)
        .find("a")
        .attr("href");
      result.img = $(element)
        .find("img")
        .attr("src");
      result.text = $(element)
        .find(".story-text")
        .find("p")
        .text();
      console.log(result);
      // create a new object in our database for each article
      if (result.title && result.link) {
        db.Article.create(result)
          .then(function(dbArticle) {
            // console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    });
    // let user know the scrape is finished
    res.render("scrape");
  });
});

app.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});
// Route for posting a note to a specific Article using the article id
app.post("/articles/:id", function(req, res) {
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { note: dbNote._id },
        { new: true }
      );
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res, json(err);
    });
});
// server start
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
