exports.config = {};
exports.lang = {};

exports.index = function(req, res) {
	res.render('index', {
		title: 'INDEX',
		lang: exports.lang
	});
};

exports.screen = function(req, res) {
	res.render('screen', {
		title: exports.lang.global.screen,
		config: exports.config,
		lang: exports.lang
	});
};


exports.controller = function(req, res) {
	res.render('controller', {
		http: {
			get: req.query
		},
		title: exports.lang.global.controller,
		config: exports.config,
		lang: exports.lang,
	});
};


exports.editor = function(req, res) {
	res.render('editor', {
		http: {
			get: req.query
		},
		title: exports.lang.global.editor,
		config: exports.config,
		lang: exports.lang
	});
}