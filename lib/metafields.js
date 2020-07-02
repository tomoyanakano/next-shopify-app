import gql from 'graphql-tag';
import { client } from './apolloClient';
import {
  ADD_SCRIPT_TAG,
  DELETE_SCRIPT_TAG,
  ADD_METAFIELD,
  DELETE_METAFIELD
} from './mutations';

const reviewForm = function(productId) {
  return `
    <div style="width:100%;padding-top: .5em;margin-top: 1em;">
      <div id="createReview" class="createReview" data-open="close">
        <form class="" action="index.html" method="post" onsubmit="onSubmit(this);return false;">
          <input type="hidden" name="productId" value="${productId}" style="width:100%">
          <label for="">Name</label>
          <input type="text" name="name" value="" id="menkReview_name_${productId}" style="width:100%">
          <label for="">Email</label>
          <input type="text" name="email" value="" id="menkReview_email_${productId}" style="width:100%">
          <label for="">Title</label>
          <input type="text" name="title" value="" id="menkReview_title_${productId}" style="width:100%">
          <label for="">Content</label>
          <input type="text" name="content" value="" id=""menkReview_content_${productId} style="width:100%">
          <input type="submit" name="" value="Submit Review">
        </form>
      </div>
    </div>
  `;
}

const DeleteFormVariables = {
  input: {
    id: "gid://shopify/Metafield/12091112161353",
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
    src: "https://676688159b58.ngrok.io/js/review.js", // ngrokの書き換えが必要
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
  //     variables: AddFormVariables("4472908808265"),
  //   }).then((AddResult) => {
  //     console.log(AddResult);
  //   })
  // })
  client.mutate({
    mutation: ADD_SCRIPT_TAG,
    variables: AddScriptTagVariables,
    // mutation: DELETE_SCRIPT_TAG,
    // variables: {
    //     id: "gid://shopify/ScriptTag/113864638537",
    // }
  }).then((result) => {
    console.log(result);
  })
}


