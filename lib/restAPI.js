const url = 'https://' + '4632ee88995ed27c0872bb82e6d54764' + ':' + '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' + '@menkapp.myshopify.com/admin/api/2020-04'

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

