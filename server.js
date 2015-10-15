'use strict';
var getRandomWord = require('./lib/getRandomWord');
var Adjective = require('./lib/adjective.js');
var Verb = require('./lib/verb.js');
var Noun = require('./lib/noun.js');
var express = require ('express');
var app = express();
var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/app/'));

var port = process.env.PORT || 3000;

app.listen (port, function() {
  console.log ('server started on port' + port);
});

var adjectiveView = new Adjective();

var nounView = new Noun();

var verbView = new Verb();

function postWord(word, wordObject) {
  console.dir(word);
  if (wordObject.hasOwnProperty(word)) {
    return {msg: 'We already have your awesome word, ' + word + ', in our list.'};
  }

  wordObject[word] = true;
  return {msg: 'Thanks for submitting ' + word + '!'};
}

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

app.get('/adjective', function(request, response) {
  response.json(getRandomWord (adjectiveView));
});

app.get('/verb', function(request, response) {
  response.json(getRandomWord (verbView));
});

app.get('/noun', function(request, response) {
  response.json(getRandomWord (nounView));
});

app.post('/adjective', function(request, response) {
  // Process the data received, and send response
  response.json(postWord(request.body.word, adjectiveView));
});

app.post('/verb', function(request, response) {
  // Process the data received, and send response
  response.json(postWord(request.body.word, verbView));
});

app.post('/noun', function(request, response) {
  // Process the data received, and send response
  response.json(postWord(request.body.word, nounView));
});
