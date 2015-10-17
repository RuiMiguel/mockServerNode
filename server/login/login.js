var fs = require("../utils.js");

var helpMessage = "*** Login: use POST /login";

function help() {
	return helpMessage;
}

function printParams(list) {
	for(elem in list) {
		console.log(elem+": "+list[elem]);
  	}
}

exports.init = function(app) {
	help();

	app.post('/login', function (req, res) {
	  	console.log('POST /login');

	  	printParams(req.body);

		var response = fs.loadResponseFile("login/login.json");

    	res.setHeader('Content-Type', 'application/json');
	  	res.send(response);
	});
}

exports.showHelp = function() {
	var msg = help();
	return msg;
}