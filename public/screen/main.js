define(function(require, exports, module) {


	var $ = require('jquery'),
		program = require('screen/program');

	var plugins = [

		require('ext/dombuilder'),
		require('ext/slide'),
		require('ext/bgm'),
		require('ext/timeupdate'),

		require('ext/runjs'),
		require('ext/init')
		
	]

	$(function() {
		program.objects.player = $("#dom-background-audio");
		program.init({
			socket: location.origin
		});

		$.each(plugins, function(i, v) {
			v.init(program);
		});

		// debug
		window.program = program;
	});


});