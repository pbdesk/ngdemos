(function () {
	'use strict';

	angular
		.module('PBDesk.Contacts')
		.controller('ListController', ListController);

	ListController.$inject = ['$location', 'ContactsCRUDFactory'];

	function ListController($location, ContactsCRUDFactory) {
		/* jshint validthis:true */
		var vm = this;
		vm.title = 'PBDesk';
		vm.items = [];
		vm.viewMode = "list";

		vm.SetViewMode = function (viewMode) {
			vm.viewMode = viewMode;
		}

		vm.delete = function (position) {
			var id = 0;
			if (position > 0) {
				id = this.items[position].Id;
			}
			if (id > 0) {
				ContactsCRUDFactory.DelItem(id)
				.then(function (result, status, headers, httpconfig) {
					$("#contactRow" + position).fadeOut(2000);
				}, function (result, status, headers, httpconfig) {
					alert("error");
				});
			}
			
		}

		vm.refresh = function () {
			init();
		}

		init();

		function init() {
			ContactsCRUDFactory
				.GetItems()
				.then(function (result, status, headers, httpconfig) {
					angular.copy(result, vm.items);
				},function (result, status, headers, httpconfig) {
					alert("error");
				});
		}
	}
})();
