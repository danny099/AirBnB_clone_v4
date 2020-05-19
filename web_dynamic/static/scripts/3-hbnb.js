$(document).ready(() => {
  const checkBoxDict = {};
  $('input[type=checkbox]').on('click', function () {
    if ($(this).prop('checked') === true) {
      checkBoxDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if ($(this).prop('checked') === false) {
      delete checkBoxDict[$(this).attr('data-id')];
    }
    if (Object.keys(checkBoxDict).length >= 1) {
      $('.amenities H4').html(Object.values(checkBoxDict).join(', ') + '&nbsp;');
    } else {
      $('.amenities H4').html('&nbsp;');
    }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (response, textStatus) {
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  }).fail(function () {
    window.alert('Server response not received.');
    $('DIV#api_status').removeClass('available');
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: (data) => { printhelper(data, 0); }
  });
  $('.amenities ul li input[type="checkbox"]').css({ margin: '0px 10px 0px 0px', padding: '10px 0 0 0' });
  $('.amenities h4').css({ height: '17px', 'max-width': '250px', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden' });
  function printhelper(data, index) {
    if (index >= data.length) {
      return;
    }
    let name = '';
    let lastName = '';
    const place = data[index];
    $.get(`http://0.0.0.0:5001/api/v1/users/${place.user_id}`, function (response, textStatus) {
      name = response.first_name;
      lastName = response.last_name;
      const articleComplete = `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guests</div>
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
          </div>
          <div class="user">
            <b>Owner:</b> ${name} ${lastName}
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`;
      printhelper(data, index + 1);
      $('section.places').append(articleComplete);
    });
  }
});