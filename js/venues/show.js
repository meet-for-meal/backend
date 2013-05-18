require([
  'jquery',
  'underscore',
  'Util',
  'Foursquare'
], function ($, _, Util, Foursquare) {
  // Change when real one is available
  var backUrl = 'http://localhost:3000';

  var venueTemplate = _.template($('#show-template').html()),
      $main         = $('#venue');

  var venueId = Util.queryString.venue;

  var req = $.ajax({
    url: backUrl + '/venues/' + venueId,
    type: 'GET',
    dataType: 'jsonp'
  });
  req.done(function (venue) {
    Foursquare.request('venues/' + venue.foursquare_id, { v: Foursquare.v }, function (res) {
      var foursquareVenue = res.response.venue;
      $main.html(venueTemplate({ f: foursquareVenue, m: venue}));
    }, function(err) {
      console.error(err);
    });
  });
  req.fail(function (err) {
    console.error(err);
  });
});