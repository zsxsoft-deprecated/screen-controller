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


var http_page = require('./' + config.webserver.server_folders),
	app = express(),
	client = DATABASE.createConnection(config.mysql);

client.query('USE `' + config.mysql.database + '`');
http_page.config = config;

app.use('/less', expressLess(path.join(__dirname, config.webserver.static_folders, '/less')), {
    debug: app.get('env') == 'development'
})
   .set('port', config.webserver.port)
   

   .engine('.html', require('ejs').__express)
   .set('view engine', 'html')

// .use(express.logger('dev'))
// .use(express.errorHandler())

   .use(express.json())
   .use(express.urlencoded())
   .use(express.methodOverride())
   .use(app.router)

   .use(express.static(path.join(__dirname, config.webserver.static_folders)))
   .set('views', path.join(__dirname, config.webserver.html_folders))
   .get('/', http_page.index)
   .get('/screen', http_page.screen)
   .get('/client', http_page.client)
   .get('/edit', http_page.edit)

;


var http_server = http.createServer(app).listen(config.webserver.port, function(){
    console.log('Server created!');
});


//   Socket Events
controler.sql = client;
controler.config = config;
controler.bind('screen', require('./lib/screen').func);
controler.bind('client', require('./lib/client').func);
controler.bind('desc_editor', require('./lib/desc_editor').func);
controler.on(http_server);
