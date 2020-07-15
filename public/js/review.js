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

var setSummaryData = function(countData, averageData, data) {
  var count = parseInt(countData) + 1
  var value = parseInt(data['evaluation'])
  var average = parseInt(averageData) + (value - parseInt(averageData)) / count
  return {
    'count': count,
    'average': average
  }
}

function onSubmit(value) {
  var customerId = $('#menk-review-form').attr('customerId');;
  var inputList = $(value).serializeArray();
  var data = parseJson(inputList);
  var summaryData = {};
  if (!data['count'] && !data['average']) {
    summaryData['count'] = 1
    summaryData['average'] = parseInt(data['evaluation'])
  } else {
    summaryData = setSummaryData(data['count'], data['average'], data)
  }
  delete data['count']
  delete data['average']
  data['customerId'] = customerId;
  data['visibility'] = "true";
  $('#menk-form-submit-button').attr("disabled", "disabled")
  addReview(data, summaryData)
}

function addReview(data, summaryData) {
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
      updateReviewSummary(summaryData)
    });
  } else {
    $('#menk-form-submit-button').prop('disabled', false)
  }
  return; 
}

function updateReviewSummary(data) {
  $.ajax({
    url: 'https://next-shopify.vercel.app/api/review-summary',
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': 'https://menkapp.myshopify.com',
      'scopes': ['read_products', 'write_products', 'write_script_tags', 'read_script_tags'],
    },
    dataType: "json",
    data: data
  }).done((resp) => {
    console.log(resp)
    $('#menk-review-form').replaceWith(
      `<div class="submit-result" style="margin: 0 auto; text-align: center;">
        <h2>レビューありがとうございました！</h2>
      </div>`
    )
  });
}