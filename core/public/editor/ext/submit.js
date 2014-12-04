define(function(require, exports, module) {
	
	var origProgramId = 0; // log orig id

	module.exports = {
		init: function() {
			this.register(registerFunction);
		}
	};

	var registerFunction = [
		{
			event: "submitPrograms",
			func: function() {
				submitPrograms.apply(this, arguments);		
			}
		},
		{
			event: "toProgram",
			func: function() {
				rebuildOrigProgramId.apply(this, arguments);		
			}
		}
	];

	var rebuildOrigProgramId = function() {
		if (origProgramId == 0) return;
		for (var i = 0; i < this.programs.length; i++) {
			if (this.programs[i].id == origProgramId) {
				this.programIndex = i;
				origProgramId = this.programs[i].id;
				console.log(this.programIndex);
				break;
			}
		}
	}

	var submitPrograms = function() {
		var self = this;
		origProgramId = this.programs[this.programIndex].id;
		console.log(this.programIndex);
		console.log(this.programs);
		$('#modalMsg').find(".modal-body").html("Submitting..");
		$('#modalMsg').modal();
		this.sendRequest({
			method: "editData", 
			data: this.programs
		}, function() {
			$('#modalMsg').modal('hide');
			self.socket.emit('global', {need: "data"});
		});
	}


});