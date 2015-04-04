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

			require('ext/barrage'),
			require('ext/draw'),


			require('ext/nwjs')

		];

	window.Exception = function(errorMessage, data) {
		this.data = data;
		this.errorMessage = errorMessage;
		this.toString = function() {
			return "Error: " + errorMessage + "\n\n" + (typeof data == "object" ? JSON.stringify(data) : data.toString());
		};
	};

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