var fileSystemUtils = require('../../_utils/FileSystem.js');
var loggerUtils = require('../../_utils/Logger.js');
var bodyParser = require("body-parser");

var _response;
var _logger;


var code;
var data;
var error;
var errorMessage;

//constructor
function Response(res) {
	_logger = loggerUtils.Logger(true);

	if(res != undefined) {
		_response = res;
	}
	else {
		_logger.error("Response can't be created, 'res' parameter is undefined");
	}
}

function _addHeader(key, value) {
	_logger.log("header added: key=["+key+"] value=["+value+"]");
	_response.setHeader(key, value);
}

function _setHeaders(type) {
	_addHeader('Accept-Encoding', 'gzip, deflate');

	switch(type) {
		case 'JSON':
			_addHeader('Content-Type', 'application/json');
			break;
		case 'XML':
			_addHeader('Content-Type', 'application/xml');
			break;
	}
}


//class methods
Response.prototype = {
	setCode: function(code){
		this.code = code;
	},
	setData: function(data){
		this.data = data;
	},
	setError: function(error){
		this.error = error;
	},
	setErrorMessage: function(errorMessage){
		this.errorMessage = errorMessage;
	},

	setHeaders: function(type) {
		_setHeaders(type);
	},
	addHeader: function(key, value) {
		_addHeader(key, value);
	},

	loadFromFile: function(path, file, type) {
		var data = fileSystemUtils.loadResponseFile(path, file, type);
		setData(data); 
		return this;
	},

	print: function(){
		return JSON.stringify(this);
	}

}

exports.Response = function(req) {
	return new Response(req);
}
