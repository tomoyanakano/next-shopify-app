'use strict'

// json型にparse
var parseJson = function(list) {
  var returnJson = {};
  list.map(function(data) {
    returnJson[data.name] = data.value
  });
  return returnJson;
}

// バリデーションの設定
var checkValidation = function(data) {
  console.log(data)
  let validation = true
  Object.keys(data).forEach(key => {
    if (!data[key]) {
      $(`label[for=${key}]`).append(
        '<p class="error-msg">正しく入力してください。</p>'
      )
      validation = false
    }
  })
  return validation
}

function onSubmit(value) {
  var customerId = $('#menk-review-form').attr('customerId');;
  var inputList = $(value).serializeArray();
  var data = parseJson(inputList);
  data['customerId'] = customerId;
  data['visibility'] = "true";
  $('#menk-form-submit-button').attr("disabled", "disabled")
  var validation = checkValidation(data)
  if (validation) {
    $.ajax({
      url: 'https://next-shopify.vercel.app/api/hello',
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': 'https://menkapp.myshopify.com',
        'scopes': ['read_products', 'write_products', 'write_script_tags', 'read_script_tags'],
      },
      dataType: "json",
      data: data
    }).done((resp) => {
      $('#menk-review-form').replaceWith(
        `<div class="submit-result" style="margin: 0 auto; text-align: center;">
          <h2>レビューありがとうございました！</h2>
        </div>`
      )
    });
  } else {
    $('#menk-form-submit-button').prop('disabled', false)
  }
}
