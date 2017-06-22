'use strict';

// Referencia a la tabla y a la base de datos
var table = document.getElementsByTagName('table')[0];
var database = firebase.database().ref('gear');
console.log("Refs OK");

// Iniciamos
database.on("child_added", function(child) {
	console.log(child.key+': '+child.val());
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.innerText = child.val();
	tr.appendChild(td);
	table.appendChild(tr);
});
