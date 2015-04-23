define(function(require, exports, module) {

	var HIGHCHARTS_BGM = '/resources/empty.mp3';
	module.exports = {
		init: function() {
			this.register(registerFunction);
			this.registerSocket(registerSocket);
		}
	};


	var registerFunction = [{
		event: "toggleSlide",
		func: function(argu) {
			if (this.program.ishighcharts) {
				drawChart.apply(this);
			}
		}
	}];

	var registerSocket = [{
		event: "toScore",
		func: function() {
			var lastProgram = this.programs.length - 1;
			if (!this.programs[lastProgram].ishighcharts) {
				this.programs.push({
					bgm: [HIGHCHARTS_BGM],
					display: [{
						type: "custom",
						custom: function(dom) {
							dom.attr("id", "dom-score").css("background-color", "#333");
						}
					}],
					id: lastProgram,
					player: {
						class: "精彩正在呈现",
						doom: "",
						name: ""
					},
					program: {
						name: "排名展示"
					},
					score: [0],
					ishighcharts: true,
					rank: false
				});
				lastProgram++;
			}

			this.toProgram(lastProgram);
			return true;
		}
	}];



	var drawChart = function() {

		var object = this;
		var rankList = [];

		object.programs.forEach(function(el) {
			if (el.rank !== false) {
				rankList.push(el);
			}
		})
		rankList.sort(function(a, b) {
			var scoreA = 0;
			var scoreB = 0;
			var sortFunction = function(element) {
				var sum = 0;
				element.forEach(function(score) {
					sum += score;
				});
				return sum;
			};
			scoreA = sortFunction(a.score);
			scoreB = sortFunction(b.score);
			return scoreB - scoreA;
		});


		$('#dom-score').highcharts({
			chart: {
				type: 'column',
				backgroundColor: '#333',
				height: 1000,
				animation: {
					duration: 5000
				}
			},
			colors: [
				'#CFF700',
				'#3CA0D0',
				'#6BEC3B',
				'#FF5A40'
			],
			title: {
				text: '', //'<%= title %>',
				style: {
					color: '#FFFFFF'
				}

			},
			xAxis: {
				categories: (function() {
					var a = [];
					rankList.forEach(function(object) {
						a.push(object.player.name);
					});
					return a;
				})(),
				labels: {
					style: {
						"font-family": "微软雅黑",
						"font-size": "30px",
						"color": "white",
						"line-height": "30px"
					},
					y: 45,
					rotation: -45,
					x: 30
				},
			},
			yAxis: {
				min: 0,
				title: {
					text: ''
				}
			},
			legend: {
				enabled: false,
				backgroundColor: '#FFFFFF',
				reversed: true,
				layout: 'horizontal'
			},
			plotOptions: {
				series: {
					stacking: 'normal'
				}
			},
			series: (function() {
				var	series = [];
				var seriesName = rankList[0].score;
				for (var i = 0; i < seriesName.length; i++) {
					series.push({
						name: seriesName[i],
						data: (function() {
							var scores = [];
							rankList.forEach(function() {
								scores.push(0);
							})
							return scores;
						})()
					});
				}
				return series;
			})(),
			credits: {
				enabled: false
			},
		});

		$(function() {
			var o = $('#dom-score').highcharts();
			for (var i = 0; i < o.series.length; i++) {
				var index = -1;
				rankList.forEach(function(object) {
					o.series[i].data[++index].update(parseFloat(object.score[i]));
				});
			}
			o.redraw();
		});
	}

});