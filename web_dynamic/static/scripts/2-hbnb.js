$(document).ready(function () {
  const checks = {};
  $('input[type="checkbox"]').click(function () {
    $(this).each(function () {
      if (this.checked) {
        checks[$(this).data('id')] = $(this).data('name');
      } else {
        delete checks[$(this).data('id')];
      }
    });
    if (Object.values(checks).length > 0) {
      $('.amenities h4').text(shorten(Object.values(checks).join(', '), 30));
    }
  });
});

function shorten (text, maxLength) {
  var ret = text;
  if (ret.length > maxLength) {
    ret = ret.substr(0, maxLength - 3) + '...';
  }
  return ret;
}

const url = 'http://127.0.0.1:5001/api/v1/status/';
$.get(url, function (data, status) {
  if (data.status === 'OK') {
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
});
