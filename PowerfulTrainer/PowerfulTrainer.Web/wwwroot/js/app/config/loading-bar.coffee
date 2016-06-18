angular.module 'config.loadingBar', []
.config  ->
    Pace.options =
        ajax: false
        eventLag: false
.run ($rootScope) ->
    $rootScope.$on '$stateChangeStart', ->
        Pace.start()
        console.log "Pace.start()"

    $rootScope.$$on '$stateNotFound,$stateChangeError,$stateChangeSuccess', ->
        Pace.stop()
        console.log "Pace.stop()"