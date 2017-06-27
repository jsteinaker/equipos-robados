'use strict';

/* Carga los datos a Firebase */
$("#addGearForm").on('submit', function(event) {
	var data = {
		gear: $("#gearInput").val(),
		serial: $("#serialInput").val(),
		owner: $("#ownerInput").val(),
		email: $("#emailInput").val(),
		phone: $("#phoneInput").val()
	};
	database.push(data, function(error) {
		if (error) {
		}
		else {
			$('#loadOK').modal();
			$('#addGearForm')[0].reset();
		}
	});
});
