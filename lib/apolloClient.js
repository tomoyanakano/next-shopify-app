import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: "https://menkapp.myshopify.com/admin/api/2020-04/graphql.json"
})

export const client = new ApolloClient({
  cache: cache,
  link: link,
  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
})