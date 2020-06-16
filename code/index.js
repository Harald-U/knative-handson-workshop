// This is the Node.js HelloWorld example from the Knative website
// Original location: 
// https://github.com/knative/docs/tree/master/docs/serving/samples/hello-world/helloworld-nodejs

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('Hello world received a request.');

  const name = process.env.TARGET || 'World';
  res.send(`Hello ${name}!`);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Hello world listening on port', port);
});

