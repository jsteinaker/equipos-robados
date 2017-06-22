'use strict';

// Referencia a la tabla y a la base de datos
var table = document.getElementsByTagName('table')[0];
var database = firebase.database().ref('gear');
console.log("Refs OK");

// Iniciamos
database.on("child_added", function(child) {
	console.log(child.key+': '+child.val());
	var tr = document.createElement('tr');
	// ID
	var td = document.createElement('td');
	td.innerText = child.key;
	tr.appendChild(td);
	// Gear
	var td = document.createElement('td');
	td.innerText = child.val().gear;
	tr.appendChild(td);
	// Owner
	var td = document.createElement('td');
	td.innerText = child.val().owner;
	tr.appendChild(td);
	// Email
	var td = document.createElement('td');
	td.innerText = child.val().email;
	tr.appendChild(td);
	// Phone
	var td = document.createElement('td');
	td.innerText = child.val().phone;
	tr.appendChild(td);
	table.appendChild(tr);
});
