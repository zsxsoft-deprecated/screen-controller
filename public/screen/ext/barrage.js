define(function(require, exports, module) {

	var DD = require('./barrage/ddloader'),
		player = new DD.Player("display-data", $("#display-data")[0]);
	player.init("canvas", "fuck");
	player.controlDanmu("play");

	module.exports = {
		init: function() {
			this.registerSocket(resisterSocket);
		},
		DD: DD
	};

	var resisterSocket = [
		{
			event: "barrage", 
			func: function(data) {
				player.parseDanmus(data.data, player);
				player.controlDanmu("update");
			}
		},
		{
			event: "sendBarrage", 
			func: function(data) {
				showSingleBarrage({
					style: "Scroll",
					text: data.barrage,
					color: "red",
					lifeTime: 10 * 60
				});
			}
		}
	];


	var showSingleBarrage = function(param) {
		player.parseDanmus([{
			'style': param.style, 
			'text': param.text,
			'color': param.color,
			'lifeTime': param.lifeTime
		}], player);
		player.controlDanmu("update");
	}


	// Use for debug
	//window.barrp = player;
	//window.barrage = showNewBarrage;

});