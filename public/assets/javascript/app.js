$.getJSON("/articles", function(data) {
  for (i = 0; i < data.length; i++) {
    $("#articles").prepend(
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

// make note pop up on add note button click
$(document).on("click", "#addNote", function() {
  $("#notes").empty();

  let thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function(data) {
    // console.log(data);
    $("#notes").append("<h5>" + data.title + "</h2>");
    $("#notes").append("<input id='titleinput' name='title' >");
    $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    $("#notes").append(
      "<button data-id='" + data._id + "' id='savenote'>Save Note</button>"
    );

    // if there is already a note
    if (data.note) {
      $("#titleinput").val(data.note.title);
      $("#bodyinput").val(data.note.body);
    }
  });
});

// save the note function
$(document).on("click", "#savenote", function() {
  let thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput")
        .val()
        .trim(),
      body: $("#bodyinput")
        .val()
        .trim()
    }
  }).then(function(data) {
    console.log(data);
    $("#notes").empty();
  });
});

// also remove other values
$("#titleinput").val("");
$("#bodyinput").val("");
