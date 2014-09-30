define(function(require, exports, module) {


	var $ = require('jquery'),
		program = require('screen/program');

	window.$ = $;
	window.jQuery = $;

	var plugins = [

		require('ext/dombuilder'),
		require('ext/slide'),
		require('ext/bgm'),
		require('ext/timeupdate'),

		require('ext/runjs'),
		require('ext/init'),

		require('ext/highcharts'),
		
	]

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