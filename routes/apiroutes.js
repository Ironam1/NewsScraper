module.exports = function(app) {
  app.get("/articles", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        // res.json(dbArticle);
        res.render("index");
      })
      .catch(function(err) {
        res, json(err);
      });
  });
};
