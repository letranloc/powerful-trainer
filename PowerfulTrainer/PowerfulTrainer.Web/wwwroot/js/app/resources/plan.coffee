angular.module "resources.plan", []
.factory "Plan", ($http, AppCfg, Auth)->
    return {
        add: (plan) ->
            $http.post AppCfg.apiUrl + "/plans", plan

        get: (id) ->
            $http.get AppCfg.apiUrl + "/plans/#{id}"

        getAll: (query)->
            $http
                url: AppCfg.apiUrl + "/plans"
                method: 'GET'
                params:
                    size: query.limit
                    page: query.page

        delete: (id) ->
            $http.delete AppCfg.apiUrl + "/plans/#{id}"

        update: (plan) ->
            $http.put AppCfg.apiUrl + "/plans/#{plan.Id}", plan

        getShare: (id) ->
            $http.get AppCfg.apiUrl + "/plans/#{id}/share"

        share: (id, username) ->
            $http.post AppCfg.apiUrl + "/plans/share", {PlanId: id, Username: username}

        getNotify: (interval) ->
            interval = if interval then '/' + interval else ""
            $http.get AppCfg.apiUrl + "/plans/sharenotify#{interval}"
    }