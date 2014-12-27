exports.e = function(io, socket) {
	var self = this;
	self.console.info(this.lang.console.clientConnected.replace("%c%", this.lang.global.controller).replace("%d%", socket.id));
	socket.on('screen', function(data) {
		self.createRequest("allScreen", socket.id, data.id, data.data);
	});

	socket.on('result', function(data){
		delete self.queue.queue[data.id];
		// io.sockets.to(data.requestId).emit('result', data);
		self.console.success(self.lang.console.requestFinish.replace("%d%", data.id));
	});	
}