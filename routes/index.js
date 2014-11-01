var GLOBAL = {
	footer: {
		left: "This project created by zsx.",
		right: 'GitHub: zsxsoft'
	}
};

exports.config = {};

exports.index = function(req, res){
	res.render('index', {
		title: 'INDEX', 
		global: GLOBAL
	});
};

exports.screen = function(req, res){
	res.render('screen', {
		title: 'SCREEN',
		config: exports.config,
		global: GLOBAL
	});
};


exports.controller = function(req, res){
	res.render('controller', {
		http: {
			get: req.query
		},
		title: 'CONTROLLER',
		config: exports.config,
		global: GLOBAL,
	});
};


exports.editor = function(req, res){
	res.render('editor',{
		http: {
			get: req.query
		},
		title: 'EDITOR',
		config: exports.config,
		global: GLOBAL
	});
}