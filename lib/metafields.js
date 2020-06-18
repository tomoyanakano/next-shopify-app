import gql from 'graphql-tag';
import client from './apolloClient';

const ADD_METAFIELD = gql`
  mutation($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        metafields(first: 100) {
          edges {
            node {
              id
              namespace
              key
              value
            }
          }
        }
      }
    }
  }
`;

const AddFormVariables =  {
  "input" : {
    "id": "gid://shopify/Product/1",
    "metafields": [
      {
        "namespace": "instructions",
        "key": "wash",
        "valueInput": {
          "value": "cold wash",
          "valueType": "STRING"
        }
      }
    ]
  }
}

export function addFormFields() {

}
