exports.e = function(io, socket) {
	var self = this;
	self.console.info('CONTROLLER (' + socket.id + ') connected!');
	socket.join('controller');
	socket.on('screen', function(data) {
		self.createRequest("allScreen", socket.id, data.id, data.data);
		console.log(data);
	});

	socket.on('result', function(data){
		delete self.queue.queue[data.id];
		// io.sockets.to(data.requestId).emit('result', data);
		self.console.success('Request (' + data.id + ') finished.');
	});	
}