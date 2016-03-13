var express = require('express'),
    stylus = require('stylus'),
    path = require('path'),
    morgan = require('morgan'),
    nib = require('nib');

var app = express();

function compile(str, path) {
    return stylus(str).set('filname', path).use(nib());
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(morgan('combined'));
app.use(stylus.middleware({
    src: path.join(__dirname, 'public'),
    compile: compile
}));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.render('index', {
        title : 'Coming Soon'
    });
});
app.listen(80);
