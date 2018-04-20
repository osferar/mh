var mainApplicationModuleName = 'medicalhistory';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource','ngRoute','users','main', 'articles', 'appointments','profilesDoctor']);

mainApplicationModule.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
