$(document).ready(function() {
  // Request http://0.0.0.0:5001/api/v1/status/
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    // Check if the status is "OK"
    if (data.status === 'OK') {
      // If in the status is “OK”, add the class available to the div#api_status
      $('#api_status').addClass('available');
    } else {
      // Otherwise, remove the class available to the div#api_status
      $('#api_status').removeClass('available');
    }
  });

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
});

