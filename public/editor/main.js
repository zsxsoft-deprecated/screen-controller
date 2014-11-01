define(function(require, exports, module) {

	var editor = require('editor/editor'),
		plugins = [
			require('ext/sidebar')
		];

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