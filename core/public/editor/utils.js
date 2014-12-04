define(function(require, exports, module) {

	exports.formatJSON = function (data) {
		var indentChar = "\t",
			ret = [],
			lineSplit = "\n";

		var format = function(name, value, isLast, indent, isObj) {
			for (var i = 0, tab = ''; i < indent; i++) tab += indentChar;
			if (!value) {

			}
			else if (value.constructor == Array) {
				ret.push(tab + (isObj ? ('"' + name + '": ') : '') + '[' + lineSplit);
				for (var i = 0; i < value.length; i++) {
					format(i, value[i], i == value.length - 1, indent + 1, false);
				}
				ret.push(tab + ']' + (isLast ? '' : ',') + lineSplit);
			}
			else if (typeof value == "object") {
				ret.push(tab + (isObj ? ('"' + name + '": ') : '') + '{' + lineSplit);
				var objLength = 0, i = 0;
				for (var key in value) objLength++;
				for (var key in value) {
					format(key, value[key], ++i == objLength, indent + 1, true);
				}
				ret.push(tab + '}' + (isLast ? '' : ',') + lineSplit);
			}
			else {
				ret.push(tab + (isObj? ( '"' + name + '": ') : ''));
				if (typeof value == 'string') value = '"' + value.replace('/"/g', '\\"') + '"';
				ret.push(value);
				ret.push((isLast ? '' : ',') + lineSplit);   
			}
		}
		format('', data, true, 0, false);
		return ret.join("");
	}
	

})