var serverName = "Demo";
var serverUtils = require('./server/base/serverUtils.js')

//declare all request calls to mockserver here
addServerEndpoints();
serverUtils.launchServer(serverName);

function addServerEndpoints() {
	serverUtils.addServerEndpoint({
		"name": "login",
		"method": "POST",
		"response": {
			"file": "login",
			"path": "login",
			"type": "JSON"
		}
	});
	serverUtils.addServerEndpoint({
		"name": "update",
		"server": {
			"file": "update",
			"path": "update",
			"endpoint": "update"
		},
		"method": "POST",
		"response": {
			"file": "update",
			"path": "update",
			"type": "JSON"
		}
	});
}