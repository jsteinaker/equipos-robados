'use strict';

var table = document.getElementById("mainTableBody");

database.on("child_added", function(child) {
	console.log(child.key+': '+child.val());
	var tr = document.createElement('tr');
	// ID
	var td = document.createElement('td');
	td.innerText = child.key;
	tr.appendChild(td);
	// Gear
	td = document.createElement('td');
	td.innerText = child.val().gear;
	tr.appendChild(td);
	// Serial
	td = document.createElement('td');
	td.innerText = child.val().serial;
	tr.appendChild(td);
	// Owner
	td = document.createElement('td');
	td.innerText = child.val().owner;
	tr.appendChild(td);
	// Email
	td = document.createElement('td');
	td.innerText = child.val().email;
	tr.appendChild(td);
	// Phone
	td = document.createElement('td');
	td.innerText = child.val().phone;
	tr.appendChild(td);
	table.appendChild(tr);
});

// Función de búsqueda
function searchBySerial() {
	var input, filter, table, tr, td, i;
	input = document.getElementById("searchBySerial");
	filter = input.value.toUpperCase();
	table = document.getElementById("mainTableBody");
	tr = table.getElementsByTagName("tr");

	for (i=0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[2];
		if (td) {
			if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			}
			else
				tr[i].style.display = "none";
		}
	}
}
