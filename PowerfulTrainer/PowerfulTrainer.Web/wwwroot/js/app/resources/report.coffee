angular.module 'resources.report', []
.factory 'Report', ($http, AppCfg, Auth) ->
    return {
        get: (sensor, group, params) ->
            $http
                url: AppCfg.apiUrl + "/dashboard/#{sensor}/#{group}"
                method: 'GET'
                params:
                    func: params.func
                    fromTime: params.fromTime
                    toTime: params.toTime
                headers:
                    Authorization: Auth.isAuthenticated().AccessToken
    }