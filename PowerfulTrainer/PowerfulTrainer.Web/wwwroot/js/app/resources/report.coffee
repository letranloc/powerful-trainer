angular.module 'resources.report', []
.factory 'Report', ($http, AppCfg, Auth) ->
    return {
        get: (username, fromtime, totime) ->
            $http
                url: AppCfg.apiUrl + '/report/' + username
                method: 'GET'
                params:
                    FromTime: fromtime
                    ToTime: totime

        getReport: (fromtime, totime) ->
            $http
                url: AppCfg.apiUrl + '/report'
                method: 'GET'
                params:
                    FromTime: fromtime
                    ToTime: totime

        add: (prog) ->
            $http
                url: AppCfg.apiUrl + '/report'
                method: 'POST'
                data:
                    BeginTime: prog.beginTime
                    Duration: prog.duration
                    AvgHeartRate: prog.avgHeartRate
                    TotalCals: prog.totalCals
                    TotalSteps: prog.totalSteps
    }