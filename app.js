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

app

   // Dev mode
   /*
     .use(express.logger('dev'))
     .use(express.errorHandler())
   */
   
   // set ejs
   .engine('.html', require('ejs').__express)
   .set('view engine', 'html')
   // set ejs render
   .set('views', path.join(__dirname, config.webserver.html_folders))

   // set less
   .use('/less', expressLess(path.join(__dirname, config.webserver.static_folders, '/less')))


   .use(express.json())
   .use(express.urlencoded())
   .use(express.methodOverride())
   .use(app.router)
    
   // set port
   .set('port', config.webserver.port)

   // set static resouces
   .use(express.static(path.join(__dirname, config.webserver.static_folders)))

   // set url
   .get('/', http_page.index)
   .get('/screen', http_page.screen)
   .get('/controller', http_page.controller)
   .get('/edit', http_page.edit)

;


var httpServer = http.createServer(app).listen(config.webserver.port, function(){
    console.log('Server created!');
});

console.log(common);
common.bindSQLObject(mysqlConnect)
      .rebuildConfig(config)
      .bindEvent('global')
      .bindEvent('screen')
      .bindEvent('controller')
      .bindServer(httpServer);
