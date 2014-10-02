define(function(require, exports, module) {
	
	var HIGHCHARTS_BGM = '/multimedia/empty.mp3';
	module.exports = {
		init: function(object) {
			object.register(register_function);
			object.registerSocket(register_socket);
		}
	};


	var register_function = [
		{
			event: "toggleSlide",
			func: function(object, argu) {			
				if (object.program.ishighcharts) {
					draw_chart(object);
				}
			}
		}
	];

	var register_socket = [
		{
			event: "toScore",
			func: function(object) {

				var last_program = object.programs.length - 1;

				if (!object.programs[last_program].ishighcharts) {
					object.programs.push({
						bgm: [HIGHCHARTS_BGM],
						display: [
							{
								display_type: "full-screen",
								type: "custom",
								custom: function(object, dom) {
									dom.attr("id", "dom-score").css("background-color", "#333");
								}
							}
						],
						id: last_program,
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
					last_program++;	
				}

				object.toProgram(last_program);
				return true;
			} 
		}
	];



	var draw_chart = function(object){


		$('#dom-score').highcharts({
			chart: {
				type: 'column',
				backgroundColor: '#333',
				height: 900,
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
				backgroundColor: '#FFFFFF',
				reversed: true,
				layout: 'horizontal'
			},
			plotOptions: {
				series: {
					stacking: 'normal'	
				}
			},
			series: build_series(object),
			credits: {
				enabled: false
			}
		});

		$(function(){
			var o = $('#dom-score').highcharts();
			for(var i = 0;i < o.series.length; i++)
			{
				for (var j = 0; j < object.programs.length; j++) {
					o.series[i].data[j].update(parseFloat(object.programs[j].score[i]));
				}						
			}
			o.redraw();
		});
	}


	var build_series = function(object){
		series = [];
		series_name = [''];
		
		for(var i = 0; i < series_name.length; i++)
		{
			series.push({
				name: series_name[i],
				data: (function(){
					var scores = [];
					for(var i = 0; i < object.programs.length; i++) scores.push(0);
					return scores;
				})()
			});
		}
		
		return series;

	}
});