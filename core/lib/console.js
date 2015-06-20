exports = module.exports = console;
var	richConsole = require('rich-console');
var colorArray = {
	success: ['green', 'Success'],
	info: ['yellow', 'Info'],
	error: ['red', 'Error'],
};

for (var index in colorArray) {
	var item = colorArray[index];
	exports[index] = (function(index) {
		var str = "<" + colorArray[index][0] + ">" + colorArray[index][1] + "</" + colorArray[index][0] + "> - ";
		return function() {
			arguments[0] = str + arguments[0];
			richConsole.log.apply(this, arguments);
		}
	})(index);
}