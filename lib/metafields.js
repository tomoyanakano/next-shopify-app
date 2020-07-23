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
    id: "gid://shopify/Metafield/12117035417673",
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
    src: "https://2d62d17183ef.ngrok.io/js/review.js", // ngrokの書き換えが必要
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
    //     id: "gid://shopify/ScriptTag/114439389257",
    // }
  }).then((result) => {
    console.log(result);
  })
}


