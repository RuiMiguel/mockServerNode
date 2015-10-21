var baseServer = require('../base/server.js');

var name;
var serverFile;
var serverPath;
var serverEndpoint;
var method;
var responseFile;
var responsePath;
var responseType;

function _showHelp() {
	var helpMessage = "*** " + name + ": use " + method + " " + serverEndpoint;
	helpMessage += "\n body params: 'user' & 'password'";
	return helpMessage;
}

function _createEndpoints(app) {
	baseServer.call(app, serverEndpoint, method, responseType, function (request) {			  	
	  	var response;
		
		var user = baseServer.getBodyParam(request, "user");
		var password = baseServer.getBodyParam(request, "password");
		if((user != undefined) && (password != undefined)) {
			response = baseServer.loadResponseFile(responsePath, responseFile, responseType);	
		}
		else {
			response = {
				"code": 1,
				"error": "'user' & 'password' are empty"
			};
		}

	  	return response;
	});
}

exports.init = function(app, options) {
	name = options.name;
	serverPath = options.name;
	serverFile = options.server.endpoint;
	serverEndpoint = options.server.endpoint;
	method = options.server.method;
	responsePath = options.name;
	responseFile = options.server.endpoint;
	responseType = options.response.type;

	_createEndpoints(app);
}

exports.showHelp = function() {
	return _showHelp();
}

exports.name = function() {return name;}
exports.serverFile = serverFile
exports.serverPath = serverPath
exports.serverEndpoint = function() {return serverEndpoint;}
exports.method = method
exports.responseFile = responseFile
exports.responsePath = responsePath
exports.responseType = responseType