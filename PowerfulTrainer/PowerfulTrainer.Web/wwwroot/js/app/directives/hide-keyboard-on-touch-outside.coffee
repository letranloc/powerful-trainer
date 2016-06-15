angular.module "directives.hideKeyboardOnTouchOutside", []
.directive "body", ($document) ->
    return {
        restrict: 'E'
        link: (scope, element, attrs) ->
            mc = new Hammer(element[0])
            mc.on "tap", (e) -> 
                if e.target.tagetName isnt "INPUT" && $document.activeElement
                    $document.activeElement.blur()
    }