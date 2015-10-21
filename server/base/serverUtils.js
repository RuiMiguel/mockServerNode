var express = require('express');
var bodyParser = require("body-parser");
var fileSystemUtils = require('../filesystem.js');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json()); // to support JSON-encoded bodies

var availableEndpoints = new Array();

function _printServerHelp() {
	console.log("*** Print server help");

	var helpResponse = "";
	for(index in availableEndpoints) {
		var serverEndpoint = availableEndpoints[index];

		if(serverEndpoint.showHelp && typeof serverEndpoint.showHelp == 'function') {
			helpResponse += serverEndpoint.showHelp() +"<br/>";
		}
		else {
			console.error("Error: server '%s' doesn't have 'showHelp' method. Please create it!", serverEndpoint);
		}	
	}
		
	return helpResponse;
}

function _showServerHelp() {
	console.log("\n================================================ HELP");
	for(index in availableEndpoints) {
		var serverEndpoint = availableEndpoints[index];

		if(serverEndpoint.showHelp && typeof serverEndpoint.showHelp == 'function') {
			console.log(serverEndpoint.showHelp());
			console.log("-------------------------------------");
		}
		else {
			console.error("Error: server '%s' doesn't have 'showHelp' method. Please create it!", serverEndpoint);
		}		
	}
	console.log("================================================");
}

function _validateServerEndpointConfiguration(options) {
	var validate = true;
		
	if(options == undefined) {
		console.warn("-- server bad configurated, no 'options' setted --");
		validate = false;
	}

	if(options.server == undefined) {
		console.warn("-- server bad configurated, no 'server' field setted --");
		validate = false;
	}
	else {
		if(options.server.method == undefined) {
			console.warn("-- server bad configurated, no 'server.method' value setted --");
			validate = false;
		}
		if(options.server.endpoint == undefined) {
			console.warn("-- server bad configurated, no 'server.endpoint' value setted --");
			validate = false;
		}
	}

	if(options.response == undefined) {
		console.warn("-- server bad configurated, no 'response' field setted --");
		validate = false;
	}
	else {
		if(options.response.type == undefined) {
			console.warn("-- server bad configurated, no 'response.type' value setted --");
			validate = false;
		}
	}

	return validate;
}

function _existsEndpoint(serverName,serverEndpoint) {
	var exists = false;

	for(index in availableEndpoints) {
		var endpoint = availableEndpoints[index];
		if((endpoint.name() == serverName) && (endpoint.serverEndpoint() == serverEndpoint)) exists = true;
	}
	return exists;
}

function _createRootEndpoint() {
	//show root help
	app.get('/', function (req, res) {
		var response = _printServerHelp();
		res.send(response);
	})
}

function _createEndpoint(options) {
	var serverName = options.name;
	var serverEndpoint = options.server.endpoint;

	var requestEndpointPath = fileSystemUtils.getRequestEndpointPath(serverName,serverEndpoint);

	if(fileSystemUtils.existsEndpointPath(requestEndpointPath)) {
		var exists = _existsEndpoint(serverName,serverEndpoint);
		if(!exists) {
			var newServerEndpoint = require(requestEndpointPath);
		
			//init requestCall
			newServerEndpoint.init(app, options);
			availableEndpoints.push(newServerEndpoint);
		}
		else {
			console.warn("-- server '%s%s' yet exists in available endpoints! please review its configuration --", serverName, serverEndpoint);
		}
	}
	else 
		console.error("Error: '%s' can't be created, '%s' don't exists", serverName, requestEndpointPath);
}
 
exports.addServerEndpoint = function(options) {
	if(_validateServerEndpointConfiguration(options)) {
		var serverName = options.name;
		var serverEndpoint = options.server.endpoint;

		console.log("++ request endpoint server '%s%s'", serverName, serverEndpoint);
		_createEndpoint(options);
	}
	else {
		console.warn("-- server bad configurated, not added! please review its configuration --");

		var sampleConfiguration = "{'name': SERVER_NAME,'server': {'method': GET/POST/PUT/DELETE,'endpoint': /ENDPOINT},'response': {'type': RESPONSE_TYPE}";
		console.warn("** %s **\n",sampleConfiguration);
	}
}

exports.launchServer = function(serverName) {
	_createRootEndpoint();

	_showServerHelp();

	//launch server
	var server = app.listen(3000, 'localhost', function () {
		var host = server.address().address;
		var port = server.address().port;

		console.log("\n+++++ " + serverName + " server listening at http://%s:%s +++++\n", host, port);
	})
}