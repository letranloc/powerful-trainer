angular.module "resources.plan", []
.factory "Plan", ($http, AppCfg, Auth)->
    return {
        add: (plan) ->
            $http.post AppCfg.apiUrl + "/plans", plan, 
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        get: (id) ->
            $http.get AppCfg.apiUrl + "/plans/#{id}", 
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        getAll: (query)->
            $http
                url: AppCfg.apiUrl + "/plans"
                method: 'GET'
                params:
                    size: query.limit
                    page: query.page
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        delete: (id) ->
            $http.delete AppCfg.apiUrl + "/plans/#{id}",
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        update: (plan) ->
            $http.put AppCfg.apiUrl + "/plans/#{plan.ID}", plan,
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        getShare: (id) ->
            $http.get AppCfg.apiUrl + "/plans/#{id}/share",
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        share: (id, username) ->
            $http.post AppCfg.apiUrl + "/plans/share", {PlanID: id, Username: username},
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken

        getNotify: (interval) ->
            interval = if interval then '/' + interval else ""
            $http.get AppCfg.apiUrl + "/plans/sharenotify#{interval}",
                headers:
                        Authorization: Auth.isAuthenticated().AccessToken
    }