define(function(require, exports, module) {


	var editor = require('editor/editor'),
		plugins = [
			require('ext/form'),
			require('ext/submit'),

			require('ext/sidebar'),
			require('ext/information'),
			require('ext/display'),
			require('ext/bgm'),
			require('ext/score')
		];

	editor.utils = require("editor/utils");

	$(function() {
		window.editor = editor;

		editor.init({
			socket: location.origin
		});

		$.each(plugins, function(i, v) {
			v.init.call(editor);
		});

	});


});