exports.init = function(config) {
	var self = this;

	var barrageSocket = require('socket.io-client').connect(config.wsUrl);

	barrageSocket.on('error', function(err) {
		console.error(err);
		if (err && (err.code == 'ECONNREFUSED' || err.indexOf && err.indexOf('ECONNREFUSED') >= 0)) {
			var reconnecting = setTimeout(function() {
				barrageSocket.reconnect();
			}, 500); //assume a little threshold
			barrageSocket.on('connect', function() {
				clearTimeout(reconnecting);
				barrageSocket.removeListener('connect', arguments.callee);
			});
		}
	});

	barrageSocket.on('init', function(data) {
		console.info(self.lang.ext.barrage.getResponse);
		barrageSocket.emit("password", {
			room: self.config.extensions.barrage.room,
			password: self.config.extensions.barrage.password
		});
	});

	barrageSocket.on("connected", function() {
		console.success(self.lang.ext.barrage.connected.replace("%u%", config.wsUrl));

	});

	barrageSocket.on('danmu', function(data) {
		console.info(self.lang.ext.barrage.receivedBarrage.replace("%c%", data.data.length));
		self.createRequest("allScreen", 0, 0, {
			method: "barrage",
			data: data.data
		}, function() {

		});
	});



};