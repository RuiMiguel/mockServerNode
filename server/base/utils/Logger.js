var fileSystemUtils = require('../filesystem.js');

var DEBUG = true;

//constructor
function Logger(debug) {
	this.DEBUG = debug;
}

//class methods
Logger.prototype = {
	log: function(msg){
		if(this.DEBUG) {
			var logMessage = "--- "+msg+"\n";
			console.log(logMessage);
		}
	},
	warning: function(msg){
		if(this.DEBUG) {
			var warnMessage = "--- WARNING: "+msg+" ---\n";
			console.warn(warnMessage);
		}
	},
	error: function(msg) {
		if(this.DEBUG) {
			var errorMessage = "--- ERROR: "+msg+" ---\n";
			console.error(errorMessage);
		}
	}
}

exports.Logger = function() {
	return new Logger();
}
