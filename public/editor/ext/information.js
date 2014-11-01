define(function(require, exports, module) {
	
	module.exports = {
		init: function() {
			this.register(registerFunction);
			this.registerSubmit(registerSubmitFunction)
		}
	};

	var registerFunction = [
		{
			event: "toProgram",
			func: function() {
				buildInfo.apply(this, arguments);		
			}
		}
	];

	var registerSubmitFunction = [
		{
			event: "program-info",
			func: function(object) {
				
			}
		}
	];

	var buildInfo = function(id) {
		var program = this.programs[id];
		$("#program-id").val(program.id);
		$("#program-name").val(program.program.name);
		$("#program-player-name").val(program.player.name);
		$("#program-player-class").val(program.player.class);
		$("#program-player-doom").val(program.player.doom);
	}


});