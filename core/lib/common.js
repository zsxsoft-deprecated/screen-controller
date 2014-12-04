var exports = module.exports = {};
exports.console = console;
exports.io = null;
exports.socketFunctions = [];
exports.queue = {
	maxId: 0,
	queue: []
};
exports.config = [];
exports.lang = {};
exports.setConsole = function(object) {
	this.console = object;
	return this;
}
exports.setLang = function(object) {
	this.lang = object;
	return this;
}

exports.rebuildConfig = function(object) {
	this.config = object;
	return this;
};

exports.createRequest = function(room, requestId, dataId, requestData, callback) {

	this.queue.maxId++;
	this.queue.queue[this.queue.maxId] = {
		id: this.queue.maxId,
		name: room,
		data: requestData,
		requestId: requestId,
		dataId: dataId
	}
	this.logConsole(this.queue.queue[this.queue.maxId])
	if (room == 'allScreen')
		return this.createRequestToAllScreen(requestId, dataId, requestData);
	else 
		callback.call(this, this.queue.queue[this.queue.maxId]);
	
	return this;

}

exports.createRequestToAllScreen = function(requestId, dataId, requestData) {
	
	this.io.sockets.in('screen').emit('screen', this.queue.queue[this.queue.maxId]);
	return this;

};

exports.bindServer = function(server) {
	var me = this,
		io = this.io = require('socket.io').listen(server);
	
	io.sockets.on('connection', function (socket) {
		socket.emit('whoami', 'Who are you?');
		socket.on('whoami', function (data) {
			socket.join(data);
			me.socketFunctions.global.call(me, io, socket);
			me.socketFunctions[data].call(me, io, socket);
		});
	});
	return this;

};

exports.bindEvent = function(moduleName) {
	var module = require('./socket/' + moduleName).e,
		me = this;
	me.socketFunctions[moduleName] = module;
	return this;
}

exports.logConsole = function(queue) {
	this.console.info(this.lang.console.requestCreated.replace("%s%", queue.id) + JSON.stringify(queue.data));
}

exports.loadExtensions = function() {
	for (var object in this.config.extensions) {
		var module = require("./ext/" + object);
		module.init.call(this, this.config.extensions[object]);
	}
	return this;
}