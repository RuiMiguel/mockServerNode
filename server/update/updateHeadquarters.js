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
	helpMessage += "\n body params: 'token'";
	return helpMessage;
}

function _createEndpoints(app) {
	baseServer.call(app, serverEndpoint, method, responseType, function (request) {			  	
	  	var response;
		
	  	var token = baseServer.getBodyParam(request, "token");
		if(token != undefined) {
			var index = baseServer.getBodyParam(request, "page");
			var file = responseFile;
			if(index != undefined) {
				file = responseFile+index;
			}

			response = baseServer.loadResponseFile(responsePath, file, responseType);	
		}
		else {
			response = {
				"code": 1,
				"error": "'token' is empty"
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