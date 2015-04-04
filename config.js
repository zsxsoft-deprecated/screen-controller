module.exports = {
	"lang": "zh-cn",
	"data": "./data.json",
	"webServer":{
		"port": 3000,
		"staticFolder": "core/public",
		"htmlFolder": "core/views",
		"routeFolder": "core/routes",
		"dynamicFolder": "core/dynamic",
		"resourceFolder": "resources"
	},
	"program": {
		"fadeTimeout": 800
	},
	"extensions": {
		"draw": {
			"list": ["D1", "D2", "D3", "D4", "D5", "D6"]
		},
		/*"barrage": {
			"wsUrl": "http://127.0.0.1:4000",
			"password": "123456",
			"room": "default"
		}*/
	}
}
