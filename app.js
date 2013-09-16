var express = require('express')
  , engine = require('ejs-locals')
  , app = express();

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs'); // so you can render('index')

// render 'index' into 'boilerplate':
//app.get('/',function(req,res,next){
//  res.render('index', { what: 'best', who: 'me' });
//});

 

app.get('/', function(req, res){

res.render('index.ejs', {title: 'Clever Kitchens'});

});

 

app.get('/recipes', function(req, res){

res.render('boilerplate.ejs', {

title: 'Clever Kitchens - Recipes',

body: '<h1>All Recipes</h1>'

});

});

 

app.get('/recipes/:title', function(req, res) {

res.send('<h1>' + req.params.title + '</h1>');

});

 

app.get('/*', function(req, res) {

res.status(404).render('error.ejs', {title: 'Error'});

});

 

app.listen(3000);