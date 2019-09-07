$.getJSON("/articles", function(data) {
  for (i = 0; i < data.length; i++) {
    $("#articles").append(
      "<p data-id='" +
        data[i]._id +
        "'>" +
        data[i].title +
        "<br />" +
        data[i].link +
        "</p>"
    );
  }
});
// scrape for articles
// $(document).on("click", "#getScrape", function(evt){
//   evt.preventDefault();

//   app.get("/scrape", function(req, res) {
//     axios.get("https://www.npr.org/").then(function(resp) {
//       let $ = cheerio.load(resp.data);
//       // looks for these tags
//       $("h3").each(function(i, element) {
//         let result = {};
//         // gets the text and the link we are looking for
//         result.title = $(this).text();
//         result.link = $(this)
//           .parent("a")
//           .attr("href");
//         // create a new object in our database for each article
//         db.Article.create(result)
//           .then(function(dbArticle) {
//             console.log(dbArticle);
//           })
//           .catch(function(err) {
//             console.log(err);
//           });
//       });
//       // let usr know the scrape is finished
//       res.send("Scrape Complete");
//     });
//   });
// });
// make note pop up on p tag click
$(document).on("click", "p", function() {
  $("#notes").empty();
  // get the id from the tag
  let thisId = $(this).attr("data-id");
  // console.log(thisId);
  // console.log(this);
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function(data) {
    console.log(data);
    $("#notes").append("<h2>" + data.title + "</h2>");
    $("#notes").append("<input id='titleinput' name='title' >");
    $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

    // if there is already a note
    if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
    }
  });
});

// save the note function
$(document).on('click', "#savenote", function () {
  let thisId= $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
          title: $("#titleinput").val().trim(),
          body: $("#bodyinput").val().trim()
      }
  })
  .then(function(data){
      console.log(data);
      $("#notes").empty();
  });
});

// also remove other values
$("#titleinput").val("");
$("#bodyinput").val("");