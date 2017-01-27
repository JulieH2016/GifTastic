$(function() {
    // Loads the page
    populateButtons('cartoonButton', '#cartoonButtons');
});

// Array of cartoon names
var cartoons = ["bugs bunny", "muttley", "felix", "barbie", "cruella deville", "sponge bob", "mickey mouse", "donald duck", "snow white", "bambi"];

// Function to add buttons on the page
function populateButtons(arrayToUse, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();

// For loop to search the entire array
    for (var i = 0; i < arrayToUse.length; i++){
        var a = $('<button>')
        a.addClass(classToAdd);
        a.attr('data-type', arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
    }
}

// Click button function that queries the giphy api using cartoon name input 
$(document).on('click', '.cartoonButton', function(){
    $('#cartoons').empty();
    $('.cartoonButton').removeClass('active');
    $(this).addClass('active');

// Giphy api call to search for dancing cartoon with a limit of 10 set
    var type = $(this).data('type');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=dancing+cartoon&api_key=dc6zaTOxFJmzC&limit=10";
// Tested query url in browser to ensure data response from the giphy api

// Ajax call and for loop to instruct where to put the resulting response for rating and the data image
    $.ajax({url: queryURL, method: 'GET'})
        .done(function(response) {
            console.log(response);

         var results = response.data;

         for(var i=0; i < results.length; i++){
             var cartoonDiv = $('<div class="cartoon-item">')

             var rating = results[i].rating;

             var p = $('<p>').text( "Rating: pg" + rating);

             var animated = results[i].images.fixed_height.url;
             var still = results[i].images.fixed_height_still.url;

             var cartoonImage = $('<img>');
             cartoonImage.attr('src', still);
             cartoonImage.attr('data-still', still);
             cartoonImage.attr('data-animate', animated);
             cartoonImage.attr('data-state', 'still')
             cartoonImage.addClass('cartoonImage');

             cartoonDiv.append(p)
             cartoonDiv.append(cartoonImage)

             $('#cartoons').append(cartoonDiv);
         }    
    }); 
});

// Click button function to animate and stop animation when each cartoon gif is clicked
$(document).on('click', '.cartoonImage', function(){
    var state = $(this).attr('data-state');
    
    if (state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

// Click button function
$('#addCartoon').on('click', function(){
    var newCartoon = $('input').eq(0).val();

    if (newCartoon.length > 2){
        cartoons.push(newCartoon);
    }

    populateButtons('cartoonButton', '#cartoonButtons');

    return false;
});
