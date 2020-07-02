import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
const dotenv = require('dotenv');
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, SHOPIFY_PRIVATE_APP_API, SHOPIFY_PRIVATE_APP_PASS } = process.env;

// Initialize the cors middleware
const url = 'https://'+ SHOPIFY_PRIVATE_APP_API + ':' + SHOPIFY_PRIVATE_APP_PASS + '@menkapp.myshopify.com
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export default async function handler(req, res) {
  // Run cors
  await cors(req, res)

  const data = {
    "metafield": {
      "namespace": "MenkReview",
      "key": req.body.customerId,
      "value": JSON.stringify(req.body),
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

  fetch(url + '/admin/api/2020-04/products/'+ req.body.productId +'/metafields.json', optionsMetafields)
    .then(res => res.json())
    .then(response => {
      return res.json({
        result: response,
      })
    });
}