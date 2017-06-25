'use strict';

// Referencia a la tabla y a la base de datos
var table = document.getElementsByTagName('tbody')[0];
var database = firebase.database().ref('gear');

// UI para usuarios logueados
function changeUiOnLogIn(user) {
	$("#userName").text(user.email);
	$("#userName").append("<span class='caret'></span>");
	$("#loggedIn").removeClass("hidden");
	$("#loggedOff").addClass("hidden");
	$("#addGearLoggedIn").removeClass("hidden");
	$("#addGearNotLoggedIn").addClass("hidden");
}

// UI para usuarios sin loguear
function changeUiOnLogOut() {
	$("#loggedIn").addClass("hidden");
	$("#loggedOff").removeClass("hidden");
	$("#addGearLoggedIn").addClass("hidden");
	$("#addGearNotLoggedIn").removeClass("hidden");
}

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

//  Hilo principal
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

// Función de login
$("#login-form").on('submit', function firebaseLogin() {
	// Borra el mensaje de usuario o contraseña errónea
	// cada vez que reenviamos el formulario.
	$("#wrongUserOrPassword").addClass("hidden");
	var email = $("#emailField").val();
	var password = $("#passwordField").val();
	console.log(password);
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		// Handle errors here
		console.log(error);
		if (error.code == "auth/user-not-found"
			|| error.code == "auth/wrong-password") {
			$("#wrongUserOrPassword").removeClass("hidden");
		}
	});
});

// Función de logout
$("#logout-form").on('submit', function firebaseLogout() {
	firebase.auth().signOut().catch(function(error) {
		console.log(error);
	});
});

// Modifica la UI cuando el usuario se loguea.
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		console.log("Logged In");
		changeUiOnLogIn(user);
	}
	else {
		console.log("Logged Out");
		changeUiOnLogOut();
	}
});

