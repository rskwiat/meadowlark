var express = require('express');
var app = express();

//set up handlebars view engine

var handlebars = require('express3-handlebars').create({ defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3001 );


//Home and About Pages
app.get('/', function(req,res){
    res.render('home');
});

app.get('/about', function(req,res){
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
});


//custom 404 page
app.use(function(req,res){
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

//fortune cookie

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "River needs Springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surpise.",
    "Whenever possible keep is simple.",
    "4 8 15 16 23 42"
];


app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
