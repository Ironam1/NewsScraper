const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
const PORT = 8080;

const app = express();

// middleware

app.use(logger("dev"));
// JSON parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// handlebars set up
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
// connect the Mongo DB
// mongoose.connect("mongodb://localhost:27017/NewsScraper", {
//   useNewUrlParser: true
// });
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/NewsScraper";
mongoose.connect(MONGODB_URI)
// Set Routes

app.get("/", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res, json(err);
    });
});

app.get("/scrape", function(req, res) {
  axios.get("https://www.npr.org/").then(function(resp) {
    let $ = cheerio.load(resp.data);
    // looks for these tags
    $("h3").each(function(i, element) {
      let result = {};
      // gets the text and the link we are looking for
      result.title = $(this).text();
      result.link = $(this)
        .parent("a")
        .attr("href");
      // create a new object in our database for each article
      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
    });
    // let usr know the scrape is finished
    res.send("Scrape Complete");
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
