exports.e = function(io, socket) {
	fetchAllData.call(this, io, socket);
}

var fetchAllData = function(io, socket) {

	var self = this;

	socket.on('global', function(data) {
		if (data.need == "data") {
			try {
				var jsonData = JSON.parse(require("fs").readFileSync(self.config.data, "utf-8"));
				self.console.success(self.lang.console.dataTransfered.replace("%d%", socket.id));
				socket.emit("data", jsonData);
			} catch (e) {
				self.console.success(self.lang.console.dataTransferError.replace("%s%", e.toString()));
			}
		}
	});
}