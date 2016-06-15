angular.module "resources.contact", []
.factory "Contact", ($http, AppCfg, Auth) ->
    return {
        getAll: (query)->
            $http
                url: AppCfg.apiUrl + "/friends" 
                method: 'GET'
                params:
                    size: query.limit
                    page: query.page
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken
    
        search: (str, query) ->
            $http
                url: AppCfg.apiUrl + "/friends/search/#{str}"
                method: 'GET'
                params:
                    size: query.limit
                    page: query.page
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        request: (username) ->
            $http.post AppCfg.apiUrl + "/friends/#{username}", null,
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        getRequests: (interval) ->
            interval = if interval then '/' + interval else ""
            $http.get AppCfg.apiUrl + "/friends/requests#{interval}",
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        accept: (username) ->
            $http.post AppCfg.apiUrl + "/friends/accept/#{username}", null,
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        getWaitingResponses: ->
            $http.get AppCfg.apiUrl + "/friends/waitingresponse",
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        delete: (username) ->
            $http.delete AppCfg.apiUrl + "/friends/#{username}",
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken
    }