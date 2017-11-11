$(document).ready(function() {

  var animals = [];

  function showAnimalGif() {
    var queryAnimal = $(this).data("animal");
    console.log(queryAnimal);
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        queryAnimal + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          console.log(queryURL);
          console.log(response);

          var results = response.data;
          for (var i = 0; i < results.length; i++) {

            var animalDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);            
            var defaultAnimatedSrc = results[i].images.fixed_height.url;
            var staticSrc = results[i].images.fixed_height_still.url;
            var animalImage = $("<img>");
       
            animalImage.attr("src", staticSrc);
            animalImage.addClass("gif");
            animalImage.attr("data-state", "still");
            animalImage.attr("data-still", staticSrc);
            animalImage.attr("data-animate", defaultAnimatedSrc);
            animalDiv.append(p);
            animalDiv.append(animalImage);
            $("#gifs-appear-here").prepend(animalDiv);
          }
        });
  }

  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var animalInput = $("#user-input").val().trim();
    animals.push(animalInput);
    $("#user-input").val('');
    renderButtons();
  });

  

  function renderButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < animals.length; i++) {
      var a = $('<button class="onPageBtn">');
      a.attr("id", "animal");
      a.attr("data-animal", animals[i]);
      a.text(animals[i]);
      $("#myButtons").append(a);
      }
  }
  
  renderButtons();


  $(document).on("click", "#animal", showAnimalGif);
  $(document).on("click", ".gif", startStopGif);
  
  function startStopGif() {
  // Changed the click function to a plain function code below is the same code from the class activity.
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    }
});