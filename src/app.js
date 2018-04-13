const DEFAULT_AIT_PORT = 3000;

// database setup
require('./db');
const mongoose = require('mongoose');

// express
const express = require('express');
const app = express();

// static files
const path = require("path");
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// body parser
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'hbs');

const Review = mongoose.model('Review');

app.get('/api/reviews', function(req, res) {
  // TODO: retrieve all reviews or use filters coming in from req.query
  // send back as JSON list
});

app.post('/api/review/create', (req, res) => {
  // TODO: create new review... if save succeeds, send back JSON
  // representation of saved object
});

app.listen(process.env.PORT || DEFAULT_AIT_PORT, (err) => {
  console.log('Server started (ctrl + c to shut down)');
});
