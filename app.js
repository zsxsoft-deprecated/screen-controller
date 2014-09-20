delete require.cache['./config'];
//  Include modules
var express = require('express'),
    http = require('http'),
    path = require('path'),
	controler = require('./lib/common'),
	expressLess = require('express-less');

var DATABASE = require('mysql');

var config = require('./config').config,
    single = require('./lib/class_data').init;
	
//  Connect to MySQL
var client = DATABASE.createConnection(config.mysql);
client.query('USE `' + config.mysql.database + '`');


//  Init WebServer
var http_page = require('./' + config.webserver.server_folders);
http_page.config = config;
var app = express();
app.use('/less', expressLess(path.join(__dirname, config.webserver.static_folders, '/less')), {
    debug: app.get('env') == 'development'
});
app.set('port', config.webserver.port);
app.set('views', path.join(__dirname, config.webserver.html_folders));

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, config.webserver.static_folders)));
if ('development' == app.get('env')) app.use(express.errorHandler());
app.get('/', http_page.index);
app.get('/screen', http_page.screen);
app.get('/client', http_page.client);
app.get('/client-min', http_page.client_min);
app.get('/edit', http_page.edit);


var http_server = http.createServer(app).listen(config.webserver.port, function(){
    console.info('   info  - http_server created!');
});


//   Socket Events
controler.sql = client;
controler.config = config;
controler.bind('screen', require('./lib/screen').func);
controler.bind('client', require('./lib/client').func);
controler.bind('desc_editor', require('./lib/desc_editor').func);
controler.on(http_server);
