/// <reference path="../../../../typings/react/react.d.ts"/>
define(function (require, exports, module) {
	module.exports = {
		init: function () {
			var me = this;
			this.socket = io.connect(location.origin);
			this.socket.on('error', function (err) {
				if (err && (err.code == 'ECONNREFUSED' || err.indexOf && err.indexOf('ECONNREFUSED') >= 0)) {
					var reconnecting = setTimeout(function () {
						me.socket.reconnect();
					}, 500); //assume a little threshold
					me.socket.on('connect', function () {
						clearTimeout(reconnecting);
						me.socket.removeListener('connect', arguments.callee);
					});
				}
			});

			this.socket.on('result', function (data) {
				var id = data.dataId;
				if (id >= 0 && me._queue.data[id]) {
					console.log('Request ' + id + ' finished!');
					me._queue.callback[id]();
					delete me._queue.data[id];
					delete me._queue.callback[id];
				}
			});

			this.socket.on('whoami', function () {
				me.socket.emit('whoami', 'controller');
				me.socket.emit('global', {
					"need": "data"
				});
			});

			this.socket.on('data', function(data) {
				me.programs = data;
				me.program = me.programs[0];
				me.reactRender.forceUpdate();

			});


			this.socket.on('program-switch', function(data) {
				me.program = me.programs[data];
				me.emit("programChanged");
				
			});
			
			return {};
		}
	};
});