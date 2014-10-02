exports.func = function(self, io, socket)
{

	
	var func_result     = function(data){
		console.log(data);
		delete self.queue.queue[data.id];
		io.sockets.to(data.screen_id).emit('result', data);
	}

	
	console.log('Screen Request');
	socket.join('screen');

	socket.on('result',     func_result    );
	
			
}