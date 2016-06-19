angular.module 'directives.includeReplace', []
.directive 'includeReplace', ->
    return {
        require: 'ngInclude'
        restrict: 'A'
        link: (scope, element, attrs) ->
            element.replaceWith(element.children())
    }