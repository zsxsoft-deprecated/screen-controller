define(function(require, exports, module) {

	module.exports = {
		socket: null,
		program: {},
		display: {},
		programs: [],
		events: {
			runSql: [],
			toProgram: [],
		},

		// Events
		toProgram: function() {
			var me = this,
				argu = arguments;
			$.each(this.events.toProgram, function(i, value) {
				value.apply(me, argu);
			});
		},
		runSql: function() {
			console.log(arguments);
			var me = this,
				argu = arguments;
			$.each(this.events.runSql, function(i, value) {
				value.apply(me, argu);
			});
		},

		init: function(param) {
			var me = this;
			// Reconnect socket.io
			this.socket = io.connect(param.socket);
			this.socket.on('error', function (err) {
				if (err && (err.code == 'ECONNREFUSED' || err.indexOf && err.indexOf('ECONNREFUSED') >= 0)) {
					var reconnecting = setTimeout(function () {
						socket.reconnect();
					}, 500); //assume a little threshold
					socket.on('connect', function () {
						clearTimeout(reconnecting);
						socket.removeListener('connect', arguments.callee);
					});
				}
			});
			this.socket.on('whoami', function(){
				me.socket.emit('whoami', 'editor');
				me.socket.emit('global', {need: "data"});
			});
			this.socket.on('data', function(data) {
				me.programs = data;
				me.toProgram(0);
			})
			this.socket.on('return', function(data) {
				me.runSocket(data.data.method, data);
			});
			this.register([{
				event: "toProgram",
				func: function(id) {
					this.program = this.programs[id];
					this.display = this.program.display;
				}
			}])

			return this;

		},
		register: function(param) {
			var me = this;
			$.each(param, function(i, value) {
				me.events[value.event].push(value.func);
			});
			return this;
		},
		registerSocket: function(param) {
			var me = this;
			$.each(param, function(i, value) {
				if (!me.sockets[value.event]) me.sockets[value.event] = [];
				me.sockets[value.event].push(value.func);
			});
			return this;
		},
		runSocket: function(name, data) {
			var me = this;
			$.each(this.sockets[name], function(i, value) {
				if (value.call(me, data.data)) {
					data['data'] = null;
					me.socket.emit('result', data);
					return true;
				}
			});
		}
	};

});