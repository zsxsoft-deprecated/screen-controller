define(function(require, exports, module) {
	
	module.exports = {
		init: function(object) {
			object.registerSocket(resister_socket);
		}
	};

	var resister_socket = [
		{
			event: "audio", 
			func: function(object, argu) {

				data = argu[0];
				console.log(data);

				var methods = {
					play: function() {
						object.objects.active[0].play();
					},
					pause: function() {
						object.objects.active[0].pause();
					},
					stop: function() {
						this.pause();
						object.objects.active[0].currentTime = 0;
					},
					toggle: function() {
						object.toggleMusic({
							action: (data.data.to ? "absolute" : ""),
							pos: (data.data.to ? data.data.to : data.data.plus)
						});
					}
				};

				methods[data.data.method]();
				data['data'] = null;
				object.socket.emit('result', data);
			}
		},
		{
			event: "screen", 
			func: function(object, argu) {

				data = argu[0];
				console.log(data.data);
				var methods = {
					toggle: function() {
						object.toggleSlide({action: "", pos: data.data.pageplus})
					},
					skipto: function() {
						object.toProgram(data.data.id);
					},
					// Implemented API
					// score, background
				};
				methods[data.data.method]();
				data['data'] = null;
				object.socket.emit('result', data);
			}
		},
		{
			event: "page", 
			func: function(object, argu) {

				data = argu[0];
				console.log(data);

				var methods = {
					run_javascript: function() {
						(new Function(data.data.code))(object);
					},
					init: function() {
						location.reload();
					}
				};

				methods[data.data.method]();
				data['data'] = null;
				object.socket.emit('result', data);

			}
		}

	];




});