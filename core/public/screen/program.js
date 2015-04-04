define(function(require, exports, module) {

	var NO_AUDIO_DEFAULT_BGM = '/resources/empty.mp3';


	module.exports = {
		socket: null,
		program: {},
		display: {},
		programs: [],
		current: {
			program: 0,
			display: 0,
			bgm: 0,
			repeat: false,
			index: false,
			lastType: "image"
		},
		objects: {
			player: null,
			active: null
		},
		events: {
			timeupdate: [],
			toProgram: [],
			toggleSlide: [],
			toggleMusic: [],
		},
		sockets: {

		},

		// Events
		toProgram: function() {
			var me = this,
				argu = arguments;
			$.each(this.events.toProgram, function(i, value) {
				value.call(me, argu);
			});
		},
		toggleSlide: function() {
			var me = this,
				argu = arguments;
			$.each(this.events.toggleSlide, function(i, value) {
				value.call(me, argu);
			});
		},
		toggleMusic: function() {
			var me = this,
				argu = arguments;
			$.each(this.events.toggleMusic, function(i, value) {
				value.call(me, argu);
			});
		},


		init: function(param) {

			var me = this;

			// Set active object as audio
			this.objects.active = this.objects.player;
			this.objects.player
				.attr("preload", true)
				//				.attr("autoplay", true)
				.bind('timeupdate', function() {
					$.each(me.events.timeupdate, function(i, value) {
						value.apply(me);
					});
				});

			// Register events
			this.register([{
				event: "toProgram",
				func: function(argu) {

					var id = argu[0],
						object = this;

					object.current.display = 0;
					object.current.program = id;
					object.current.bgm = 0;
					object.program = object.programs[id];
					object.display = $.extend([], object.program.display);

					// Build Background Music
					if (typeof(object.program.bgm) == "string") object.program.bgm = [object.program.bgm];
					if (object.program.bgm[0] === '' || object.program.bgm.length === 0) object.program.bgm[0] = NO_AUDIO_DEFAULT_BGM;


					// Build Current
					if (object.program.display.length > 0) {
						object.current.repeat = !!program.display[0].repeat; // Set repeat
						object.current.index = !!program.display[0].index; // Set index
					} else {
						object.current.repeat = object.current.index = false;
					}

				}
			}]);

			// Reconnect socket.io
			this.socket = io.connect(param.socket);
			this.socket.on('error', function(err) {
				if (err && (err.code == 'ECONNREFUSED' || err.indexOf && err.indexOf('ECONNREFUSED') >= 0)) {
					var reconnecting = setTimeout(function() {
						socket.reconnect();
					}, 500); //assume a little threshold
					socket.on('connect', function() {
						clearTimeout(reconnecting);
						socket.removeListener('connect', arguments.callee);
					});
				}
			});
			this.socket.on('whoami', function() {
				me.socket.emit('whoami', 'screen');
				me.socket.emit('global', {
					need: "data"
				});
			});
			this.socket.on('data', function(data) {
				me.programs = data;
				me.toProgram(0);

				// 暴力预读功能
				var preloadList = [];
				me.programs.forEach(function(program) {
					program.display.forEach(function(item) {
						if (item.type == "image") {
							preloadList.push('<link rel="prefetch" href="' + item.media + '" />');
						}
					});
				});
				$("head").append(preloadList.join("\n"));
			});
			this.socket.on('screen', function(data) {
				me.runSocket(data.data.method, data);
			});

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
			if (typeof this.sockets[name] == "undefined") {
				throw new Exception("No handle for " + name, data);
			}
			$.each(this.sockets[name], function(i, value) {
				if (value.call(me, data.data)) {
					data.data = null;
					me.socket.emit('result', data);
					return true;
				}
			});
		}
	};

});