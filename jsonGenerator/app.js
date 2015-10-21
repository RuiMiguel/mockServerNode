var utils = require('./utils.js');
var fileSystem = require('./filesystem.js');

var filesPath = "./tmp";

function _createNextUrl(maxPages, index) {
	var next;
	if(index < maxPages) {
		next = "http://localhost/update?page="+(index+1);
	}
	else {
		next = "";
	}
	return next;
}

function _createHeadquarters(number, max) {
	var jsonHeadquarters = {
			"next" : _createNextUrl(max, number),
			"data": []
		};

	var headquarter;
	for(var i=0; i<number;i++) {
		headquarter = {
			"id": utils.getRandomId(4),
			"name": utils.getRandomString(40),
			"phone": [
				{
					"type": "MAR",
					"number": utils.getRandomPhone(30)
				},
				{
					"type": "SAE",
					"number": utils.getRandomPhone(30)
				},
				{
					"type": "Seguridad",
					"number": utils.getRandomPhone(30)
				},
				{
					"type": "Emergencias",
					"number": utils.getRandomPhone(30)
				}
			],
			"email": [
				{
					"type": utils.getRandomString(4),
					"number": utils.getRandomEmail()
				}
			],
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

function _createEmployees(number, max) {
	var jsonEmployees = {
			"next" : _createNextUrl(max, number),
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
			"phoneNumber": [
				{
					"type": "ZTEIB",
					"number": utils.getRandomPhone(30),
				},
				{
					"type": "ZTEMO",
					"number": utils.getRandomPhone(30),
				},
				{
					"type": "ZTELM",
					"number": utils.getRandomPhone(30),
				},
				{
					"type": "ZTMOV",
					"number": utils.getRandomPhone(30),
				}
			],
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
		var jsonHeadquarters = _createHeadquarters(headquarterPerPage, maxHeadquartersPages);

		var fileName;
		if(maxHeadquartersPages > 1) {
			fileName += i;
		}
		var fileNamePath = filesPath+"/"+fileName+".json";

		fileSystem.saveJson2File(jsonHeadquarters, fileNamePath);
	}


	var fileName = "updateEmployees";
	var maxEmployeesPages = 10;
	var employeesPerPage = 25000/maxEmployeesPages;
	for(var i=1;i<=maxEmployeesPages; i++) {
		var jsonEmployees = _createEmployees(employeesPerPage, maxEmployeesPages);

		var fileName;
		if(maxHeadquartersPages > 1) {
			fileName += i;
		}
		var fileNamePath = filesPath+"/"+fileName+".json";

		fileSystem.saveJson2File(jsonEmployees, fileNamePath);
	}
}

_generateJSON();