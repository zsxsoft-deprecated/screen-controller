exports["/"] = function(req, res) {
	res.render('index', {
		title: 'INDEX',
		lang: lang
	});
};

exports["/screen"] = function(req, res) {
	res.render('screen', {
		title: lang.global.screen,
		config: config,
		lang: lang
	});
};

exports["/screen_test"] = function(req, res) {
	res.render('test-screen', {
		title: lang.global.screen,
		config: config,
		lang: lang
	});
};

exports["/controller"] = function(req, res) {
	res.render('controller', {
		http: {
			get: req.query
		},
		title: lang.global.controller,
		config: config,
		lang: lang,
	});
};


exports["/editor"] = function(req, res) {
	res.render('editor', {
		http: {
			get: req.query
		},
		title: lang.global.editor,
		config: config,
		lang: lang
	});
}