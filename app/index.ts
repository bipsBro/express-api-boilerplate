import express = require('express');

// Create a new express application instance
const app: express.Application = express();

app.get('/', function (_req, res) {
  res.send('Hello World! kx');
});

app.listen(3000, function () {
  console.log('Example app listening on port http://localhost:3000!');
});