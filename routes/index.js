var express = require('express');
var router = express.Router();

var redis = require('redis');

var base64 = require('base-64');


var app = express();

var client = redis.createClient(6379, "49.247.211.14");

/* GET home page. */
router.get('/', function(req, res, next) {
  var cookie = req.headers.cookie;
  console.log('Cookies: ', req.cookies);
  console.log('Cookies: ', req.cookies['sessionId']);
  console.log(cookie);
  console.log(cookie.sessionID);

  console.log('base64Decoded : ' + base64.decode(req.cookies['sessionId']));
  var base64Decoded = base64.decode(req.cookies['sessionId']);

  // client.hgetall('spring:session:sessions:3cba545f-158f-412e-b4e5-21bff5a60eca', function(err, reply) {
  client.hgetall('spring:session:sessions:' + base64Decoded, function(err, reply) {
    console.log(reply);
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
