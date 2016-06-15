angular.module "directives.eventModel", []
.directive "eventModel", ->
    return {
        restrict: 'E'
        scope:
            type: '@'
            schema: '='
            model: '='
        templateUrl: 'directives/event-model.html'
        link: (scope, element, attrs) ->            
            processing = false

            render = ->
                if !scope.schema || !scope.type || processing
                    return

                processing = true

                scope.eventModel = 
                    Name: scope.schema.Name
            
                if scope.type is "condition"
                    scope.model = scope.eventModel
                else if scope.type is "action"
                    scope.model.Action = scope.eventModel
                    scope.model.Frequency = 0

            scope.$watch 'schema', (schema)->
                render()
            scope.$watch 'type', ->
                render()
    }