'use strict';

// jQuery.validate integration with Bootstrap 4
/*
$.validator.setDefaults();

{
	highlight: function(element) {
		$(element).addClass('form-control-danger');
		$(element).closest('.form-group').addClass('has-error');
	},
	unhighlight: function(element) {
		$(element).removeClass('form-control-danger');
		$(element).closest('.form-group').removeClass('has-error');
	},
	errorElement: 'span',
	errorClass: 'label label-danger',
	errorPlacement: function(error, element) {
		if (element.parent('.input-group').length) {
			error.insertAfter(element.parent());
		}
		else {
			error.insertAfter(element);
		}
	}
});
*/
// Ugly hack to wait for jQuery to be ready
while (true) {
	if (typeof jQuery !== "undefined") {
		$("#registerForm").validate({
			submitHandler: function(form) {
				var email = $("#email").val();
				var password = $("#password").val();
				firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
					$("#registerOK").modal();
					$("#registerForm")[0].reset();
				}).catch(function(error) {
					console.log("ERROR");
				});
				return false;
			},
			rules: {
				repeatPassword: {
					equalTo: "#password"
				}
			}
		});
		break;
	}
}

//# sourceURL=register.js
