angular.module "directives.stateCard", []
.directive 'stateCard', ($compile, $templateCache) ->
    return {
        restrict: 'E'
        scope:
            title: '@'
            value: '@'
            unit: '@'
            values: '='
            units: '='
            info: '@'
        template: ''
        link: (scope, element, attrs) ->
            element.replaceWith $compile($templateCache.get "directives/state-card.html")(scope)
    }