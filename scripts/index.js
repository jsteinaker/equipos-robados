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

		// UI para usuarios
		vm.loggedInUI = function() {
			console.log($scope.firebaseUser.email);
		}

		// UI deslogueados
		vm.loggedOutUI = function() {
			console.log("LoggedOutUI");
		}
		vm.auth.$onAuthStateChanged(function(firebaseUser) {
			$scope.firebaseUser = firebaseUser;
			if (firebaseUser === null) {
				vm.loggedOutUI();
			}
			else {
				vm.loggedInUI();
			}
		});
	}])
	.factory('Auth', ["$firebaseAuth", function($firebaseAuth) {
		return $firebaseAuth();
	}]);
