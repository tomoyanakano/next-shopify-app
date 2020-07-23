import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import {syntaxError} from 'graphql';
const dotenv = require('dotenv');
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, SHOPIFY_PRIVATE_APP_API, SHOPIFY_PRIVATE_APP_PASS } = process.env;

// Initialize the cors middleware
const url = 'https://'+ SHOPIFY_PRIVATE_APP_API + ':' + SHOPIFY_PRIVATE_APP_PASS + '@menkapp.myshopify.com/admin/api/2020-04'
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
  var summary = {}
  var result = {}
  summary['count'] = req.body.count
  summary['average'] = req.body.average
  delete req.body.count
  delete req.body.average

  const data = {
    "product": {
      "metafields": [
        {
          "namespace": "MenkReview",
          "key": req.body.customerId,
          "value": JSON.stringify(req.body),
          "value_type": "json_string"
        },
        {
          "namespace": "MenkReview",
          "key": "summary",
          "value": JSON.stringify(summary),
          "value_type": "json_string"
        }
      ] 
    }
  }

  const summaryData = {
    "metafield": {
      "namespace": "reviewSummary",
      "key": "summary",
      "value": JSON.stringify(summary),
      "value_type": "json_string"
    }
  }
  

  const optionsMetafields = function(data) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }
  }; 


  fetch(url + '/products/'+ req.body.productId +'.json', optionsMetafields(data))
    .then(res => res.json())
    .then(response => {
      result['response1'] = response
      return res.json({
        result: result,
      })
    });

  // fetch(url + '/products/'+ req.body.productId +'/metafields.json', optionsMetafields(summaryData))
  // .then(res => res.json())
  // .then(response => {
  //   result['response2'] = response
  //   return res.json({
  //     result: result,
  //   })
  // });
}