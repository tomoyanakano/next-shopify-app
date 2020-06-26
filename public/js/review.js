'use strict'
function onSubmit() {
  fetch('https://next-shopify.vercel.app/api/hello', {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Access-Control-Allow-Origin': 'https://menkapp.myshopify.com'
    }
  }).then(console.log('loaded'));
}