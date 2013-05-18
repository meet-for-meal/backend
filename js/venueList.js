require([
  'jquery',
  'underscore',
  '../js/Foursquare'
], function ($, _, Foursquare) {
  // Change when real one is available
  var backUrl = 'http://localhost:3000',
      foursquareApiUrl = 'https://api.foursquare.com/v2/',
      foursquareOauthToken = 'CKTMK32OZVMXUXXHSHBUJXGLIV2AYFUN00SG5ICMET3B5TQN';

  var venueListTemplate = _.template($('#list-template').html()),
      $main             = $('#venues-list');

  var foursquareRequest = function (url, params, success, error) {
    if(!params) params = {};
    if(!success) success = function(){};
    if(!error) error = function(){};
    params.oauth_token = foursquareOauthToken;
    var req = $.ajax({
      url: foursquareApiUrl + url,
      dataType: 'jsonp',
      type: 'get',
      data: params
    });
    req.done(success);
    req.fail(error);
  };

  var loadVenues = function (venues) {
    var len = venues.length;
    for(var i = 0; i < len; i++) {
      var venue = venues[i];
      (function(v) {
        Foursquare.request('venues/' + venue.foursquare_id, { v: Foursquare.v }, function (res) {
          var foursquareVenue = res.response.venue;
          var tr = $('tr.venue-' + v.id);
          var url = '<a href="' + foursquareVenue.canonicalUrl + '">' + foursquareVenue.name + '</a>';
          tr.find('.name').html(url);
        }, function(err) {
          console.error(err);
        });
      })(venue);
    }
  };

  var req = $.ajax({
    url: backUrl + '/venues',
    type: 'GET',
    dataType: 'jsonp'
  });
  req.done(function (res) {
    $main.html(venueListTemplate({venues: res}));
    loadVenues(res);
  });
  req.fail(function (err) {
    console.error(err);
  });
});