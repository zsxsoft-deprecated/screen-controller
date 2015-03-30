"use strict";

//  Include modules
var express = require('express')
var http = require('http');
var path = require('path');
var expressLess = require('express-less');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var path = require('path');
var bodyParser = require('body-parser');

var common = require('./core/lib/common'), console = require('./core/lib/console');

var config = require('./config').config;
var httpPage = require('./' + config.webServer.serverFolder);
var lang = require('./core/lang/' + config.lang).lang;

var app = express();

httpPage.config = config;
httpPage.lang = lang;

app
// Dev mode
.use(logger('dev'))
.use(errorHandler())

// set ejs
.engine('.html', require('ejs').__express)
.set('view engine', 'html')
.set('views', path.join(__dirname, config.webServer.htmlFolder))

// set less
.use('/less', expressLess(path.join(__dirname, config.webServer.staticFolder, '/less')))
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended: true}))

// set port
.set('port', config.webServer.port)

// set static resouces
.use('/resources', express.static(path.join(__dirname, config.webServer.resourceFolder)))
.use(express.static(path.join(__dirname, config.webServer.staticFolder)));


for (var index in httpPage) {
  if (/^\//.test(index)) {
    console.log(index);
    app.route(index).all(httpPage[index]);
  }
}


var httpServer = http.createServer(app).listen(config.webServer.port, function() {
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