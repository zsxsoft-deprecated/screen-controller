/// <reference path="../../../../typings/react/react.d.ts"/>
define(function (require, exports, module) {

	var sendRequest = function (data, callback) {
		var me = this;
		if (!data) data = {};
		if (typeof (data) == 'string') data = {
			'method': data
		};
		if (!callback) callback = function () { }

		var queueLength = this._queue.data.length;
		this._queue.data[queueLength] = {
			data: data,
			id: queueLength
		};
		this._queue.callback[queueLength] = callback;
		this.socket.emit('screen', this._queue.data[queueLength]);
		console.log(this._queue.data[queueLength]);

	};
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

			this.socket.on('data', function (data) {
				me.programs = data;
				me.program = me.programs[0];
				//				me.reactRender.setState({programs: data});
				//				console.log(me.reactRender);
				me.programs.forEach(function(value, index) {
					value.tagId = index;console.log(value.tagId);
				});
				
				me.emit("dataGot");
			});


			this.socket.on('program-switch', function (data) {
				me.program = me.programs[data];
				me.emit("programChanged");
			});

			this.on("changeProgram", function (id) {

				sendRequest.call(me, {
					method: "toProgram",
					param: {
						action: "absolute",
						pos: id//me.programs[id].tagId
					}
				});

			});

			return {};
		}
	};
});