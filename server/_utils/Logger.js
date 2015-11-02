var _DEBUG = true;

//constructor
function Logger(debug) {
	if(debug != undefined) this._DEBUG = debug;
}

//class methods
Logger.prototype = {
	info: function(msg){
		if(_DEBUG) {
			var message = msg+"\n";
			console.log(message);
		}
	},
	log: function(msg){
		if(_DEBUG) {
			var logMessage = "-- "+msg+"\n";
			console.log(logMessage);
		}
	},
	warning: function(msg){
		if(_DEBUG) {
			var warnMessage = "--- WARNING: "+msg+" ---\n";
			console.warn(warnMessage);
		}
	},
	error: function(msg) {
		if(_DEBUG) {
			var errorMessage = "--- ERROR: "+msg+" ---\n";
			console.error(errorMessage);
		}
	}
}

exports.Logger = function(debug) {
	return new Logger(debug);
}
