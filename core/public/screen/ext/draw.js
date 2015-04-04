define(function(require, exports, module) {
	// 传说中的抽签程序
	var DRAW_BGM = '/resources/empty.mp3';
	var stateIsInSpeech = false;
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
				stateIsInSpeech = true;
			} else {
				stateIsInSpeech = false;
			}
		}
	}];

	var registerSocket = [{
		event: "startDraw",
		func: function() {
			if (!stateIsInSpeech) throw new Exception("Not in speech mode");
			drawRegister();
			return true;
		}
	}, {
		event: "stopDraw",
		func: function() {
			if (!stateIsInSpeech) throw new Exception("Not in speech mode");
			drawClear();
			return true;
		}
	}, {
		event: "refreshDraw",
		func: function() {
			console.log("aaa");
			drawInit();
			return true;
		}
	}, {
		event: "startLoop",
		func: function(data) {
			if (!stateIsInSpeech) throw new Exception("Not in speech mode");
			loopInit(data.param);
			return true;
		}
	}, {
		event: "stopLoop",
		func: function() {
			if (!stateIsInSpeech) throw new Exception("Not in speech mode");
			loopStop();
			return true;
		}
	}, {
		event: "toSpeech",
		func: function() {
			var lastProgram = this.programs.length - 1;
			if (!this.programs[lastProgram].isDraw) {
				this.programs.push({
					bgm: [DRAW_BGM],
					display: [{
						type: "custom",
						custom: function(dom) {
							dom.attr("id", "dom-speech").css("background-color", "#333");
						}
					}],
					id: lastProgram,
					player: {
						class: "让我们开始吧",
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
			drawInit();
			this.toProgram(lastProgram);
			return true;
		},
	}];



	var buildDraw = function() {

		var object = this;
		$("#dom-speech").html((function() {
			return '<div class="inner"><h1 class="dom-playing-name title-name cover-heading" id="drawLabel">抽签</h1><code class="lead dom-playing-player title-player yahei-font" id="timeRemain">见证奇迹的时刻</code></div>';
		})());
	};


	// draw means 抽签
	// not 绘画
	var drawInterval = 0; // 抽签闪现计时器
	var drawList = [];
	var drawLength = 0;
	var drawIndex = 0;

	var drawInit = function() {
		drawList = $.extend([], config.extensions.draw.list);
		drawLength = drawList.length;
		drawIndex = 0;
		$("#drawLabel").text("抽签");
	};
	var drawClear = function() {
		drawList.splice(drawIndex, 1);
		drawLength--;
		clearInterval(drawInterval);
	};
	var drawRegister = function() {
		drawInterval = setInterval(drawFunction, config.extensions.draw.drawInterval);
	};
	var drawFunction = function() {
		drawIndex++;
		drawIndex %= drawLength;
		$("#drawLabel").text(drawList[drawIndex]);
	};

	var loopRemainTime = 0;
	var loopInterval = 0;
	var loopInit = function(data) {
		loopRemainTime = data.time;
		loopRegister();
	};
	var loopRegister = function() {
		loopInterval = setInterval(loopFunction, 1000); // 1000 means 1 sec.
	};
	var loopFunction = function() {
		$("#timeRemain").text(--loopRemainTime);
		if (loopRemainTime === 0) {
			clearInterval(loopInterval);
		}
	};
	var loopStop = function() {
		clearInterval(loopInterval);
	};

});