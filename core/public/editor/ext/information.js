define(function(require, exports, module) {

	module.exports = {
		init: function() {
			this.register(registerFunction);
			this.registerSubmit(registerSubmitFunction)
		}
	};

	var registerFunction = [{
		event: "toProgram",
		func: function() {
			buildInfo.apply(this, arguments);
		}
	}];

	var registerSubmitFunction = [{
		event: "program-info",
		func: function(object) {
			submitForm.apply(this, arguments);

		}
	}];


	var buildInfo = function(id) {
		var program = this.programs[id];
		$("#program-id").val(program.id);
		$("#program-sort").val(program.sort);
		$("#program-name").val(program.program.name);
		$("#program-player-name").val(program.player.name);
		$("#program-player-class").val(program.player.class);
		$("#program-player-doom").val(program.player.doom);
	}

	var submitForm = function(object) {
		var me = this,
			ary = (function(ary) {
				var ret = {};
				$.each(ary, function(i, v) {
					ret[v.name] = v.value;
				});
				return ret;
			})($(object).serializeArray()),
			player = {},
			program = {};

		//ary["program-id"];
		player['name'] = ary["program-player-name"];
		player['class'] = ary["program-player-class"];
		player['doom'] = ary["program-player-doom"];
		this.program.id = parseInt(ary['program-id']);
		this.program.sort = parseInt(ary['program-sort']);
		this.program.program.name = ary['program-name'];

		this.program.player = player;
		this.programs[this.programIndex] = $.extend({}, this.program);
		this.submitPrograms();

	}


});