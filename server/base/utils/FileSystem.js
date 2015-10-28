var fs = require("fs");
var path = require('path');
var loggerUtils = require('./Logger.js');

var _logger = loggerUtils.Logger(true);

function _getPath(file) {
	return path.join(__dirname, file);
}

function _existsFilePath(filePath) {
	var exists = false;

	try {
		if(fs.existsSync(filePath))
			exists = true;
		else 
			_logger.error("Error: file '"+filePath+"' don't exists");
	}
	catch(err) {
		_logger.error("Error in 'existsFilePath'");
	}

	return exists;
}

function _getResponseExtension(responseType) {
	var responseExtension = "";
	switch(responseType) {
		case 'JSON':
			responseExtension = ".json";
			break;
		case 'XML':
			responseExtension = ".xml";
			break;
	}
	return responseExtension;
}

function _parseResponseFile(response, responseType) {
	switch(responseType) {
		case 'JSON':
			response = JSON.parse(response);
			break;
	}
	return response;
}

exports.getRequestEndpointPath = function(serverPath, serverFile) {
	var file = "../../"+serverPath+"/"+serverFile+".js"

	return _getPath(file);
}

exports.existsEndpointPath = function(path) {
	return _existsFilePath(path);
}

exports.loadResponseFile = function(responsePath, responseFile, responseType) {
	var responseExtension = _getResponseExtension(responseType);
	var file = "../../"+responsePath+"/"+responseFile+responseExtension;
	var response = "";
	var filePath = _getPath(file);

	try {
		if(_existsFilePath(filePath)) {
			response = fs.readFileSync(filePath, 'utf8');
			if(response == "") {
				_logger.warning("File '"+filePath+"' is empty");
			}
		}
	}
	catch(err) {
		_logger.error("Error in fileSystem");
	}

	return _parseResponseFile(response, responseType);
}