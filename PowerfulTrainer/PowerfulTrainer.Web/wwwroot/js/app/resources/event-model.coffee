angular.module "resources.eventModel", []
.factory "EventModel", ($http, AppCfg, Auth) ->
    return {
        getConditions: ->
            $http.get AppCfg.apiUrl + "/conditions"

        getActions: ->
            $http.get AppCfg.apiUrl + "/actions"

        getSensorTypes: ->
            $http.get AppCfg.apiUrl + "/sensortypes"
    }