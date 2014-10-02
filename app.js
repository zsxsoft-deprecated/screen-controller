delete require.cache['./config'];
//  Include modules
var express = require('express'),
    http = require('http'),
    path = require('path'),
	common = require('./lib/common'),
	expressLess = require('express-less');

var DATABASE = require('mysql');

var config = require('./config').config,
	http_page = require('./' + config.webserver.server_folders),
	app = express(),
	mysqlConnect = DATABASE.createConnection(config.mysql);

mysqlConnect.query('USE `' + config.mysql.database + '`');
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
   .get('/controller', http_page.controller)
   .get('/edit', http_page.edit)

;


var http_server = http.createServer(app).listen(config.webserver.port, function(){
    console.log('Server created!');
});


//   Socket Events
common.sql = mysqlConnect;
common.config = config;
common.bind('screen', require('./lib/screen').func);
common.bind('controller', require('./lib/controller').func);
common.bind('desc_editor', require('./lib/desc_editor').func);
common.on(http_server);
