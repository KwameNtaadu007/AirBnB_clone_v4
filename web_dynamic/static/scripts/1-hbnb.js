$(document).ready(function() {
  // Your DOM-related JavaScript goes here

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

