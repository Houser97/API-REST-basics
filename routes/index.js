var express = require('express');
var router = express.Router();

let session = require('./session');
let user = require('./user');
let message = require('./message');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

export default {
  session,
  user,
  message
}