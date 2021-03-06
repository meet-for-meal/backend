define([
  'jquery',
  'underscore',
  'backbone',
  'Util',
  'text!templates/users/list.html'
], function ($, _, Backbone, Util, Template) {

  return Backbone.View.extend({

    el: '#content',

    initialize: function() {
      var self = this;
      this.render();

      // Bind from elements recently rendered
      this.$list = this.$el.find('#users-list');
      this.template = _.template(this.$el.find('#list-template').html());

      var success = function (res) {
        self.renderList(res);
      };
      Util.apiRequest('/users', 'GET', null, null, success);
    },

    render: function() {
      this.$el.html(Template);
    },

    renderList: function (users) {
      this.$list.html(this.template({ users: users }));
    }

  });

});