"use strict";
delete require.cache['./config'];
//  Include modules
var
  express = require('express'),
  http = require('http'),
  path = require('path'),
	common = require('./lib/common'),
  console = require('./lib/console'),
	expressLess = require('express-less'),
  mysql = require('mysql');

var config = require('./config').config,
	httpPage = require('./' + config.webServer.serverFolders),
	app = express(),
	mysqlConnect = mysql.createConnection(config.mysql);

mysqlConnect.query('USE `' + config.mysql.database + '`');
httpPage.config = config;

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
   .set('views', path.join(__dirname, config.webServer.htmlFolders))

   // set less
   .use('/less', expressLess(path.join(__dirname, config.webServer.staticFolders, '/less')))

   .use(express.json())
   .use(express.urlencoded())
   .use(express.methodOverride())
   .use(app.router)
    
   // set port
   .set('port', config.webServer.port)

   // set static resouces
   .use(express.static(path.join(__dirname, config.webServer.staticFolders)))

   // set url
   .get('/', httpPage.index)
   .get('/screen', httpPage.screen)
   .get('/controller', httpPage.controller)
   .get('/edit', httpPage.edit)

;


var httpServer = http.createServer(app).listen(config.webServer.port, function(){
  console.success('Server created at http://127.0.0.1:' + config.webServer.port + '/ !');
});

common.setConsole(console)
      .bindSQLObject(mysqlConnect)
      .rebuildConfig(config)
      .bindEvent('global')
      .bindEvent('screen')
      .bindEvent('controller')
      .bindServer(httpServer);
