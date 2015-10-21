var serverName = "Demo";
var serverUtils = require('./server/base/serverUtils.js')

//declare all request calls to mockserver here
addServerEndpoints();
serverUtils.launchServer(serverName);

function addServerEndpoints() {
	//do login
	serverUtils.addServerEndpoint({
		"name": "login",
		"method": "POST",
		"response": {
			"file": "login",
			"path": "login",
			"type": "JSON"
		}
	});

/*
	//update headquarters
	serverUtils.addServerEndpoint({
		"name": "update",
		"server": {
			"path": "update",
			"file": "update",
			"endpoint": "updateHeadquarters"
		},
		"method": "GET",
		"response": {
			"path": "update",
			"file": "updateHeadquarters",
			"type": "JSON"
		}
	});
	*/

	//update employees
	serverUtils.addServerEndpoint({
		"name": "update",
		"server": {
			"path": "update",
			"file": "update",
			"endpoint": "updateEmployees"
		},
		"method": "GET",
		"response": {
			"path": "update",
			"file": "updateEmployees",
			"type": "JSON"
		}
	});
}