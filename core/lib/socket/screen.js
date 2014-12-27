exports.e = function(io, socket) {
	var self = this;
	self.console.info(this.lang.console.clientConnected.replace("%c%", this.lang.global.screen).replace("%d%", socket.id));
	socket.on('result', function (data) {
		delete self.queue.queue[data.id];
		io.sockets.to(data.requestId).emit('result', data);
		self.console.success(self.lang.console.requestFinish.replace("%d%", data.id));
	});	

	socket.on('program-switch', function (data) {
		self.createRequestToController('program-switch', data);
	});

	socket.on('music-switch', function (data) {
		self.createRequestToController('music-switch', data);
	})
}