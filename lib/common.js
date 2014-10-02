var exports = module.exports = {};
exports.io = null;
exports.sql = null;
exports.socketFunctions = [];
exports.queue = {
	maxId: 0,
	queue: []
};
exports.config = [];

exports.bindSQLObject = function(object) {
	this.sql = object;
	return this;
};

exports.rebuildConfig = function(object) {
	this.config = object;
	return this;
};

exports.createRequest = function(screenId, dataId, requestData) {
	
	this.queue.maxId++;
	this.queue.queue[this.queue.maxId] = {
		id: this.queue.maxId,
		name: "screen",
		data: requestData,
		screenId: screenId,
		dataId: dataId
	}

	console.log(this.queue.queue[this.queue.maxId]);
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
			me.socketFunctions.global(me, io, socket);
			me.socketFunctions[data](me, io, socket);
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