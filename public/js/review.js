console.log("loaded");

function onSubmit() {
  console.log('Submitted')
  $.ajax({
    type: "GET",
    url: "https://2d0e57643adb.ngrok.io/api/hello",
  }).done(function(data) {
      console.log('Successful communication with API!');
      console.log('ReturnParameter:' + data['name']);
  }).fail(function(data) {
      console.log('Ajax fail (communication error)');
  });
}

