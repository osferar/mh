var mainApplicationModuleName = 'medicalhistory';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource','ngRoute','main','users','profilesDoctor','profilesPatient', 'articles', 'appointments','consultations']);

mainApplicationModule.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
