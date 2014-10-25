exports.e = function(io, socket) {
	var self = this;
	self.console.info('CONTROLLER (' + socket.id + ') connected!');
	socket.join('controller');
	socket.on('screen', function(data) {
		self.createRequest(socket.id, data.id, data.data);
	});
}