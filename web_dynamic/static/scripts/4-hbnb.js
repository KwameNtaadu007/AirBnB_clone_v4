$(document).ready(function() {

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function() {
    // Initialize an empty array to store Amenity IDs
    var amenityIds = [];

    // Loop through all checked checkboxes
    $('input[type="checkbox"]:checked').each(function() {
      // Store Amenity ID in the array
      amenityIds.push($(this).data('id'));
    });

    // Update the h4 tag inside the div Amenities with the list of Amenities checked
    $('.amenities h4').text(amenityIds.join(', '));
  });

  function updatePlaces() {
    // Initialize an empty array to store checked amenity IDs
    var checkedAmenities = [];

    // Loop through all checked checkboxes
    $('input[type="checkbox"]:checked').each(function() {
      // Store Amenity ID in the array
      checkedAmenities.push($(this).data('id'));
    });

    // Make a POST request to http://0.0.0.0:5001/api/v1/places_search/ with checked amenity IDs
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: checkedAmenities }),
      success: function(data) {
        // Clear existing places
        $('.places').empty();

        // Loop into the result of the request and create an article tag representing a Place
        for (var i = 0; i < data.length; i++) {
          var place = data[i];
          var article = '<article>' +
            '<div class="title_box">' +
              '<h2>' + place.name + '</h2>' +
              '<div class="price_by_night">$' + place.price_by_night + '</div>' +
            '</div>' +
            '<div class="information">' +
              '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
              '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
              '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
            '</div>' +
            '<div class="description">' + place.description + '</div>' +
          '</article>';
          $('.places').append(article);
        }
      },
      error: function(error) {
        console.log('Error fetching places:', error);
      }
    });
  }

  // Attach the updatePlaces function to the click event of the button
  $('button').click(function() {
    updatePlaces();
  });
});

