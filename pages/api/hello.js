import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import { client } from '../../lib/apolloClient';
import {
  ADD_METAFIELD
} from '../../lib/mutations';
const dotenv = require('dotenv');
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

// Initialize the cors middleware
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

  const AddFormVariables = function(productId) {
    return {
      input : {
        id: `gid://shopify/Product/${productId}`,
        metafields: [
          {
            namespace: "MenkReview",
            key: "review",
            value: JSON.stringify(req.body),
            valueType: "STRING"
          }
        ]
      }
    }
  }

  const params = {
    query: ADD_METAFIELD,
    variables: AddFormVariables(req.body['productId'])
  }

  const optionsMetafields = {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  };

  const url = 'https://' + SHOPIFY_API_KEY + ':' + SHOPIFY_API_SECRET_KEY + '@menkapp.myshopify.com/admin/api/2019-07/graphql.json'
  
  client.mutate({
    mutation: ADD_METAFIELD,
    variables: AddFormVariables(req.body['productId']),
  }).then((result) => {
    return res.json({ 
      result: result,
    })
  })
}