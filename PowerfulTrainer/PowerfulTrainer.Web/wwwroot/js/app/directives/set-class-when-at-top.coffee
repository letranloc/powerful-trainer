angular.module 'directives.setClassWhenAtTop', []
.directive 'setClassWhenAtTop', ($window) ->
    $win = angular.element($window)

    return {
        restrict: 'A'
        link: (scope, element, attrs) ->
            topClass = attrs.setClassWhenAtTop
            offsetTop = element.offset().top

            $win.on 'scroll', (e) ->
                if $win.scrollTop() >= offsetTop
                    element.addClass(topClass)
                else
                    element.removeClass(topClass)
    }