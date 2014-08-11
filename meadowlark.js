var express = require('express');
var app = express();

//set up handlebars view engine

var handlebars = require('express3-handlebars').create({ defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.disable('x-powered-by');

app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3001 );

var fortune = require('./lib/fortune.js');

//Testing Modules
app.use(function(req,res,next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});


//Home and About Pages
app.get('/', function(req,res){
    res.render('home');
});

app.get('/about', function(req,res){
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

//Tour Routes

app.get('/tours/hood-river', function(req,res){
    res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', function(req,res){
    res.render('tours/oregon-coast');
});

// app.get('/tours/swamp-river', function(req,res){
//     res.render('tours/swamp-river');
// });

app.get('/tours/request-group-rate', function(req,res){
    res.render('tours/request-group-rate');
});

app.use(function(req,res,next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = getWeatherData();
    next;

});

//Weather app

function getWeatherData(){
    return{
        locations:[
            {
                name: 'Portland',
                forcastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)',
            },
            {
                name: 'Bend',
                forcastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '55.0 F (12.8 C)',
            },
            {
                name: 'Manzanita',
                forcastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '55.0 F (12.8 C)',
            },


        ],
    };
}




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

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
