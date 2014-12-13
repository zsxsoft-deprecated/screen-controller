define(function(require, exports, module) {
	
	var HIGHCHARTS_BGM = '/multimedia/empty.mp3';
	module.exports = {
		init: function() {
			this.register(registerFunction);
			this.registerSocket(registerSocket);
		}
	};


	var registerFunction = [
		{
			event: "toggleSlide",
			func: function(argu) {			
				if (this.program.ishighcharts) {
					drawChart.apply(this);
				}
			}
		}
	];

	var registerSocket = [
		{
			event: "toScore",
			func: function() {
				var lastProgram = this.programs.length - 1;
				if (!this.programs[lastProgram].ishighcharts) {
					this.programs.push({
						bgm: [HIGHCHARTS_BGM],
						display: [
							{
								display_type: "full-screen",
								type: "custom",
								custom: function(dom) {
									dom.attr("id", "dom-score").css("background-color", "#333");
								}
							}
						],
						id: lastProgram,
						player: {
							class: "精彩正在呈现",
							doom: "",
							name: ""
						},
						player_class: "精彩正在呈现",
						player_name: "",
						program: {
							name: "排名展示"
						},
						program_name: "排名展示",
						score: [0],
						ishighcharts: true
					});
					lastProgram++;	
				}

				this.toProgram(lastProgram);
				return true;
			} 
		}
	];



	var drawChart = function(){

		var object = this;

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
				text: '',//'<%= title %>',
				style: {
					color: '#FFFFFF'
				}
		
			},
			xAxis: {
				categories: function() {
					var a = [];
					for (var i = 0; i <= object.programs.length - 1; i++) {
						a.push(object.programs[i].player.class)
					}
					return a;
				}(),
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
			series: buildSeries.call(object),
			credits: {
				enabled: false
			},
		});

		$(function(){
			var o = $('#dom-score').highcharts();
			for(var i = 0; i < o.series.length; i++) {
				for (var j = 0; j < object.programs.length - 1; j++) {
					o.series[i].data[j].update(parseFloat(object.programs[j].score[i]));
				}
			}
			o.redraw();
		});
	}


	var buildSeries = function(){
		var 
			series = [],
			series_name = this.programs[0].score,
			object = this;
		
		for(var i = 0; i < series_name.length; i++) {
			series.push({
				name: series_name[i],
				data: (function(){
					var scores = [];
					for(var i = 0; i < object.programs.length - 1; i++) scores.push(0);
					return scores;
				})()
			});
		}
		
		return series;

	}
});