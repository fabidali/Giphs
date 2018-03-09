$( document ).ready(function() {
// An array displaying different cultural elements;
var actions = ["Bob Marley", "Reggae", "Dancehall", "Usain Bolt", "Jamaican Patties", "Jerk Chicken", "Ocho Rios", "Negril", "Sumfest"];
// This function will display all gif buttons
for (var i = 0; i < actions.length; i++) {
    var button = $("<button>");
    button.attr("class", "btn")
    // button.data("action", actions[i]);
    button.html(actions[i])
    $("#gifButtons").append(button);
}

$("#submit").on("click", function () {
    var searchQuery = $("#searchAction").val().trim();
    var button = $("<button>");
    button.attr("class", "btn")
    button.data("action", searchQuery);
    button.append(searchQuery);
    $("#gifButtons").append(button);
});

$(document).on('click', ".btn", function () {
    var search = $(this).html()
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=YLu4lg2QJjN95QHpYv9Y7bJxiMEW8xyw";
    console.log(queryURL); 
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
    console.log(response);
    for (var i=0; i<response.data.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");
            var gifRating = $("<p>").text("Rating: " + response.data[i].rating);
            gifDiv.append(gifRating);
            var gifImage = $("<img>");
            gifImage.attr("src", response.data[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",response.data[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",response.data[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            $("#gifsView").prepend(gifDiv);
        }
    });
})
// Calls Functions
// displayGifButtons(); 
// addNewButton();
// removeLastButton();
// Event Listeners
// $(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});

});