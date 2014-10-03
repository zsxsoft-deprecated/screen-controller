var GLOBAL = {
	footer: {
		left: "This project created by zsx.",
		right: 'GitHub: zsxsoft'
	}
};

exports.config = {};

exports.index = function(req, res){
	res.render('index', {
		title: 'Index', 
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


exports.edit = function(req, res){
	res.render('edit_desc',{
	});
}