angular.module 'directives.fixHeight', []
.directive 'fixHeight', ($timeout) ->
    return {
        restrict: 'A'
        link: (scope, element, attrs) ->
            elem = angular.element(element[0])
            from = elem.find('[add-height-from-this]')
            to = elem.find('[add-height-to-this]')
            if from && to
                $timeout ->
                    to.css('height', to.height() + from.height())
    }