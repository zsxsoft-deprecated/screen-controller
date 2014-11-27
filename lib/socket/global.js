exports.e = function(io, socket) {
	fetchAllData.call(this, io, socket);
}

var fetchAllData = function(io, socket) {

	var replaceTag = /^data_/,
		jsonTag = /^(\{|\[)[\d\D]+?(\}|\])$/,
		self = this;
	
	socket.on('global', function(data){
		if (data.need == "data") {
			try {
				var data = JSON.parse(require("fs").readFileSync("./data.json", "utf-8"));
				self.console.success(self.lang.console.dataTransfered.replace("%d%", socket.id));
				socket.emit("data", data);
			}
			catch (e) {
				self.console.success(self.lang.console.dataTransferError.replace("%s%", e.toString()));
			}
		}
	});
}
