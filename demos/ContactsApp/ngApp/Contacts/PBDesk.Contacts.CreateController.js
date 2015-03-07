(function () {
	'use strict';

	angular
		.module('PBDesk.Contacts')
		.controller('CreateController', CreateController);

	CreateController.$inject = ['$location', 'ContactsCRUDFactory'];

	function CreateController($location, ContactsCRUDFactory) {
		/* jshint validthis:true */
		var vm = this;
		vm.title = 'Create Contact';
		vm.item = {};
		vm.save = function () {
			if (vm.item.name.trim().length > 0) {
				ContactsCRUDFactory.AddItem(vm.item)
				.then(function (result, status, headers, httpconfig) {
					$location.path('/');
				}, function (result, status, headers, httpconfig) {
					alert("error");
				});
			}
		}


		
	}
})();
