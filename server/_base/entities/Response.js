var FileSystemUtils = require('../../_utils/FileSystem.js');
var LoggerUtils = require('../../_utils/Logger.js');

var _logger = LoggerUtils.Logger(true);

//constructor
function Response(res) {
	if(res != undefined) {
		this._response = res;
	}
	else {
		_logger.error("Response can't be created, 'res' parameter is undefined");
	}
}

function _addHeader(key, value) {
	if(this._response != undefined) {
		this._response.setHeader(key, value);		
		_logger.log("header added: key=["+key+"] value=["+value+"]");
	}
	else {
		_logger.error("can not call '_addHeader', '_response' undefined");
	}
}

function _setHeaders(type) {
	_addHeader.call(this, 'Accept-Encoding', 'gzip, deflate');

	switch(type) {
		case 'JSON':
			_addHeader.call(this, 'Content-Type', 'application/json');
			break;
		case 'XML':
			_addHeader.call(this, 'Content-Type', 'application/xml');
			break;
	}
}


//class methods
Response.prototype = {
	setHeaders: function(type) {
		_setHeaders.call(this, type);
	},
	addHeader: function(key, value) {
		_addHeader.call(this, key, value);
	},

	loadFromFile: function(path, file, type) {
		var data = FileSystemUtils.loadResponseFile(path, file, type);
		setData(data); 
		return this;
	},

	print: function(){
		return JSON.stringify(this);
	}
}

exports.Response = function(res) {
	return new Response(res);
}
