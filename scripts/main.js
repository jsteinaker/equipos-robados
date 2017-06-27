'use strict';

// Referencia a la base de datos
var database = firebase.database().ref('gear');

var table;

// UI para usuarios logueados
function changeUiOnLogIn(user) {
	$("#userName").text(user.email);
	$("#userName").append("<span class='caret'></span>");
	$(".loggedInUI").show();
	$(".loggedOutUI").hide();
}

// UI para usuarios sin loguear
function changeUiOnLogOut() {
	$(".loggedInUI").hide();
	$(".loggedOutUI").show();
}

// Carga la página en el container 
function loadPage(page) {
	$("#body-container").load(page, function() {
		var user = firebase.auth().currentUser;
		if (user) {
			changeUiOnLogIn(user);
		}
		else {
			changeUiOnLogOut();
		}
	});
}

//  Hilo principal

// Carga la vista del listado en el container div
loadPage("main.html");

// Función de login
$("#login-form").on('submit', function(event) {
	event.preventDefault();
	// Borra el mensaje de usuario o contraseña errónea
	// cada vez que reenviamos el formulario.
	$("#wrongUserOrPassword").hide();
	var email = $("#emailField").val();
	var password = $("#passwordField").val();
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		// Handle errors here
		console.log(error);
		if (error.code == "auth/user-not-found"
			|| error.code == "auth/wrong-password") {
			$("#wrongUserOrPassword").show();
		}
	});
	return false;
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

// Carga el listado principal
$("#mainLink").on('click', function() {
	loadPage("main.html");
	
});

// Carga la página de Registro
$("#registerButton").on('click', function() {
	loadPage("register.html");
});

// Carga la página de añadir equipo
$("#addGearLink").on('click', function() {
	loadPage("loadgear.html");
});
