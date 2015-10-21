/*
The MIT License (MIT)

Copyright (c) 2015 klughammer/node-randomstring

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */

var randomstring = require("randomstring");

function _randomString(str_length) {
	var str = randomstring.generate({
		length: str_length,
  		charset: 'alphabetic'
	});
	return str;
}

function _randomNumber(num_length) {
	var num = randomstring.generate({
		length: num_length,
  		charset: 'numeric'
	});
	return num;
}

function _randomAlphanumeric(alphanum_length) {
	var alphanum = randomstring.generate({
		length: alphanum_length,
  		charset: 'alphanumeric'
	});
	return alphanum;
}

function _randomBetween(start, end) {
	var number = Math.floor((Math.random() * end) + start);
	return number;
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}


exports.getRandomString = function(str_length) {
	var string = _randomString(str_length);
	return string;
}

exports.getRandomNumber = function(num_length) {
	var number = _randomNumber(num_length);
	return number;
}

exports.getRandomName = function() {
	var name;
	var names = ["Alberto","Sergio","Miguel","Eduardo","Fernando","Alfonso","Alejandro","Jose","Manuel","Leo","Pablo","Felipe","Javier","Juan","Dani"];
	var rdIndex = _randomBetween(1, names.length-1);
	name = names[rdIndex];

	if(rdIndex % 2 == 0) {
		rdIndex = (rdIndex+1) % names.length;
		name += " "+names[rdIndex];
	}	

	return name;
}
exports.getRandomSurname = function() {
	var surname;
	var surnames = ["Alonso","Sainz","Vasco","Benito","Martinez","Moralejo","Parada","Arribas","Ortega","Ordoñez","Hernandez","Jimenez","Ruperez","Muñoz"];
	var rdIndex = _randomBetween(1, surnames.length-1);
	var rdIndex2 = _randomBetween(1, surnames.length-1);
	surname = surnames[rdIndex]+" "+surnames[rdIndex2];

	return surname;
}

exports.getRandomPhone = function(phone_length) {
	var phone = _randomNumber(phone_length);
	return phone;
}

exports.getRandomId = function(id_length) {
	var number = _randomNumber(id_length);
	return number;
}

exports.getRandomEmail = function(email_length) {
	var server_length = 6;
	var extension_length = 3;

	var email = _randomString(email_length-server_length-extension_length);
	var server = _randomString(server_length);
	var extension = _randomString(extension_length);

	return email+"@"+server+"."+extension;
}

exports.getRandonDepartment = function() {
	var department;
	var departments = ["Dirección","Administración","Cuentas","Sistemas","Infraestructura","Multiplataforma","Diseño","I+D","iOS","Android","Servidores"];
	var rdIndex = _randomBetween(1, departments.length-1);
	department = departments[rdIndex];

	return department;
}

exports.getRandonPosition = function() {
	var position;
	var positions = ["Director","Analista","Desarrollador","Programador","Técnico","Administrador","Manager","Diseñador","Jefe","Presidente"];
	var rdIndex = _randomBetween(1, positions.length-1);
	position = positions[rdIndex];

	if(rdIndex % 2 == 0) {
		rdIndex = _randomBetween(1, positions.length-1);
		position += " "+positions[rdIndex];
	}	

	return position;
}

exports.getRandomCity = function() {
	var city;
	var cities = ["Madrid","Barcelona","Roma","Milan","Londres","Manchester","Abu Dabi","New York","Washington","Berlin","Munich","Moscu","Volvogrado","Mexico D.F.","Acapulco","Caracas","Sao Paulo","Rio de Janeiro","Buenos Aires","Santiago de Chile","Sidney","Canberra"];
	var rdIndex = _randomBetween(1, cities.length-1);
	city = cities[rdIndex];
	return city;
}

exports.getRandomCountry = function() {
	var country;
	var countries = ["España","Francia","Portugal","Reino Unido","Alemania","Italia","Rusia","Qatar","EEUU","Mexico","Venezuela","Brasil","Argentina","Chile","Arabia Saudita","Australia"];
	var rdIndex = _randomBetween(1, countries.length-1);
	country = countries[rdIndex];
	return country;
}

exports.getRandomContinent = function() {
	var continent;
	var continents = ["Africa","America del Norte","America del Sur","Oceania","Europa","Asia"];
	var rdIndex = _randomBetween(1, continents.length-1);
	continent = continents[rdIndex];
	return continent;
}

exports.getRandomAddress = function() {
	var address;
	var street = _randomString(30);
	var poblation = _randomString(20);
	var cp = _randomNumber(10);
	address = street+", "+poblation+" ("+cp+")";
	return address;
}

exports.getRandomLatitude = function() {
	var latitude;
	//latitud 90 to -90
	latitude = getRandomInRange(-90, 90, 3);
	return latitude;
}

exports.getRandomLongitude = function() {
	var longitude;
	//longitude 180 a -180
	longitude = getRandomInRange(-180, 180, 3);
	return longitude;
}
