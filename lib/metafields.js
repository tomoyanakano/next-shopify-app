import gql from 'graphql-tag';
import { client } from './apolloClient';

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
  input : {
    id: "gid://shopify/Product/4472906678345",
    metafields: [
      {
        namespace: "instructions",
        key: "wash",
        value: '{"title": "title", "description": "good item!", "review": 5, "name": "Taro" }',
        valueType: "STRING"
      },
      {
        namespace: "instructions",
        key: "Cold",
        value: '{"title": "title", "description": "good item!", "review": 5, "name": "Taro" }',
        valueType: "STRING"
      }
    ]
  }
}



export function addFormFields() {
  console.log(client)
  client.mutate({
    mutation: ADD_METAFIELD,
    variables: AddFormVariables,
  }).then((result) => {
    console.log(result.data)
  })
}
