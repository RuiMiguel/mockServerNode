var utils = require('./utils.js');
var fileSystem = require('./filesystem.js');
var ip = require("ip");

var filesPath = "./tmp";

function _getIpAddress() {
	var ipAddress = ip.address();
	return ipAddress;
}

function _createNextHeadquarterUrl(index, maxPages) {
	var endpoint = "updateHeadquarters";
	return _createNextUrl(index, maxPages, endpoint);
}
function _createNextEmployeeUrl(index, maxPages) {
	var endpoint = "updateEmployees";
	return _createNextUrl(index, maxPages, endpoint);
}

function _createNextUrl(index, maxPages, endpoint) {
	var next;
	if(index < maxPages) {
		var ipAddress = _getIpAddress();
		//next = "http://"+ipAddress+"/"+endpoint+"?page="+(index+1);
		next = ""+(index+1);
	}
	else {
		next = "";
	}

	console.log("INDEX="+index);
	console.log("MAXPAGES="+maxPages);
	console.log("NEXT="+next);
	return next;
}

function _createHeadquarters(number, page, maxPages) {
	var jsonHeadquarters = {
			"next" : _createNextHeadquarterUrl(page, maxPages),
			"data": []
		};

	var headquarter;
	for(var i=0; i<number;i++) {
		headquarter = {
			"id": utils.getRandomId(4),
			"name": utils.getRandomString(40),
			"image": "",
			"phones": {
				"Emergencia": utils.getRandomPhone(4),
				"MAR": utils.getRandomPhone(9),
				"SAE": utils.getRandomPhone(4),
				"Seguridad": utils.getRandomPhone(9)
			},
			"location": {
				"latitude": utils.getRandomLatitude(),
				"longitude": utils.getRandomLongitude()
			},
			"city": utils.getRandomCity(),
			"country": utils.getRandomCountry(),
			"continent": utils.getRandomContinent(),
			"address": utils.getRandomAddress(),
		}; 

		jsonHeadquarters.data.push(headquarter);
	}

	return jsonHeadquarters;
}

function _createEmployees(number, page, maxPages) {
	var jsonEmployees = {
			"next" : _createNextEmployeeUrl(page, maxPages),
			"data": []
		};

	var employee;
	for(var i=0; i<number;i++) {
		employee = {
			"id": utils.getRandomId(8),
			"name": utils.getRandomName(),
			"surname": utils.getRandomSurname(),
			"photo": "",
			"position": utils.getRandonPosition(),
			"department": utils.getRandonDepartment(),
			"phoneNumbers": {
				"Fijo_Corto": utils.getRandomPhone(4),
				"Fijo_Largo": utils.getRandomPhone(9),
				"Movil_Corto": utils.getRandomPhone(4),
				"Movil_Largo": utils.getRandomPhone(9)				
			},
			"email": utils.getRandomEmail(80),
			"lyncId": utils.getRandomId(9),
			"headquarterId": utils.getRandomId(4),
			"managerId": utils.getRandomId(8),
		};

		jsonEmployees.data.push(employee);
	}

	return jsonEmployees;
}

function _generateJSON() {
	fileSystem.cleanJSON(filesPath);
	
	var fileName = "updateHeadquarters";
	var maxHeadquartersPages = 1;
	var headquarterPerPage = 500/maxHeadquartersPages;	
	for(var i=1;i<=maxHeadquartersPages; i++) {
		var jsonHeadquarters = _createHeadquarters(headquarterPerPage, i, maxHeadquartersPages);

		var file = fileName;
		if(maxHeadquartersPages > 1) {
			file += i;
		}
		var fileNamePath = filesPath+"/"+file+".json";

		fileSystem.saveJson2File(jsonHeadquarters, fileNamePath);
	}


	var fileName = "updateEmployees";
	var maxEmployeesPages = 10;
	var employeesPerPage = 25000/maxEmployeesPages;
	for(var i=1;i<=maxEmployeesPages; i++) {
		var jsonEmployees = _createEmployees(employeesPerPage, i, maxEmployeesPages);

		var file = fileName;
		if(maxEmployeesPages > 1) {
			file += i;
		}
		var fileNamePath = filesPath+"/"+file+".json";

		fileSystem.saveJson2File(jsonEmployees, fileNamePath);
	}
}

_generateJSON();
