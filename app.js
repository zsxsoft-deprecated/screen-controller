"use strict";
delete require.cache['./config'];
//  Include modules
var
  express = require('express'),
  http = require('http'),
  path = require('path'),
	common = require('./core/lib/common'),
  console = require('./core/lib/console'),
	expressLess = require('express-less');

var config = require('./config').config,
	httpPage = require('./' + config.webServer.serverFolder),
	app = express(),
  lang = require('./core/lang/' + config.lang).lang;

httpPage.config = config;
httpPage.lang = lang;

app
   // Dev mode
   
   .use(express.logger('dev'))
   .use(express.errorHandler())
   
   // set ejs
   .engine('.html', require('ejs').__express)
   .set('view engine', 'html')
   // set ejs render
   .set('views', path.join(__dirname, config.webServer.htmlFolder))

   // set less
   .use('/less', expressLess(path.join(__dirname, config.webServer.staticFolder, '/less')))

   .use(express.json())
   .use(express.urlencoded())
   .use(express.methodOverride())
   .use(app.router)
    
   // set port
   .set('port', config.webServer.port)

   // set static resouces
   .use('/resources', express.static(path.join(__dirname, config.webServer.resourceFolder)))
   .use(express.static(path.join(__dirname, config.webServer.staticFolder)))


   // set url
   .get('/', httpPage.index)
   .get('/screen', httpPage.screen)
   .get('/controller', httpPage.controller)
   .get('/editor', httpPage.editor)

;


var httpServer = http.createServer(app).listen(config.webServer.port, function(){
  console.success(lang.console.serverCreated.replace("%u%", "http://127.0.0.1:" + config.webServer.port + '/'));
});

common.setConsole(console)
      .setLang(lang)
      .rebuildConfig(config)
      .loadExtensions()
      .bindEvent('global')
      .bindEvent('screen')
      .bindEvent('controller')
      .bindEvent('editor')
      .bindServer(httpServer);
