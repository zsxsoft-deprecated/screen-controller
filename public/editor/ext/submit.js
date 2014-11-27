define(function(require, exports, module) {
	
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
		}
	];

	var submitPrograms = function() {
		console.log(this.programs);
		$('#modalMsg').find(".modal-body").html("Submitting..");
		$('#modalMsg').modal();
		this.sendRequest({
			method: "editData", 
			data: this.programs
		}, function() {
			$('#modalMsg').modal('hide');
			this.socket.emit('global', {need: "data"});
		});
	}


});