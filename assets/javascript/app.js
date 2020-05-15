var tvShows = [
  "Community",
  "Winnie the Pooh",
  "Rick and Morty",
  "Game of Thrones",
  "Adventure Time",
  "Pokemon",
  "Bojack Horseman",
];

function buttonRender() {
  //clearing the div before adding to it
  $("#button-display").empty();

  //creating button for each show in array
  for (var i = 0; i < tvShows.length; i++) {
    //making button
    var button = $("<button>");
    //adding data of tvshow name to the button
    button.attr("data-name", tvShows[i])
    //adding tvShow class to ref later
    button.addClass("tvShow");
    //setting name of button to whats in the array
    button.text(tvShows[i]);
    //adding to page
    $("#button-display").append(button);
  }
}
//on click for the add movie button
$("#add-tv").on("click", function(event){
    event.preventDefault();
    //storing text submitted to be used later
    var show = $("#tv-input").val().trim();
    //pushing new movie to array and running render function again showing buttons on page
    tvShows.push(show);
    buttonRender();

});
buttonRender();

//on click with ajax call for each button
$(document.body).on("click", ".tvShow", function(){
  $("#pics-display").empty();
  // getting name from button thats clicked to use in the queryURL
  var tvShow = $(this).data("name");
  //queryURL to use in ajax call
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=wHW18mebdlqyjKaNmDXg2L6Oq2KJaUf3&q=" + tvShow + "&limit=10&lang=en";
  //ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  // then display info on page
  }).then(function(response){
    console.log(response);
    //making it easier on myself with less typing
    var results = response.data;
    //for loop to display each of the responses
    for(var i = 0; i < results.length; i++){
      //picture div to append everything to, to put on page
      var pictureDiv = $("<div>");
      // p tag for rating to be displayed
      var p = $("<p>");
      p.text("Rating: " + results[i].rating);
      //image tag to put the moving and still pics in
      var tvImage = $("<img>");
      //making the first thing that shows up the still image 
      tvImage.attr("src", results[i].images.fixed_height_still.url);
      //giving data attributes amd a class to the image to call on later to pause and play the gifs
      tvImage.attr("data-animate", results[i].images.fixed_height.url);
      tvImage.attr("data-still", results[i].images.fixed_height_still.url);
      tvImage.addClass("gif");
      tvImage.attr("data-state", "still");
      //appending everything to the page
      p.append(tvImage);
      pictureDiv.append(p);
      $("#pics-display").append(pictureDiv);


    }

  }); 
  //pause and play on click function
  $(document.body).on("click", ".gif", function() {
    //geting state data into a var to use
    var state = $(this).attr("data-state");
    //if its still change to animate and vice versa
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  

})