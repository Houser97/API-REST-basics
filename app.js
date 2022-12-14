var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let uuid = require('uuid');
let models = require('./models/index');

var indexRouter = require('./routes/index');

let session = require('./routes/session');
let user = require('./routes/user');
let message = require('./routes/message');

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
app.use('/session', session);
app.use('/users', user);
app.use('/messages', message);

// Creación de Middleware
app.use((req, res, next) => {
  req.me = users[1];
  next();
})

// Rutas para REST API
app.get('/users', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

app.get('/users/:userId', (req, res) => {
  return res.send(req.context.models.users[req.params.userId]);
})

app.get('/messages', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
})

app.get('/messages/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
})

// Creación de mensajes
app.post('/messages', (req, res) => {
  const id = uuid.v4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id
  }

  req.context.models.messages[id] = message;

  return res.send(message)
})

// Eliminación de mensajes
app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
})

// Actualización de mensajes
app.put('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  message.text = req.body.text

  req.context.models.messages = otherMessages;
  req.context.models.messages[message.id] = message;

  return res.send(req.context.models.messages[message.id])
})

// Crear ruta dedidaca al usuario pseudo autenticado
app.get('/session', (req, res) => {
  return res.send(req.context.models.users[req.context.me.id])
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
