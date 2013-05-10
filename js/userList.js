require(['jquery'], function ($) {
  // Change when real one is available
  var backUrl = 'http://localhost:3000';
  var req = $.ajax({
    url: backUrl + '/users',
    type: 'GET',
    dataType: 'jsonp'
  });
  req.done(function (res) {
    console.log(res);
  });
  req.fail(function (err) {
    //console.error(err);
  });
});