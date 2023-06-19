const express = require('express');
const path = require('path');

const port = 3000;
const app = express();

//parse incoming request
app.use(express.json());

//store receipt json
app.post('/receipts/process', (req, res) => {
  res.sendStatus(200);
})

//get points by id
app.get('/receipts/:id/points', (req, res) => {
  res.sendStatus(200);
});

//catch all route for unknown endpoints
app.use((req, res) => res.status(404).send('Sorry, Page not found'));

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Unknown server error',
    status: 500,
    message: { err: 'An unkown server error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//start listening
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

module.exports = app;
