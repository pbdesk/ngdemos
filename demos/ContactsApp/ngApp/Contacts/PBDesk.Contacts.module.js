(function () {
    'use strict';

    //app
    var app = angular.module('PBDesk.Contacts', [
         'ngRoute', 
        'blocks.exception', 'blocks.logger'
       
    ]);

    //routes
    app.config(['$routeProvider', function ($routeProvider) {
        var viewPath = 'ngApp/contacts/views/';
        $routeProvider
            .when('/', {
                controller: 'ListController',
                controllerAs: 'vm',
                templateUrl: viewPath + 'list.html'
            })

            .when('/Create', {
                controller: 'CreateController',
                controllerAs: 'vm',
                templateUrl: viewPath + 'item.html'
            })
            .when('/Edit/:Id', {
                controller: 'EditController',
                controllerAs: 'vm',
                templateUrl: viewPath + 'item.html'
            })

            .otherwise({ redirectTo: '/' });

    }]);
})();
