require(['jquery', 'bootstrap', 'backbone'], function ($, Bootstrap, Backbone) {

  var Router = Backbone.Router.extend({

    routes: {
      '':      'index',   // #
      'users': 'userList' // #users
    },

    index: function() {
      require(['js/views/indexView'], function (IndexView) {
        new IndexView();
      });
    },

    userList: function() {
      require(['js/views/users/list'], function (userListView) {
        new userListView();
      });
    }

  });

  var router = new Router();
  Backbone.history.start();

});