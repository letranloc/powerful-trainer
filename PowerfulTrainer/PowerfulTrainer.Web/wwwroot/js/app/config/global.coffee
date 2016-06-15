angular.module 'config.global', []
.config ($locationProvider, $localStorageProvider, $sessionStorageProvider) ->
    $locationProvider.html5Mode(true).hashPrefix('!')
    $localStorageProvider.setKeyPrefix('powerful_tranier_')
    $sessionStorageProvider.setKeyPrefix('powerful_tranier_')

.run ($rootScope, $mdMedia) ->
    $rootScope.hideTooltipOnXS = $mdMedia('xs')