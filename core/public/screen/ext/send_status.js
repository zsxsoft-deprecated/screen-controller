define(function(require, exports, module) {

	module.exports = {
		init: function() {
			this.register(resisterFunction);
		}
	};

	var resisterFunction = [
		{
			event: "toProgram",
			func: function (argu) {		
				this.socket.emit('program-switch', argu[0]);
			}
		},
		{
			event: "toggleMusic",
			func: function(argu) {		
				this.socket.emit('music-switch', argu[0].pos);
			}
		},
	];

});