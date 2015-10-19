var fileSystemUtils = require('../filesystem.js');
var responseUtils = require('./responseUtils.js');

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
	return helpMessage;
}

exports.init = function(app, options) {
	name = options.name;
	serverFile = options.server.file;
	serverPath = options.server.path;
	serverEndpoint = '/'+options.server.endpoint;
	method = options.method;
	responseFile = options.response.file;
	responsePath = options.response.path;
	responseType = options.response.type;

	switch(method) {
		case 'GET':
			app.get(serverEndpoint, function (req, res) {
			  	console.log(method+' '+serverEndpoint);

				var response = fileSystemUtils.loadResponseFile(responsePath, responseFile, responseType);

		    	responseUtils.setHeaders(res, responseType);
			  	res.send(response);
			});
			break;
		case 'POST':
			app.post(serverEndpoint, function (req, res) {			  	
			  	console.log(method+' '+serverEndpoint);

			  	responseUtils.showParams(req.body);

				var response = fileSystemUtils.loadResponseFile(responsePath, responseFile, responseType);

		    	responseUtils.setHeaders(res, responseType);
			  	res.send(response);
			});
			break;
		case 'PUT':
			app.put(serverEndpoint, function (req, res) {
			  	console.log(method+' '+serverEndpoint);

				var response = "PUT request";

		    	responseUtils.setHeaders(res, responseType);
			  	res.send(response);
			});
			break;			
		case 'DELETE':
			app.delete(serverEndpoint, function (req, res) {
			  	console.log(method+' '+serverEndpoint);

				var response = "DELETE request";

		    	responseUtils.setHeaders(res, responseType);
			  	res.send(response);
			});
			break;
	}	
}

exports.showHelp = function() {
	return _showHelp();
}