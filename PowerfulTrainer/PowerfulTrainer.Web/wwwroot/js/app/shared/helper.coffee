angular.module 'shared.helper', []
.run [
  '$rootScope'
  ($rootScope) ->
    $rootScope.$$on = (events, fn) ->
      for e in events.split(/[ ,]+/)
        $rootScope.$on e, fn
    
    $rootScope.getVideoSrc = (id) ->
        return "https://az803746.vo.msecnd.net/tenant/amp/entityid/#{id}?blobrefkey=103&$blob=1"
]