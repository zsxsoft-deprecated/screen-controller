var GLOBAL = {
	'name': 'Screen',
};

exports.config = {};

exports.index = function(req, res){
	res.render('index', {title: '首页', G: GLOBAL});
};

exports.screen = function(req, res){
	res.render('screen', {
		title: '屏幕',
		config: exports.config,
		_GLOBAL: GLOBAL
	});
};


exports.client = function(req, res){
	res.render('client', {
		title: '客户端',
		config: exports.config,
		_GLOBAL: GLOBAL
	});
};

exports.client_min = function(req, res){
	res.render('client-min', {
		title: '客户端',
		config: exports.config,
		_GLOBAL: GLOBAL
	});
};


exports.edit = function(req, res){
	res.render('edit_desc',{
	});
}