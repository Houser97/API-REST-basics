var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Datos a enviar
let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

let messages = {
  1:{
    id: '1',
    text: 'Hellor World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

// Rutas para REST API
app.get('/user', (req, res) => {
  return res.send(Object.values(users));
});

app.get('/user/:userId', (req, res) => {
  return res.send(users[req.params.userId]);
})

app.post('/user', (req, res) => {
  return res.send('POST HTPP method on user resource');
});

app.put('/user/:userId', (req, res) => {
  return res.send(`PUT HTTP method on ${req.params.userId} resource`);
});

app.delete('/user/:userId', (req, res) => {
  return res.render(`DELETE HTTP method on ${req.params.userId} resource`);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
