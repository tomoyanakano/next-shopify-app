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
          <input type="hidden" name="productId" value="${productId}">
          <label for="">Name</label>
          <input type="text" name="name" value="" id="menkReview_name_${productId}">
          <label for="">Email</label>
          <input type="text" name="email" value="" id="menkReview_email_${productId}">
          <label for="">Title</label>
          <input type="text" name="title" value="" id="menkReview_title_${productId}">
          <label for="">Content</label>
          <input type="text" name="content" value="" id=""menkReview_content_${productId}>
          <input type="submit" name="" value="Submit Review">
        </form>
      </div>
    </div>
  `;
}

const DeleteFormVariables = {
  input: {
    id: "gid://shopify/Metafield/12091002290249",
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
    src: "https://a9fbd3fc22d4.ngrok.io/js/review.js", // ngrokの書き換えが必要
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
    //     id: "gid://shopify/ScriptTag/113799331913",
    // }
  }).then((result) => {
    console.log(result);
  })
}


