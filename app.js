var express = require('express')
  , engine = require('ejs-locals')
  , app = express()
  , sermons = require('./data/sermons').data;

var compass = require('node-compass');
	app.configure(function() {
	    app.use(compass());
	});

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs'); // so you can render('index')

// render 'index' into 'boilerplate':
//app.get('/',function(req,res,next){
//  res.render('index', { what: 'best', who: 'me' });
//});

 

app.get('/', function(req, res){

res.render('index.ejs', {title: 'The Mustard Seed'});

});

app.get('/commandments', function(req, res){

res.render('commandments.ejs', {title: 'The Mustard Seed - Commandments'});

});

app.get('/series', function(req, res){

res.render('series.ejs', {title: 'The Mustard Seed - Sermons by Series'});

});

 

app.get('/sermons', function(req, res){

res.render('sermons.ejs', {

title: 'The Mustard Seed - Sermons',

sermons: sermons

});
});

app.get('/authors', function(req, res){

res.render('authors.ejs', {

title: 'The Mustard Seed - Sermons by Author',

sermons: sermons

});

});

 

app.get('/sermons/:title', function(req, res) {

var data = sermons.filter(function (sermons) {

return (sermons.url === req.params.title);

});

 

if (data.length > 0) {

data = data[0];

data.title = 'The Mustard Seed - Sermons';

 

res.render('sermon.ejs', data);

} else {

res.status(404).render('error.ejs', {title: 'Sermons Not Found'});

}

});

 

app.get('/*', function(req, res) {

res.status(404).render('error.ejs', {title: 'Error'});

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});