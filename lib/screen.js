exports.func = function(self, io, socket)
{
	var result_events   = {
		"audio": function(data){
		},
		"page": function(data){			
		},
		"screen": function(data){			
		}
	}
	
	var func_result     = function(data){
		console.log(data);
		delete self.queue.queue[data.id];
		result_events[data.name](data);
		io.sockets.socket(data.screen_id).emit('result', data);
	}
	
	
	console.log('Screen Request');
	socket.join('screen');
	io.sockets.in('client').emit('notice', 'a new screen joined in!');

	socket.on('result',     func_result    );
	
			
}