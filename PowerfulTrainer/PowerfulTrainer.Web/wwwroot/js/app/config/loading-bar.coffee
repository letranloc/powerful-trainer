angular.module 'config.loadingBar', []
.config  (cfpLoadingBarProvider) ->
    cfpLoadingBarProvider.includeSpinner = true
    cfpLoadingBarProvider.includeBar = true
.run ($rootScope, cfpLoadingBar) ->
    $rootScope.$on '$stateChangeStart', ->
        cfpLoadingBar.start()

    $rootScope.$$on '$viewContentLoaded', ->
        cfpLoadingBar.complete()