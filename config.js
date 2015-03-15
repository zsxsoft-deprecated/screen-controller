exports.config = {
	"lang": "zh-cn",
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
			"wsUrl": "http://127.0.0.1:3000",
			"password": "123456"
		}
	}
}
