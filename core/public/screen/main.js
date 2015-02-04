define(function(require, exports, module) {


	var program = require('screen/program'),
		plugins = [

			require('ext/program'),
			require('ext/slide'),
			require('ext/bgm'),
			require('ext/time_update'),
			require('ext/send_status'),

			require('ext/runjs'),
			require('ext/init'),

			require('ext/highcharts'),

			require('ext/barrage')

		];

	$(function() {

		window.program = program;

		program.objects.player = $("#dom-background-audio");
		program.init({
			socket: location.origin
		});

		$.each(plugins, function(i, v) {
			v.init.call(program);
		});

		// debug

	});


});