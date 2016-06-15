angular.module 'shared.helper', []
.run [
  '$rootScope'
  ($rootScope) ->
    $rootScope.$$on = (events, fn) ->
      for e in events.split(/[ ,]+/)
        $rootScope.$on e, fn
]