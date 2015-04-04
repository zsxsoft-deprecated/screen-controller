"use strict";

//  Include modules
var express = require('express')
var http = require('http');
var path = require('path');
var less = require("less");
var logger = require('morgan');
var errorHandler = require('errorhandler');
var path = require('path');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var fs = require("fs");

var app = express();

global.config = require("./config");
global.lang = require("./core/lang/" + config.lang);
var common = require('./core/lib/common'),
  console = require('./core/lib/console');
var route = require('./' + config.webServer.routeFolder);

app
// Dev mode
.use(logger('dev'))
  .use(errorHandler())

// set ejs
.engine('.html', ejs.__express)
  .set('view engine', 'html')
  .set('views', path.join(__dirname, config.webServer.htmlFolder))

// set less
.use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))

// set port
.set('port', config.webServer.port)

// set static resouces
.use('/resources', express.static(path.join(__dirname, config.webServer.resourceFolder)))
  .use(express.static(path.join(__dirname, config.webServer.staticFolder)))
  .get(/\/dynamic\/(.+)/, function(req, res) {
    var filePath = path.join(__dirname, config.webServer.dynamicFolder, req.params[0]);
    fs.readFile(filePath, "utf8", function(err, data) {
      if (err) res.end("Error");
      var extName = path.extname(filePath);
      data = ejs.render(data);
      if (extName == ".less") {
        // 检查是否less，如果是less就要处理转换一下
        less.render(data, function(e, output) {
          res.send(output.css);
        });
      } else {
        res.send(data);
      }
      
    });

  })
for (var index in route) {
  if (/^\//.test(index)) {
    app.route(index).all(route[index]);
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