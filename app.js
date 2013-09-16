var express = require('express')
  , engine = require('ejs-locals')
  , app = express()
  , sermons = require('./data/sermons').data;

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

 

app.get('/sermons', function(req, res){

res.render('sermons.ejs', {

title: 'Sister Christian - Sermons',

sermons: sermons

});

});

 

app.get('/sermons/:title', function(req, res) {

var data = sermons.filter(function (sermons) {

return (sermons.url === req.params.title);

});

 

if (data.length > 0) {

data = data[0];

data.title = 'Sister Christian - Sermons';

 

res.render('sermon.ejs', data);

} else {

res.status(404).render('error.ejs', {title: 'Sermons Not Found'});

}

});

 

app.get('/*', function(req, res) {

res.status(404).render('error.ejs', {title: 'Error'});

});

 

app.listen(3000);