const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

//DB init
// mongoose.connect('mongodb://localhost:27017/tf', { useNewUrlParser: true });
// const db = mongoose.connection;

//DB callbacks
// db.once('open', function () {
//   console.log('Connected to MongoDB...');
// });

// db.on('error', function (err) {
//   console.log(err);
// });

//Express init
const app = express();

//Express view init to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Express public folder init
app.use(express.static(path.join(__dirname, 'public')));

//Parsing sets
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Middleware
app.get('/', function (req, res, next) {
  console.log(req.headers['user-agent']);
  next();
});

//Express root routing
app.use('/', indexRouter);

//Server listen init
app.listen(3000, function () {
  console.log('Server listening on port 3000...');
});
