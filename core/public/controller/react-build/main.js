/// <reference path="../../../../typings/react/react.d.ts"/>
/// <reference path="../../../../typings/jquery/jquery.d.ts"/>
/* global program */

define(function (require, exports, module) {
	var self = this;
	self.programs = [];
	self.program = {
		bgm: [],
		display: [],
		id: 0,
		player: {
			class: "",
			doom: "",
			name: ""
		},
		program: {
			name: ""
		},
		score: [0],
		rank: false
	};
	self._queue = {};
	self._queue.data = [];
	self._queue.callback = [];
	self._events = {};
	
	// 模拟EventEmitter
	
	// 绑定事件
	this.bind = this.on = this.addListener = function (interfaceName, callback) {
		if (typeof self._events[interfaceName] == 'undefined') self._events[interfaceName] = [];
		self._events[interfaceName].push(callback);
		return self;
	};
	
	// 呼叫事件
	this.emit = function (interfaceName) {
		var argu = self.$.extend([], arguments);
		argu.shift();
		self._events[interfaceName].forEach(function (callback) {
			callback.apply(self, argu);
		})
		return self;
	};


	window.Exception = function (errorMessage, data) {
		this.data = data;
		this.errorMessage = errorMessage;
		this.toString = function () {
			var objectString = "";
			if (typeof data == "object") {
				objectString = JSON.stringify(data);
			} else if (typeof data == "undefined" || typeof data.toString == "undefined") {
				objectString = "";
			} else {
				objectString = data.toString();
			}
			return "Error: " + errorMessage + "\n\n" + objectString;
		};
	};
	
	var Controller = React.createClass({displayName: "Controller",
		render: function () {
			return React.createElement.apply(this, elementChilds);
		}
	});
	
	var plugins = [
		require('./socket'),
		require('./program_info'),
		require('./program_switch')
	];

	var elementChilds = [];
	$.each(plugins, function (i, v) {
		var ret = v.init.call(self);
		if (typeof ret.reactDom != "undefined") {
			elementChilds.push(ret.reactDom);
		}	
	});
	elementChilds.splice(0, 0, "ReactBootstrap.Accordion", null);

	this.reactRender = React.render(React.createElement(Controller, {programs: self.programs, program: self.program}), document.getElementById("controller-main"));
});