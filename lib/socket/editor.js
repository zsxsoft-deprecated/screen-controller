exports.e = function(io, socket) {
	var self = this;
	self.console.info(this.lang.console.clientConnected.replace("%c%", this.lang.global.editor).replace("%d%", socket.id));
	socket.join('editor');
	socket.on('editor', function(data) {
		self.createRequest("editor", socket.id, data.id, data.data, function(data) {
			self.console.success(self.lang.console.runSql.replace("%s%", data.data.data));
			try {
				require("fs").writeFileSync("./data.json", JSON.stringify(data.data.data), "utf-8");
			}
			catch (e) {
				self.console.success(self.lang.console.sqlError.replace("%s%", e.toString()));
			}
			self.console.success(self.lang.console.requestFinish.replace("%d%", data.id));
			delete self.queue.queue[data.id];
			io.sockets.to(data.requestId).emit('result', data);

		});	
	});
}