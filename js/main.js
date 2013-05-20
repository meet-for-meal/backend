require(['jquery', 'bootstrap', 'backbone'], function ($, Bootstrap, Backbone) {

  var Router = Backbone.Router.extend({

    routes: {
      '':                'index',     // #
      'users':           'userList',  // #users
      'users/:id/edit':  'userEdit',  // #users/:id/edit
      'venues':          'venueList', // #venues
      'venues/:id':      'venueShow', // #venues/:id
      'venues/:id/edit': 'venueEdit', // #venues/:id/edit
    },

    index: function() {
      require(['js/views/indexView'], function (IndexView) {
        new IndexView();
      });
    },


    /* Users */

    userList: function() {
      require(['js/views/users/list'], function (userListView) {
        new userListView();
      });
    },

    userEdit: function(id) {
      require(['js/views/users/edit'], function (userEditView) {
        new userEditView({ userId: id });
      });
    },


    /* Venues */

    venueList: function() {
      require(['js/views/venues/list'], function (venueListView) {
        new venueListView();
      });
    },

    venueShow: function (id) {
      require(['js/views/venues/show'], function (venueShowView) {
        new venueShowView({ venueId: id });
      });
    },

    venueEdit: function (id) {
      require(['js/views/venues/edit'], function (venueEditView) {
        new venueEditView({ venueId: id });
      });
    }

  });

  new Router();
  Backbone.history.start();

});