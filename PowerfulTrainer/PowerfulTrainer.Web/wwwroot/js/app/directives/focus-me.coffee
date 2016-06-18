angular.module 'directives.focusMe', []
.directive 'focusMe', ($timeout) ->
    return {
        scope:
            trigger: '=focusMe'
        link: (scope, element) ->
            scope.$watch 'trigger', (value) ->
                if value is true
                    $timeout ->
                        element[0].focus()
    }