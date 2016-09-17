var model = {
  watchlistItems: [],
  browseItems: []
}

var api = {
  root: "https://api.themoviedb.org/3",
  token: "d40110d0f9e5d62b8e314e7733570b3a" // TODO 0 put your api key here
}

/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);
			
			// TODO 2
			// update the model, setting its .browseItems property equal to the movies we received in the response
			// var json_obj = $.parseJSON(response);

			model.browseItems = response.results;
			console.log(model.browseItems);
			// invoke the callback function that was passed in. 
			callback();
		}
	});
}

/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7
  // clear everything from both lists
  $('#section-watchlist ul').empty("p");
  $('#section-browse ul').empty("p");

  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  model.watchlistItems.forEach(function(movie) {
  	var watchTitle = $("<p></p>").text(movie.original_title);
  	var watchMovieTitle = $("<li></li>").append(watchTitle);
  	$('#section-watchlist ul').append(watchMovieTitle);
  });
  
  // for each movie on the current browse list, 
  model.browseItems.forEach(function(movie) {
		// TODO 3
		// insert a list item into the <ul> in the browse section
		var title = $("<p></p>").text(movie.original_title);
		var movieTitle = $("<li></li>").append(title);
		$('#section-browse ul').append(movieTitle);
		// TODO 4
		// the list item should include a button that says "Add to Watchlist"
		var myButton = $("<button></button>").text("Add to watchlist");
		movieTitle.append(myButton);
		
		// TODO 5
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again

		myButton.click(function() {
	  	model.watchlistItems.push(movie);
			render();
		});
  
	});
}

// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});