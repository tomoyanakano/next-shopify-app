'use strict'

// json型にparse
var parseJson = function(list) {
  var returnJson = {};
  list.map(function(data) {
    returnJson[data.name] = data.value
  });
  return returnJson;
}

function onSubmit(value) {
  var customerId = $('.reviewForm').attr('customerId');
  var inputList = $(value).serializeArray();
  var data = parseJson(inputList);
  data['customerId'] = customerId;
  $.ajax({
    url: 'https://next-shopify.vercel.app/api/hello',
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': 'https://menkapp.myshopify.com'
    },
    dataType: "json",
    data: data
  }).done((resp) => console.log(resp));
}
