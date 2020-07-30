/*************************************************
 * James Underwood
 * CS290 - Summer 2020
 * HW5
 ************************************************/

// In addition to the lecture videos, I also coded along 
// with a youtube video that was recommended
// https://www.youtube.com/watch?v=sw6rcXZiRos 
// the main, 404, 500, home, and show-data handlbars code came
// from that video

var express = require('express');

//http://expressjs.com/en/resources/middleware/body-parser.html
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5426);

// From lecture
app.get('/',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('get', context);
});

app.post('/', function(req,res){
  var qParams = [];
  for (var p in req.body){
    qParams.push({'name':p,'value':req.body[p]})
  }
  console.log(qParams);
  console.log(req.body);
  var context = {};
  context.dataList = qParams;
  res.render('post', context);
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

// var express = require('express');

// var app = express();

// app.set('port', 5426);

// app.use(function(req,res){
//   res.type('text/plain');
//   res.status(404);
//   res.send('404 - Not Found');
// });

// app.use(function(err, req, res, next){
//   console.error(err.stack);
//   res.type('plain/text');
//   res.status(500);
//   res.send('500 - Server Error');
// });

// app.listen(app.get('port'), function(){
//   console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
// });
