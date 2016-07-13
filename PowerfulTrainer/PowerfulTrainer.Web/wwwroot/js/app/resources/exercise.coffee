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

        getLevel: ->
            $http.get AppCfg.apiUrl + '/exercise/level'

        getFocus: ->
            $http.get AppCfg.apiUrl + '/exercise/focus'

        getBodyPart: ->
            $http.get AppCfg.apiUrl + '/exercise/bodypart'

        getThumbnail: (id) ->
            AppCfg.apiUrl + '/exercise/image/' + id
    }