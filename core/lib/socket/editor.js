exports.e = function(io, socket) {
	var self = this;
	self.console.info(this.lang.console.clientConnected.replace("%c%", this.lang.global.editor).replace("%d%", socket.id));
	socket.on('editor', function(data) {
		self.createRequest("editor", socket.id, data.id, data.data, function(data) {
			var json = JSON.stringify(data.data.data);
			self.console.success(self.lang.console.getModifiedData.replace("%s%", json));
			try {
				require("fs").writeFileSync(self.config.data, json, "utf-8");
			}
			catch (e) {
				self.console.success(self.lang.console.saveFileError.replace("%s%", e.toString()));
			}
			self.console.success(self.lang.console.requestFinish.replace("%d%", data.id));
			delete self.queue.queue[data.id];
			io.sockets.to(data.requestId).emit('result', data);

		});	
	});
}