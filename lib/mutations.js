import gql from 'graphql-tag';

export const ADD_METAFIELD = gql `
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

export const DELETE_METAFIELD = gql `
  mutation metafieldDelete($input: MetafieldDeleteInput!) {
    metafieldDelete(input: $input) {
      deletedId
      userErrors {
        field
        message
      }
    }
  }
`;

export const ADD_SCRIPT_TAG = gql `
  mutation scriptTagCreate($input: ScriptTagInput!) {
    scriptTagCreate(input: $input) {
      scriptTag {
        id
        src
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const DELETE_SCRIPT_TAG = gql `
  mutation scriptTagDelete($id: ID!) {
    scriptTagDelete(id: $id) {
      deletedScriptTagId
      userErrors {
        field
        message
      } 
    }
  }
`;