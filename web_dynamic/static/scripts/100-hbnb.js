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
    // Initialize empty arrays to store checked amenity, city, and state IDs
    var checkedAmenities = [];
    var checkedCities = [];
    var checkedStates = [];

    // Loop through all checked checkboxes for amenities
    $('input[type="checkbox"][data-type="amenity"]:checked').each(function() {
      checkedAmenities.push($(this).data('id'));
    });

    // Loop through all checked checkboxes for cities
    $('input[type="checkbox"][data-type="city"]:checked').each(function() {
      checkedCities.push($(this).data('id'));
    });

    // Loop through all checked checkboxes for states
    $('input[type="checkbox"][data-type="state"]:checked').each(function() {
      checkedStates.push($(this).data('id'));
    });

    // Make a POST request to http://0.0.0.0:5001/api/v1/places_search/ with checked amenities, cities, and states
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: checkedAmenities,
        cities: checkedCities,
        states: checkedStates
      }),
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

  // Listen to changes on each input checkbox tag for amenities, cities, and states
  $('input[type="checkbox"]').change(function() {
    // If the checkbox is checked, store the State or City ID in a variable
    if ($(this).is(':checked')) {
      // Determine the type of checkbox (amenity, city, or state)
      var type = $(this).data('type');
      var id = $(this).data('id');

      // Store the ID based on the type
      if (type === 'amenity') {
        checkedAmenities.push(id);
      } else if (type === 'city') {
        checkedCities.push(id);
      } else if (type === 'state') {
        checkedStates.push(id);
      }
    } else {
      // If the checkbox is unchecked, remove the State or City ID from the variable
      var type = $(this).data('type');
      var id = $(this).data('id');

      // Remove the ID based on the type
      if (type === 'amenity') {
        checkedAmenities = checkedAmenities.filter(function(item) {
          return item !== id;
        });
      } else if (type === 'city') {
        checkedCities = checkedCities.filter(function(item) {
          return item !== id;
        });
      } else if (type === 'state') {
        checkedStates = checkedStates.filter(function(item) {
          return item !== id;
        });
      }
    }

    // Update the h4 tag inside the div Locations with the list of States or Cities checked
    var locationsText = checkedStates.concat(checkedCities).join(', ');
    $('.locations h4').text(locationsText);
  });
});
