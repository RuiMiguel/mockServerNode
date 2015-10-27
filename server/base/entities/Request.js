var fileSystemUtils = require('../utils/FileSystem.js');
var loggerUtils = require('./utils/Logger.js');
var bodyParser = require("body-parser");

var _request;
var _logger;

//constructor
function Request(req) {
	_request = req;
	_logger = loggerUtils.Logger();
}

function _getListElements(list, key) {
	var value;
	for(elem in list) {
		if(elem == key) value = list[elem];
  	}  	
  	return value;
}

function _getHeaderValue(key) {
	return _getListElements(_request.headers, key);
}

function _getBodyParam(key) {
	return _getListElements(_request.body, key);
}

function _getQueryParam(key) {
	return _getListElements(_request.query, key);
}

function _showListElements(list) {
	for(elem in list) {
		_logger.log(elem+": "+list[elem]);
  	}
}

function _showAllHeaders() {
	_logger.log("headers");
	_showListElements(_request.headers);
}

function _showBodyParams() {
	_logger.log("body params");
	_showListElements(_request.body);
}

function _showQueryParams() {
	_logger.log("query params");
	_showListElements(_request.query);
}


//class methods
Request.prototype = {
	getHeaderValue: function(key){
		return _getHeaderValue(key);
	},
	getBodyParam: function(key){
		return _getBodyParam(key);
	},
	getQueryParam: function(key) {
		return _getQueryParam(key);
	},

	showAllHeaders: function() {
		return _showAllHeaders();
	},
	showAllBodyParams: function() {
		return _showBodyParams();
	},
	showAllQueryParams: function() {
		return _showQueryParams();
	}
}

exports.Request = function() {
	return new Request();
}