var loggerUtils = require('../../_utils/Logger.js');

var _logger = loggerUtils.Logger(true);

//constructor
function Request(req) {
	if(req != undefined) {
		this._request = req;
	}
	else {
		_logger.error("Request can't be created, 'req' parameter is undefined");
	}
}

function _getListElements(list, key) {
	var value;
	for(elem in list) {
		if(elem == key) value = list[elem];
  	}  	
  	return value;
}

function _getHeaderValue(key) {
	var paramValue = "";
	if(this._request != undefined) {
		paramValue = _getListElements(this._request.headers, key);
	}
	else {
		_logger.error("can not call '_getHeaderValue', '_request' undefined");
	}

	return paramValue;
}

function _getBodyParam(key) {
	var paramValue = "";
	if(this._request != undefined) {
		paramValue = _getListElements(this._request.body, key);
	}
	else {
		_logger.error("can not call '_getBodyParam', '_request' undefined");
	}

	return paramValue;
}

function _getQueryParam(key) {
	var paramValue = "";
	if(this._request != undefined) {
		paramValue = _getListElements(this._request.query, key);
	}
	else {
		_logger.error("can not call '_getQueryParam', '_request' undefined");
	}
	return paramValue;
}

function _showListElements(list) {
	for(elem in list) {
		_logger.log("** "+elem+": "+list[elem]);
  	}
}

function _showAllHeaders() {
	if(this._request != undefined) {
		_logger.log("headers");
		_showListElements(this._request.headers);
	}
	else {
		_logger.error("can not call '_showAllHeaders', '_request' undefined");
	}
}

function _showBodyParams() {
	if(this._request != undefined) {
		_logger.log("body params");
		_showListElements(this._request.body);
	}
	else {
		_logger.error("can not call '_showBodyParams', '_request' undefined");
	}
}

function _showQueryParams() {
	if(this._request != undefined) {
		_logger.log("query params");
		_showListElements(this._request.query);
	}
	else {
		_logger.error("can not call '_showQueryParams', '_request' undefined");
	}
}


//class methods
Request.prototype = {
	getHeaderValue: function(key){
		return _getHeaderValue.call(this, key);
	},
	getBodyParam: function(key){
		return _getBodyParam.call(this, key);
	},
	getQueryParam: function(key) {
		return _getQueryParam.call(this, key);
	},
	showAllHeaders: function() {
		return _showAllHeaders.call(this);
	},
	showAllBodyParams: function() {
		return _showBodyParams.call(this);
	},
	showAllQueryParams: function() {
		return _showQueryParams.call(this);
	}
}

exports.Request = function(req) {
	return new Request(req);
}