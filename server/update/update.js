var fileSystemUtils = require('../filesystem.js');
var responseUtils = require('../base/responseUtils.js');
var requestUtils = require('../base/requestUtils.js');

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
		case 'POST':
			app.post(serverEndpoint, function (req, res) {			  	
			  	console.log(method+' '+serverEndpoint);

			  	requestUtils.showBodyParams(req);
			  	var index = requestUtils.getBodyParam(req, "page");
				var response = fileSystemUtils.loadResponseFile(responsePath, responseFile+index, responseType);

				responseUtils.setHeaders(res, responseType);
			  	res.send(response);
			});
			break;
		case 'GET':
			app.post(serverEndpoint, function (req, res) {			  	
			  	console.log(method+' '+serverEndpoint);

				requestUtils.showQueryParams(req);

				var index = requestUtils.getQueryParam(req, "page");
				var response = fileSystemUtils.loadResponseFile(responsePath, responseFile+index, responseType);

				responseUtils.setHeaders(res, responseType);
			  	res.send(response);
			});
			break;
	}	
}

exports.showHelp = function() {
	return _showHelp();
}