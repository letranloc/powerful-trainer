angular.module "directives.appScroll", []
.directive "appScroll", ($window, $timeout) ->
    return {
        restrict: 'A'
        link: (scope, element, attrs) ->
            $e = angular.element(element)
            $p = angular.element($window)
            last_position = 0
            $timeout ->
                $p.bind 'scroll', (ev) ->
                    pos = ev.srcElement.scrollTop
                    console.log this.pageYOffset
                    if pos is 1 then return
                    if pos > last_position
                        $e.addClass('hide2')
                    else
                        $e.removeClass('hide2')
                    last_position = pos
                
                    $p.on '$destroy', ->
                        $p.off('scroll', onScroll)
            , 3000
    }