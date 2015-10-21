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
	helpMessage += "\n body params: 'user' & 'password'";
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
			  	console.log("\n"+method+" "+serverEndpoint);
			  	
			  	var response;

			  	requestUtils.showBodyParams(req);
			  	var user = requestUtils.getBodyParam(req, "user");
				var password = requestUtils.getBodyParam(req, "password");
				if((user != undefined) && (password != undefined)) {
					response = fileSystemUtils.loadResponseFile(responsePath, responseFile, responseType);	
				}
				else {
					response = {
						"code": 1,
						"error": "'user' & 'password' are empty"
					};
				}

				responseUtils.setHeaders(res, responseType);
			  	res.send(response);
			});
			break;
	}	
}

exports.showHelp = function() {
	return _showHelp();
}