(function () {
    'use strict';

    angular
        .module('PBDesk.Contacts')
        .controller('EditController', EditController);

    EditController.$inject = ['$location', '$routeParams', 'ContactsCRUDFactory'];

    function EditController($location, $routeParams, ContactsCRUDFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'Edit Contact';
        vm.item = {};

        var id = $routeParams.Id;

        if (id > 0) {
        	vm.item = ContactsCRUDFactory.GetItem(id);
        }


        vm.save = function () {
        	if (vm.item.id != null && vm.item.id > 0 && vm.item.name.trim().length > 0) {
        		ContactsCRUDFactory.UpdItem(vm.item)
				.then(function (result, status, headers, httpconfig) {
					$location.path('/');
				}, function (result, status, headers, httpconfig) {
					alert("error");
				});
        	}
        }
    }
})();
