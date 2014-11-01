define(function(require, exports, module) {


	var editor = require('editor/editor'),
		plugins = [
			require('ext/form'),
			require('ext/sidebar'),
			require('ext/information'),
			require('ext/display')
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