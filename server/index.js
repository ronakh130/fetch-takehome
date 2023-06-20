const express = require('express');
const path = require('path');
const { processController } = require('./controllers/processController');

const port = 3000;
const app = express();

//initalize temporary, in-memory database
app.locals.ids = {};
app.locals.allReceipts = new Map();

//parse incoming request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//store receipt json
app.post('/receipts/process', processController.calculatePoints, (req, res) => {
  res.status(200).json({id: res.locals.data});
})

//get points by id
app.get('/receipts/:id/points', (req, res) => {
  res.status(200).json({points: 10});
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
  console.log(err);
  return res.status(errorObj.status).json(errorObj.message);
});

//start listening
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

module.exports = app;
