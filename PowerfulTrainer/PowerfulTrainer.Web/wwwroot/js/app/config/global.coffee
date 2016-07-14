﻿angular.module 'config.global', []
.config ($locationProvider, $localStorageProvider, $sessionStorageProvider, $sceDelegateProvider, $compileProvider) ->
    $locationProvider.html5Mode(true).hashPrefix('!')
    $localStorageProvider.setKeyPrefix('powerful_tranier_')
    $sessionStorageProvider.setKeyPrefix('powerful_tranier_')

    $sceDelegateProvider.resourceUrlWhitelist [
        'self'
        'https://az803746.vo.msecnd.net/tenant/amp/entityid/**'
        'https://www.dropbox.com/s/**'
    ]

    $compileProvider.debugInfoEnabled(false)

.run ($rootScope, $mdMedia) ->
    $rootScope.hideTooltipOnXS = $mdMedia('xs')
    $rootScope.enableScrollShrink = $mdMedia('xs') || $mdMedia('sm')