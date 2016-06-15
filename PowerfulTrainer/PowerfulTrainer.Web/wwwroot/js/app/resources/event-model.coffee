angular.module "resources.eventModel", []
.factory "EventModel", ($http, AppCfg, Auth) ->
    return {
        getConditions: ->
            $http.get AppCfg.apiUrl + "/conditions",
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        getActions: ->
            $http.get AppCfg.apiUrl + "/actions",
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        getSensorTypes: ->
            $http.get AppCfg.apiUrl + "/sensortypes",
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken
    }