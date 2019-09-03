// $.getJSON("/articles", function(data) {
//   for (i = 0; i < data.length; i++) {
//     $("#articles").append(
//       "<p data-id='" +
//         data[i]._id +
//         "'>" +
//         data[i].title +
//         "<br />" +
//         data[i].link +
//         "</p>"
//     );
//   }
// });
// scrape for articles
$("#getScrape").on("click", function(evt){
  evt.preventDefault();

  $.ajax()
});
// make note pop up on p tag click
$(document).on("click", "p", function() {
  $("#notes").empty();
  // get the id from the tag
  let thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "api/articles/" + thisId
  }).then(function(data) {
    console.log(data);
    $("#notes").append("<h2>" + data.title + "</h2>");
    $("#notes").append("<input id='titleinput' name='title' >");
    $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    $("#notes").append("<button daya-id='" + data._id + "' id='savenote'>Save Note</button>");

    // if there is already a note
    if (data.note) {
        $("#notes").val(data.note.title);
        $("#notes").val(data.note.body);
    }
  });
});

// save the note function
$.ajax({
    method: "POST",
    url: "api/articles/" + thisId,
    data: {
        title: $("#titleinput").val().trim(),
        body: $("#bodyinput").val().trim()
    }
})
.then(function(data){
    console.log(data);
    $("#notes").empty();
});

// also remove other values
$("#titleinput").val("");
$("#bodyinput").val("");