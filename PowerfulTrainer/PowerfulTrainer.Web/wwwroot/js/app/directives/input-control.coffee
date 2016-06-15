angular.module "directives.inputControl", []
.directive "inputControl", ($compile, $templateCache, EventModel, mdToast) ->
    sensorTypes = null

    getControlByType = (scope, type) ->
        switch type
            when "Int", "Double"
                {view: "number", def: 0}
            when "String"
                {view: "string", def: ""}
            when "BandSensorType"
                if sensorTypes
                    scope.sensorTypes = sensorTypes
                else 
                    EventModel.getSensorTypes().then (resp) ->
                        sensorTypes = resp.data.Data
                        scope.sensorTypes = sensorTypes
                    , (resp) ->
                        mdToast.showSimple resp.data.Message, "danger"
                {view: "band-sensor-type", def: ""}
    return {
        restrict: 'E'

        scope:
            name: '@'
            type: '@'
            model: '='
            hide: '='
            disabled: '='
            readonly: '='
            required: '='
        template: ""

        link: (scope, element, attrs) ->
            processing = false
            render = ->
                if !scope.type || !scope.name || processing
                    return
                processing = true
                type = getControlByType(scope, scope.type)
                unless scope.disabled
                    scope.model = scope.model || type.def
                element.replaceWith $compile($templateCache.get "directives/input-control/" + type.view + ".html")(scope)

            scope.$watch 'name', ->
                render()
            scope.$watch 'type', ->
                render()
    }