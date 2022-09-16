var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let uuid = require('uuid');
let models = require('./models/index');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Creación de Middleware
app.use((req, res, next) => {
  req.me = users[1];
  next();
})

// Rutas para REST API
app.get('/users', (req, res) => {
  return res.send(Object.values(users));
});

app.get('/users/:userId', (req, res) => {
  return res.send(users[req.params.userId]);
})

app.get('/messages', (req, res) => {
  return res.send(Object.values(messages));
})

app.get('/messages/:messageId', (req, res) => {
  return res.send(messages[req.params.messageId]);
})

// Creación de mensajes
app.post('/messages', (req, res) => {
  const id = uuid.v4();
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id
  }

  messages[id] = message;

  return res.send(message)
})

// Eliminación de mensajes
app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = messages;

  messages = otherMessages;

  return res.send(message);
})

// Actualización de mensajes
app.put('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = messages;

  message.text = req.body.text

  messages = otherMessages;
  messages[message.id] = message;

  return res.send(messages[message.id])
})

// Crear ruta dedidaca al usuario pseudo autenticado
app.get('/session', (req, res) => {
  return res.send(users[req.me.id])
})

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
