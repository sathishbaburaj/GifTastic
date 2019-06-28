// Initial array of animals
var animals = ["Cat", "Panda", "Elephant", "rat"];
var state;

// Function for displaying animal data
function renderButtons() {

  // Deleting the animal buttons prior to adding new animal buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generating buttons for each animal in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("gifs");
    // Adding a data-attribute with a value of the animal at index i
    a.attr("data-name", animals[i]);
    // Providing the button's text with a value of the animals at index i
    a.text(animals[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function (event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var animal = $("#animal-input").val().trim();
  // The movie from the textbox is then added to our array
  animals.push(animal);

  // calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();

$("#buttons-view").on("click", ".gifs", function () {
  // Grabbing and storing the data-name property value from the button
  var animalType = $(this).attr("data-name");

  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animalType + "&api_key=zazrc3RCe3mJXUFOmPJVuZ4D0xLsrvZK&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function (response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var animalDiv = $("<div class='gifs' data-state='still'>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var animalImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        animalImage.attr("src", results[i].images.fixed_height_still.url);
        animalImage.attr({ 'data-animate': results[i].images.fixed_height.url });
        animalImage.attr({ 'data-state': "still" });

        animalImage.attr({ 'data-still': results[i].images.fixed_height_still.url });



        //  state = $(this).attr("data-state");

        // Appending the paragraph and image tag to the animalDiv
        animalDiv.append(p);
        animalDiv.append(animalImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(animalDiv);

      }

    });
});


$("#gifs-appear-here").on("click",'.gifs img', function () {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  state = $(this).attr("data-state");

  //console.log(state);
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    console.log(state);
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    console.log(state);
    $(this).attr("data-state", "still");
  }
});
