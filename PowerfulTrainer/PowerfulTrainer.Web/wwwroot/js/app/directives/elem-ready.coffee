angular.module 'directives.elemReady', []
.directive 'elemReady', ($parse, $timeout) ->
    return {
    restrict: 'A'
    link: ($scope, elem, attrs) ->
      elem.ready ->
        $timeout ->
          $scope.$apply ->
            func = $parse(attrs.elemReady)
            func($scope)
        , 1000
    }