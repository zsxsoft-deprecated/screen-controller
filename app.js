/* global lang */
/// <reference path="typings/node/node.d.ts"/>
/* global config */
/* global global */
"use strict";
var version = "1.0.4-20150404b";

//  Include modules
var express = require('express')
var http = require('http');
var path = require('path');
var less = require("less");
var logger = require('morgan');
var errorHandler = require('errorhandler');
var path = require('path');
var ejs = require('ejs');
var fs = require("fs");
var os = require('os');
var iconv = require('iconv-lite');
iconv.skipDecodeWarning = true;

var app = express();

global.config = require("./config");
config.version = version;
global.lang = require("./core/lang/" + config.lang);

var common = require('./core/lib/common');
var route = require('./' + config.webServer.routeFolder);
var console = require('./core/lib/console');

app
// Dev mode
.use(logger('dev'))
	.use(errorHandler())

// set ejs
.engine('html', ejs.__express)
	.set('view engine', 'html')
	.set('views', path.join(__dirname, config.webServer.htmlFolder))

// set static resouces
.use('/resources', express.static(path.join(__dirname, config.webServer.resourceFolder)))
	.use('/bower_components', express.static(path.join(__dirname, 'bower_components')))
	.use(express.static(path.join(__dirname, config.webServer.staticFolder)))

// set dynamic route
.use(/\/dynamic\/(.+)/, function(req, res) {
	var filePath = path.join(__dirname, config.webServer.dynamicFolder, req.params[0]);
	fs.readFile(filePath, "utf8", function(err, data) {
		if (err) res.end("Error");
		var extName = path.extname(filePath);
		// 动态的文件用ejs处理，省得自己再去正则替换
		data = ejs.render(data);
		if (extName == ".less") {
			// 检查是否less，如果是less就要处理转换一下
			less.render(data, function(e, output) {
				res.header("Content-Type", "text/css; charset=utf-8");
				res.send(output.css);
			});
		} else {
			res.send(data);
		}
	});
})

// set route
for (var index in route) {
	if (/^\//.test(index)) {
		app.route(index).all(route[index]);
	}
}


var httpServer = http.createServer(app).listen(config.webServer.port, function() {
	console.success(lang.console.serverCreated.replace("%u%", "http://127.0.0.1:" + config.webServer.port + '/'));

	var interfaces = os.networkInterfaces();
	Object.keys(interfaces).forEach(function(key) {
		interfaces[key].forEach(function(item) {
			console.success(lang.console.getIpInformation.replace("%s%", iconv.decode(key, "UTF-8")) + ": http://" + item.address + ":" + config.webServer.port);
		});
	});
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