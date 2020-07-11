import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import createReview from '../../lib/restAPI'

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
  return createReview(req.body.customerId, req.body.productId, req.body)
}