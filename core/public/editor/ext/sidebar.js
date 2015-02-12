define(function(require, exports, module) {

	module.exports = {
		init: function() {
			this.register(registerFunction);
		}
	};

	var registerFunction = [{
		event: "toProgram",
		func: function() {
			buildSidebar.apply(this, arguments);
		}
	}];

	var buildSidebar = function(highlightId) {
		var programs = this.programs,
			dom = $("#sidebar").html(""),
			dataBind = dom.data("bind");
		programs.sort(function(a, b) {
			return parseInt(a.sort) - parseInt(b.sort);
		});
		if (dataBind != "bind") bindSideBar.call(this, dom);
		console.log(programs);
		$.each(programs, function(i, v) {
			$("<a>").data("id", v.id)
				.data("aryId", i)
				.attr("href", "#")
				.html(v.program.name)
				.appendTo($("<li>").addClass("item " + (highlightId == i ? "active" : "")).appendTo(dom));
		});

		$("<li>").addClass("item item-add").append($("<a>").html("Add..").attr("href", "#")).appendTo(dom);
	}

	var bindSideBar = function(dom) {
		var me = this;
		dom.on('click', '.item', function() {
			var $a = $(this).children("a");
			if ($(this).hasClass("item-add")) {
				var copyArr = $.extend({}, me.programs[0]);
				var ubPtr = me.programs.length;
				me.programs.push(copyArr);
				me.programs[ubPtr].sort = 32767;
				me.programs[ubPtr].id = parseInt(me.programs[ubPtr - 1].id) + 1;
				me.toProgram(ubPtr);
			} else {
				me.toProgram($a.data("aryId"));
			}
		}).data("bind", "bind");
	}



});