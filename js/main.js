require(['jquery', 'bootstrap', 'backbone'], function ($, Bootstrap, Backbone) {

  var Router = Backbone.Router.extend({

    routes: {
      '':               'index',    // /#
      'users':          'userList', // /#users
      'users/:id/edit': 'userEdit'  // /#users/:id/edit
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
    },

    userEdit: function(id) {
      require(['js/views/users/edit'], function (userEditView) {
        new userEditView({ userId: id });
      });
    }

  });

  var router = new Router();
  Backbone.history.start();

});