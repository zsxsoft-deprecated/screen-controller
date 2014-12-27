define(function(require, exports, module) {

	module.exports = {
		init: function() {
			this.register(resisterFunction);
			this.registerSocket(resisterSocket);
		}
	};

	var resisterFunction = [
		{
			event: "toggleMusic",
			func: function(argu) {		
				initMusic.apply(this, argu);
			}
		},
		{
			event: "toProgram",
			func: function(argu) {			
				this.toggleMusic({action: "absolute", pos: 0})
			}
		}
	];

	var resisterSocket = [
		{
			event: "controlMultimedia", 
			func: function(data) {
				var methods = {
					play: function() {
						this.objects.active[0].play();
					},
					pause: function() {
						this.objects.active[0].pause();
					},
					stop: function() {
						this.objects.active[0].pause();
						this.objects.active[0].currentTime = 0;
					},
					toggle: function() {
						this.toggleMusic(data.param.param);
					}
				};
				methods[data.param.method].call(this);
				return true;
			}
		}
	];

	var initMusic = function(param) {

		var thisBGM = this.current.bgm,
			nextBGM = (param.action == "absolute" ? param.pos : thisBGM + param.pos);

		if (nextBGM >= this.program.bgm.length) {
			nextBGM %= (this.program.bgm.length);
		} else if (nextBGM == NaN) {
			nextBGM = 0;
		}

		this.objects.player.attr("src", this.program.bgm[nextBGM]);
		this.current.bgm = nextBGM;

	}

});