exports.config = {
	"lang": "en",
	"data": "./data.json",
	"webServer":{
		"port": 3000,
		"staticFolder": "core/public",
		"htmlFolder": "core/views",
		"serverFolder": "core/routes",
		"resourceFolder": "resources"
	},
	"extensions": {
		"barrage": {
			"wsUrl": "http://dmserver.duapp.com/"
		}
	}
}
