var express = require('express');
var bodyParser = require('body-parser');
var calculator = require('./calculator.js');



var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.post('/', function (request, response) {
  var task = request.body.example;
  var result = calculator.calculate(task);
  
  console.log(task + ' => ' + result);

  var object = {result: result};
  response.json(object);
});

app.listen(3004, function () {
  console.log('Example app listening on port 3004!');
});
