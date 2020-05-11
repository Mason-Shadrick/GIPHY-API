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
    //adding tvShow class to ref later
    button.addClass("tvShow");
    //setting name of button to whats in the array
    button.text(tvShows[i]);
    //adding to page
    $("#button-display").append(button);
  }
}
buttonRender();
