import gql from 'graphql-tag';
import { client } from './apolloClient';
import {
  ADD_SCRIPT_TAG,
  DELETE_SCRIPT_TAG,
  ADD_METAFIELD,
  DELETE_METAFIELD
} from './mutations';

const DeleteFormVariables = {
  input: {
    id: "gid://shopify/Metafield/12111422029897",
  }
}

const AddFormVariables = function(productId) {
  return {
    input : {
      id: `gid://shopify/Product/${productId}`,
      metafields: [
        {
          namespace: "MenkReview",
          key: "form",
          value: reviewForm(productId),
          valueType: "STRING"
        }
      ]
    }
  }
} 

const AddScriptTagVariables = {
  input: {
    src: "https://d11584be344d.ngrok.io/js/review.js", // ngrokの書き換えが必要
  }
}



export function addFormFields() {
  // client.mutate({
  //   mutation: DELETE_METAFIELD,
  //   variables: DeleteFormVariables,
  // }).then((DeleteResult) => {
  //   console.log(DeleteResult)
  // })
  client.mutate({
    mutation: ADD_SCRIPT_TAG,
    variables: AddScriptTagVariables,
    // mutation: DELETE_SCRIPT_TAG,
    // variables: {
    //     id: "gid://shopify/ScriptTag/114113216585",
    // }
  }).then((result) => {
    console.log(result);
  })
}


