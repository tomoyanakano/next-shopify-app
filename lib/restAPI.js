const dotenv = require('dotenv').config();
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, SHOPIFY_PRIVATE_APP_API, SHOPIFY_PRIVATE_APP_PASS } = process.env;
const url = 'https://' + SHOPIFY_PRIVATE_APP_API + ':' + SHOPIFY_PRIVATE_APP_PASS + '@menkapp.myshopify.com/admin/api/2020-04'

export default function createReview(customerId, productId, body, ) {
  const data = {
    "metafield": {
      "namespace": "MenkReview",
      "key": customerId,
      "value": JSON.stringify(body),
      "value_type": "json_string"
    }
  }

  const optionsMetafields = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };

  fetch(url + '/products/'+ productId +'/metafields.json', optionsMetafields)
    .then(res => res.json())
    .then(response => {
      return res.json({
        result: response,
      })
    });
}

export function updateReview(customerId, productId, body) {
  const data = {
    "metafield": {
      "namespace": "MenkReview",
      "key": customerId,
      "value": JSON.stringify(body),
      "value_type": "json_string"
    }
  }

  const optionsMetafields = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };

  fetch(url + '/products/'+ productId +'/metafields.json', optionsMetafields)
    .then(res => res.json())
    .then(response => {
      return res.json({
        result: response,
      })
    });
}

