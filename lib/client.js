exports.func = function(self, io, socket)
{
	
	var func_screen          = function(data){
		self.create_request(socket.id, data.id, data.name, data.data);
	}

	var to_screen            = function(name, data){
		io.sockets.in('server').emit(name, data);
	}
	
	console.log('Client Request');
	socket.join('client');

	socket.on('screen', func_screen);
			
}