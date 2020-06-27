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
  var inputList = $(value).serializeArray();
  var data = parseJson(inputList);
  console.log(data);
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
