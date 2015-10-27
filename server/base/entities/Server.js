var fileSystemUtils = require('../filesystem.js');
var responseUtils = require('./responseUtils.js');
var requestUtils = require('./requestUtils.js');
var responseModel = require('./entities/Response.js');

//constructor
function Server() {

}

//class methods
Server.prototype = {
	errorCodes: ["0","500"],
	errorMessages: [
		"NO ERROR",
		"SERVER ERROR"
		],

	getResponse: function(){
		return this.response;
	},
	setResponse: function(response){
		this.response = response;
	},
	getRequest: function() {
		return this.request;
	},
	setRequest: function(request) {
		this.request = request;
	},


	function _showBodyParams(request) {
	requestUtils.showBodyParams(request);
}

function _setHeaders(response, type) {
	responseUtils.setHeaders(response, type);
}


}

exports.Server = function() {
	return new Server();
}
