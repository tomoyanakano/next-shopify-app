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

const DELETE_METAFIELD = gql`
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

const ADD_SCRIPT_TAG = gql`
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

const DELETE_SCRIPT_TAG = gql`
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

const form = `
<div style="width:100%;padding-top: .5em;margin-top: 1em;">
  <div id="createReview" class="createReview" data-open="close">
    <div>
      <input type="button" value="Submit Review" onclick="onSubmit()">
    </div>
  </div>
</div>
  `;

const DeleteFormVariables = {
  input: {
    id: "gid://shopify/Metafield/12072796323913",
  }
}

const AddFormVariables =  {
  input : {
    id: "gid://shopify/Product/4472908808265",
    metafields: [
      {
        namespace: "MenkReview",
        key: "form",
        value: form,
        valueType: "STRING"
      }
    ]
  }
}

const AddScriptTagVariables = {
  input: {
    src: "https://af61f4a1ebcf.ngrok.io/js/review.js", // ngrokの書き換えが必要
  }
}



export function addFormFields() {
  // client.mutate({
  //   mutation: DELETE_METAFIELD,
  //   variables: DeleteFormVariables,
  // }).then((DeleteResult) => {
  //   console.log(DeleteResult)
  //   client.mutate({
  //     mutation: ADD_METAFIELD,
  //     variables: AddFormVariables,
  //   }).then((AddResult) => {
  //     console.log(AddResult);
  //   })
  // })
  client.mutate({
    mutation: ADD_SCRIPT_TAG,
    variables: AddScriptTagVariables,
    // mutation: DELETE_SCRIPT_TAG,
    // variables: {
    //     id: "gid://shopify/ScriptTag/113778557001",
    // }
  }).then((result) => {
    console.log(result);
  })
}


