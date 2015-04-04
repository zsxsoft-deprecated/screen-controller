define(function(require, exports, module) {
// 传说中的抽签程序
	var DRAW_BGM = '/resources/empty.mp3';
	module.exports = {
		init: function() {
			this.register(registerFunction);
			this.registerSocket(registerSocket);
		}
	};

	var registerFunction = [{
		event: "toggleSlide",
		func: function(argu) {
			if (this.program.isDraw) {
				buildDraw.apply(this);
			}
		}
	}];

	var registerSocket = [{
		event: "timingControl",  // 倒计时控制
		func: function() {
			
			return true;
		}
	}, {
		event: "toDraw",
		func: function() {
			var lastProgram = this.programs.length - 1;
			if (!this.programs[lastProgram].isDraw) {
				this.programs.push({
					bgm: [DRAW_BGM],
					display: [{
						type: "custom",
						custom: function(dom) {
							dom.attr("id", "dom-draw").css("background-color", "#333");
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
					isDraw: true,
					rank: false
				});
				lastProgram++;
			}

			this.toProgram(lastProgram);
			return true;
		}, 
	}];



	var buildDraw = function() {

		var object = this;

	};


	// draw means 抽签
	// not 绘画
	var drawInterval = 0; // 抽签闪现计时器
	var drawList = {};
	var drawIndex = 0;

	var drawInit = function() {
		drawList = config.extensions.draw.list;
		drawIndex = 0;
	};
	var drawClear = function() {
		drawList.splice(drawIndex, 1);
		clearInterval(drawTimerval);
	};
	var drawRegister = function() {
		drawInterval = setInterval(drawFunction, config.extensions.draw.drawInterval);
	};
	var drawFunction = function() {
		$("#drawText").text(drawList[++drawIndex]);
	};

	var loopRemainTime = 0;
	var loopInterval = 0;
	var loopInit = function(method) {
		// 30 for prepare.　
		// 200 for show.
		loopRemainTime = (method === 1 ? 200 : 30);
		loopRegister();
	};
	var loopRegister = function() {
		loopInterval = setInterval(loopFunction, 1000); // 1000 means 1 sec.
	};
	var loopFunction = function() {
		$("#loopText").text(--loopRemainTime);
		if (loopRemainTime === 0) {
			clearInterval(loopInterval);
		}
	};

});