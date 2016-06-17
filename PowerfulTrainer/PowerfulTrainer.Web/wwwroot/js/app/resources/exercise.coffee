angular.module 'resources.exercise', []
.factory 'Exercise', ($http, AppCfg, Auth) ->
    return {
        getAll: (name, bodypart, level, focus, query) ->
            $http
                url: AppCfg.apiUrl + '/exercise'
                method: 'GET'
                params:
                    name: name
                    bodypart: bodypart
                    level: level
                    focus: focus
                    page: query.page
                    size: query.limit
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        getLevel: ->
            $http
                url: AppCfg.apiUrl + '/exercise/level'
                method: 'GET'
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        getFocus: ->
            $http
                url: AppCfg.apiUrl + '/exercise/focus'
                method: 'GET'
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        getBodyPart: ->
            $http
                url: AppCfg.apiUrl + '/exercise/bodypart'
                method: 'GET'
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken
    }