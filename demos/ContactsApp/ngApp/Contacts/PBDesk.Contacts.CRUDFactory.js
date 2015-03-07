(function () {
	'use strict';

	angular
		.module('PBDesk.Contacts')
		.factory('ContactsCRUDFactory', CRUDFactory);

	CRUDFactory.$inject = ['$http','$q'];

	function CRUDFactory($http,$q) {
		

		var _items = [];
		var _isReady = false;

		var apiUrl = "http://dsvc.pbdesk.com/api/Contacts/"

		

		var _getItems = function () {
			var deferred = $q.defer();

			$http.get(apiUrl)
					   .success(function (result, status, headers, httpconfig) {
						   angular.copy(result, _items);
						   _isReady = true;
						   deferred.resolve(result);
					   })
					   .error(function (result, status, headers, httpconfig) {
						   deferred.reject(result, status);
					   });
			return deferred.promise;
		}

		var _getItem = function (id) {
			if (_isReady) {
				var result = $.grep(_items, function (e) { return e.id == id; });
				if (result.length == 0) {
					return null;
				} else if (result.length == 1) {
					return result[0];
				} else {
					return null;
				}
			}
			else
				return null;
		}

		var _addItem = function (newItem) {
			var deferred = $q.defer();

			$http.post(apiUrl, newItem)
				.success(function (result, status, headers, httpconfig) {


					_items.splice(0, 0, result);
					
					deferred.resolve(result);

				})
				.error(function (result, status, headers, httpconfig) {
					deferred.reject(result, status);
				});
			return deferred.promise;
		}

		var _updItem = function (updItem) {
			var deferred = $q.defer();
			$http.put(apiUrl + updItem.id, updItem)
			.then(
				function (result, status, headers, httpconfig) {
					//success 
					var foundAtIndex = -1;
					$.each(_items, function (index, value) {
						if (value.id === updItem.id) {
							foundAtIndex = index;
						}
					});

					if (foundAtIndex >= 0) {
//                        var res = PBDeskJS.Utils.ResolveReferences(result.data);
						angular.copy(result.data, _items[foundAtIndex]);
					}

				   
					deferred.resolve(result.data);
				},
				function (result, status, headers, httpconfig) {
					//error
					deferred.reject(result, status);
				}
			);

			return deferred.promise;
		}

		var _delItem = function (id) {
			var deferred = $q.defer();
			$http.delete(apiUrl + id)
			.then(
				function (result, status, headers, httpconfig) {
					//success
				  
					deferred.resolve();
				},
				function (result, status, headers, httpconfig) {
					//error
					deferred.reject(result, status);
				}
			);

			return deferred.promise;

		}

		var service = {
			Items: _items,
			IsReady: _isReady,
			GetItems: _getItems,
			GetItem: _getItem,
			AddItem: _addItem,
			UpdItem: _updItem,
			DelItem: _delItem
		};

		return service;

		
	}
	
})();