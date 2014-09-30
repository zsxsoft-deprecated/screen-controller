define(function(require, exports, module) {


	var program = require('screen/program'),
		plugins = [

			require('ext/dombuilder'),
			require('ext/slide'),
			require('ext/bgm'),
			require('ext/timeupdate'),

			require('ext/runjs'),
			require('ext/init'),

			require('ext/highcharts'),
			
		];

	$(function() {

		window.program = program;

		program.objects.player = $("#dom-background-audio");
		program.init({
			socket: location.origin
		});

		$.each(plugins, function(i, v) {
			v.init(program);
		});

		// debug
		
	});


});