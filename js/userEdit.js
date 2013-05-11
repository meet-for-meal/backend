require(['jquery', 'underscore'], function ($, _) {
  // Change when real one is available
  var backUrl = 'http://localhost:3000',
      userTemplate = _.template($('#edit-template').html()),
      $main = $('#user'),
      $alertSuccess = $('#alert-success'),
      $alertError = $('#alert-error');

  var bindForm = function() {
    $form = $('#user-form');
    $form.on('submit', function (e) {
      e.preventDefault();
      var $this = $(this);
      var action = $this.attr('action'),
          method = $this.attr('method');
      var update = $.ajax({
        url: action,
        type: method,
        dataType: 'jsonp',
        data: {
          username: $('#username').val(),
          firstname: $('#firstname').val(),
          lastname: $('#lastname').val()
        }
      });
      update.done(function() {
        $alertSuccess.show();
      });
      update.fail(function() {
        $alertError.show();
      });
    });
  };

  var QueryString = function () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
        // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = pair[1];
        // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [ query_string[pair[0]], pair[1] ];
        query_string[pair[0]] = arr;
        // If third or later entry with this name
      } else {
        query_string[pair[0]].push(pair[1]);
      }
    }
    return query_string;
  }();

  var userId = QueryString.user;

  var req = $.ajax({
    url: backUrl + '/users/' + userId,
    type: 'GET',
    dataType: 'jsonp'
  });
  req.done(function (res) {
    var apiUrl = backUrl + '/users/edit/' + res.id;
    $main.html(userTemplate({user: res, apiUrl: apiUrl}));
    bindForm();
  });
  req.fail(function (err) {
    console.error(err);
  });
});