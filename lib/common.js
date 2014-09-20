exports.io = null;
exports.func = [];
exports.config = [];
exports.queue = {
	"queue": [],
	"max_id": 0
};

exports.create_request = function(screen_id, data_id, name, data){
	this.queue.max_id++;
	var _maxid = this.queue.max_id;
	this.queue.queue[_maxid] = {
		name : name,
		data : data,
		id : _maxid,
		screen_id : screen_id,
		data_id : data_id
	};
	console.log(this.queue.queue[_maxid]);
	this.io.sockets.in('screen').emit(name, this.queue.queue[_maxid]);
}

exports.on = function(server){
	var self = this,
		io = require('socket.io').listen(server),
		global_func = require('./global').func;
		
		
	exports.io = io;
	io.sockets.on('connection', function (socket) {
		socket.emit('whoami', 'Who am I?');
		socket.on('whoami', function (data) {
			console.log('[request] new ' + data);
			socket.join(data);
			global_func(self, io, socket);
			self.func[data](self, io, socket);			
    	});	
	});

}

exports.bind = function(id, fun){
	exports.func[id] = fun;
}

