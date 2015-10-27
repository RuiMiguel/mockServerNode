var fileSystemUtils = require('../utils/FileSystem.js');
var loggerUtils = require('./utils/Logger.js');
var bodyParser = require("body-parser");

var _response;
var _logger;


var code;
var data;
var error;
var errorMessage;

//constructor
function Response(res) {
	_response = res;
	_logger = loggerUtils.Logger();
}

function _addHeader(key, value) {
	_logger.log("added header: key="+key+" value="+value);
	_response.setHeader(key, value);
}

function _setHeaders(type) {
	_addHeader('Accept-Encoding', 'gzip, deflate');

	switch(responseType) {
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

exports.Response = function() {
	return new Response();
}
