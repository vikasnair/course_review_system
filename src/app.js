// vikas was here!

const DEFAULT_AIT_PORT = 3000;

// database setup
require('./db');
const mongoose = require('mongoose');
const Review = mongoose.model('Review');

// express
const express = require('express');
const app = express();

// static files
const path = require('path');
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// view engine
app.use(express.urlencoded({ extended : false }));
app.set('view engine', 'hbs');

// logger
const logger = require('morgan');
app.use(logger('dev'));

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

// query parser
const queryParser = (req, res, next) => {
  const query = {};

  if (req.query.semester) {
    query.semester = req.query.semester;
  }

  if (req.query.year) {
    query.year = req.query.year;
  }

  req.query = query;
  next();
};

app.use(queryParser);

// routes
app.get('/api/reviews', (req, res) => {
  Review.find(req.query, (error, reviews) => {
    if (error) {
      return res.send(error);
    }

    return res.json(reviews);
  });
});

app.post('/api/review/create', (req, res) => {
  new Review({
    name: req.body.name,
    semester: req.body.semester,
    year: req.body.year,
    review: req.body.review
  }).save((error, review) => {
    if (error) {
      return res.send(error);
    }

    return res.json(review);
  });
});

app.listen(process.env.PORT || DEFAULT_AIT_PORT, (err) => {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log('Server started (ctrl + c to shut down)');
  }
});
