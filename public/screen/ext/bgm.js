define(function(require, exports, module) {

	module.exports = {
		init: function(object) {
			object.register(resister_function);
			object.registerSocket(resister_socket);
		}
	};

	var resister_function = [
		{
			event: "toggleMusic",
			func: function(object, argu) {		
				init_bgm(object, argu);
			}
		},
		{
			event: "toProgram",
			func: function(object, argu) {			
				object.toggleMusic({action: "absolute", pos: 0})
			}
		}
	];

	var resister_socket = [
		{
			event: "controlMultimedia", 
			func: function(object, data) {

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
						object.toggleMusic(data.param.param);
					}
				};
				methods[data.param.method]();
				return true;
			}
		}
	];

	var init_bgm = function(object, argu) {

		var thisBGM = object.current.bgm,
			nextBGM = (argu[0].action == "absolute" ? argu[0].pos : thisBGM + argu[0].pos);

		if (nextBGM >= object.program.bgm.length) {
			nextBGM %= (object.program.bgm.length);
		} else if (nextBGM == NaN) {
			nextBGM = 0;
		}

		object.objects.player.attr("src", object.program.bgm[nextBGM]);
		object.current.bgm = nextBGM;

	}

});