var serverName = "Demo";
var serverUtils = require('./server/base/serverUtils.js')

//declare all request calls to mockserver here
addServerEndpoints();
serverUtils.launchServer(serverName);

function addServerEndpoints() {
	//do login
	serverUtils.addServerEndpoint({
		"name": "login",
		"server": {
			"method": "POST",	
			"endpoint": "login"
		},
		"response": {
			"type": "JSON"
		}
	});
}