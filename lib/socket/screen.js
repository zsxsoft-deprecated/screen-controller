exports.e = function(io, socket) {
	var self = this;
	self.console.info('SCREEN (' + socket.id + ') connected!');
	socket.join('screen');
	socket.on('result', function(data){
		delete self.queue.queue[data.id];
		io.sockets.to(data.screenId).emit('result', data);
		self.console.success('Request (' + data.id + ') finished.');
	});	
}