<!DOCTYPE html>
<html>
  <head>
    <title>MDB Vue Test App</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mdbvue/lib/css/mdb.min.css">
  </head>
  <body>

    <div id="app">
      <mdb-btn color="primary">Button</mdb-btn>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/mdbvue/lib/index.js"></script>
    <script>
      new Vue({
        el: '#app',
        components: {
          mdbBtn: mdbvue.mdbBtn
        }
      })
    </script>
  </body>
</html>