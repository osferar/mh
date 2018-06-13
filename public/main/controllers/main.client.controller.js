angular.module('main').controller('MainController', ['$scope', 'Authentication','ShareDataService',
  function($scope, Authentication,ShareDataService) {
    $scope.authentication = Authentication;
    $scope.shareDataService = ShareDataService;
  }
]);
