define(function(require, exports, module) {
// 传说中的抽签程序
	var FUCK_BGM = '/resources/empty.mp3';
	module.exports = {
		init: function() {
			this.register(registerFunction);
			this.registerSocket(registerSocket);
		}
	};

	var registerFunction = [{
		event: "toggleSlide",
		func: function(argu) {
			if (this.program.isFuck) {
				drawFuck.apply(this);
			}
		}
	}];

	var registerSocket = [{
		event: "toScore",
		func: function() {
			var lastProgram = this.programs.length - 1;
			if (!this.programs[lastProgram].isFuck) {
				this.programs.push({
					bgm: [FUCK_BGM],
					display: [{
						type: "custom",
						custom: function(dom) {
							dom.attr("id", "dom-fuck").css("background-color", "#333");
						}
					}],
					id: lastProgram,
					player: {
						class: "",
						doom: "",
						name: ""
					},
					program: {
						name: "抽签"
					},
					score: [0],
					isFuck: true,
					rank: false
				});
				lastProgram++;
			}

			this.toProgram(lastProgram);
			return true;
		}
	}];



	var drawFuck = function() {

		var object = this;

		$('#dom-fuck')
	}

});