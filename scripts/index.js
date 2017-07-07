'use strict';

// Creamos módulo principal
angular.module('main', ['ngRoute', 'firebase'])
	.config(function($routeProvider) {
		$routeProvider
		.when("/", {
			controller: "gearDataController",
			controllerAs: "vm",
			templateUrl: "list.html"
		})
		.when("/registro", {
			controller: "mainController",
			controllerAs: "vm",
			templateUrl: "register.html"
		})
		.when("/cargar", {
			controller: "mainController",
			controllerAs: "vm",
			templateUrl: "loadgear.html"
		})
		.otherwise({
			redirectTo: "/registro"
		});
	})
	.controller('mainController', function($scope) {
	})
	.controller('gearDataController', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
		var database = firebase.database().ref('gear');
		// Descarga de datos a un objeto local
		$scope.equipos = $firebaseArray(database);
	}])
	.controller('authController', ['$scope', 'Auth', function($scope, Auth) {
		var vm = this;
		vm.auth = Auth;

		// Función de login
		$scope.logIn = function() {
			vm.auth.$signInWithEmailAndPassword($scope.email, $scope.password);
		}

		// Función de logout
		$scope.logOut = function() {
			vm.auth.$signOut();
		}

		// Crea un nuevo usuario
		$scope.createUser = function(email, password) {
			vm.auth.$createUserWithEmailAndPassword(email, password, function(error, user) {
				if (error) {
					switch (error.code) {
						case "EMAIL_TAKEN":
							console.log("Email already in use");
							break;
						case "INVALID_EMAIL":
							console.log("Invalid email");
							break;
						default:
							console.log("Eror: ", error);
					}
				}
				else {
					document.getElementById("registerOK").modal();
				}
			});
		};

		// Llamada cuando cambia el estado de autenticación
		vm.auth.$onAuthStateChanged(function(firebaseUser) {
			$scope.firebaseUser = firebaseUser;
			});
	}])
	.factory('Auth', ["$firebaseAuth", function($firebaseAuth) {
		return $firebaseAuth();
	}])
	.directive("matchPassword", function() {
		return {
			require: "ngModel",
			scope: {
				otherModelValue: "=matchPassword"
			},
			link: function(scope, element, attributes, ngModel) {
				ngModel.$validators.matchPassword = function(modelValue) {
					return modelValue == scope.otherModelValue;
				};
				
				scope.$watch("otherModelValue", function() {
					ngModel.$validate();
				});
			}
		};
	});
