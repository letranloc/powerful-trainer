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
    
        search: (str, query) ->
            $http
                url: AppCfg.apiUrl + "/friends/search/#{str}"
                method: 'GET'
                params:
                    size: query.limit
                    page: query.page

        request: (username) ->
            $http.post AppCfg.apiUrl + "/friends/#{username}"

        getRequests: (interval) ->
            interval = if interval then '/' + interval else ""
            $http.get AppCfg.apiUrl + "/friends/requests#{interval}"

        accept: (username) ->
            $http.post AppCfg.apiUrl + "/friends/accept/#{username}"

        getWaitingResponses: ->
            $http.get AppCfg.apiUrl + "/friends/waitingresponse"

        delete: (username) ->
            $http.delete AppCfg.apiUrl + "/friends/#{username}"
    }