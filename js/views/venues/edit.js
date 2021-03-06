define([
  'jquery',
  'underscore',
  'backbone',
  'Util',
  'Foursquare',
  'text!templates/venues/edit.html'
], function ($, _, Backbone, Util, Foursquare, Template) {

  return Backbone.View.extend({

    el: '#content',

    events: {
      'click .update-venue': 'updateFoursquareVenue',
      'submit form': 'updateVenue'
    },

    initialize: function (params) {
      var self = this;
      this.venueId = params.venueId;
      this.render();

      // Bind from elements recently rendered
      this.$main = this.$el.find('#m-content');
      this.$venue = this.$el.find('#venue');
      this.editTemplate = _.template(this.$el.find('#edit-template').html());
      this.venueTemplate = _.template(this.$el.find('#venue-template').html());

      Util.apiRequest('/venues/' + this.venueId, 'GET', null, null, function (res) {
        self.renderVenue(res);
        self.renderFoursquareVenue(res.foursquare_id);
      });
    },

    render: function() {
      this.$el.html(Template);
    },

    renderVenue: function (venue) {
      var partnerships = ['medium', 'high'];
      this.$main.html(this.editTemplate({ m: venue, p: partnerships}));
    },

    renderFoursquareVenue: function (foursquareId) {
      var self = this;
      Foursquare.request('venues/' + foursquareId, { v: Foursquare.v }, function (res) {
        var foursquareVenue = res.response.venue;
        self.$venue.html(self.venueTemplate({ f: foursquareVenue }));
        var location = foursquareVenue.location;
        Util.renderGoogleMap(location.lat, location.lng, foursquareVenue.name);
      }, function(err) {
        console.error(err);
      });
    },

    updateFoursquareVenue: function (e) {
      e.preventDefault();
      var newId = this.$el.find('#idFoursquare').val();
      this.renderFoursquareVenue(newId);
    },

    updateVenue: function (e) {
      e.preventDefault();
      var params = {
        partnership: this.$el.find('#partnership').val(),
        foursquare_id: this.$el.find('#idFoursquare').val()
      };
      Util.apiRequest('/venues/edit/' + this.venueId, 'GET', null, params, function() {
        window.location = '/#/venues';
      });
    }

  });

});