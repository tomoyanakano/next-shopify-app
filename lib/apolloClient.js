import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
const ApolloClient = require('apollo-boost').default;


const cache = new InMemoryCache()
const link = new HttpLink({
  uri: "https://menkapp.myshopify.com/api/graphql",
  headers: `X-Shopify-Access-Token: f9801b3ca3e6321020f7bc00cbbdfcaa`
})

export const client = new ApolloClient({
  cache: cache,
  link: link,
  name: 'react-web-client',
  version: '1.3', 
  queryDeduplication: false,
  fetchOptions: {
    credentials: 'include'
  },
})