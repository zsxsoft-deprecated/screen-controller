exports.e = function(io, socket) {
	var self = this;
	self.console.info('EDITOR (' + socket.id + ') connected!');
	socket.join('editor');
	
}