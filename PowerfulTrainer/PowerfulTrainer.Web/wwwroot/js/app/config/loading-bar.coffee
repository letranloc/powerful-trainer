angular.module 'config.loadingBar', []
.config  ->
    Pace.options =
        ajax: 
            ignoreURLs: ['browserLink']
        eventLag: false
.run ($rootScope) ->
    $rootScope.$on '$stateChangeStart', ->
        Pace.start()

    $rootScope.$$on '$stateNotFound,$stateChangeError,$stateChangeSuccess', ->
        Pace.stop()