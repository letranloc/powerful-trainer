angular.module 'resources.mshealth', []
.factory 'MSHealth', ($http, AppCfg, Auth) ->
    return {
      getByUrl: (url, params) ->
        $http
          url: url
          method: 'GET'
          params: params
          headers:
            Authorization: 'Bearer ' + Auth.isAuthenticated().MSAccessToken

      getProfile: ->
        $http.get AppCfg.mshealth.apiUrl + '/profile',
          headers:
            Authorization: 'Bearer ' + Auth.isAuthenticated().MSAccessToken

      getSummaries: (options) ->
        $http
          url: AppCfg.mshealth.apiUrl + '/summaries/' + options.period
          method: 'GET'
          params:
            startTime: options.startTime
            endTime: options.endTime
            deviceIds: options.deviceIds
            maxPageSize: options.maxPageSize
          headers:
            Authorization: 'Bearer ' + Auth.isAuthenticated().MSAccessToken

      getActivities: (options) ->
        options = {} unless options
        $http
          url: AppCfg.mshealth.apiUrl + '/activities'
          params:
            activityIds: options.activityIds,
            activityTypes: options.activityTypes
            activityIncludes: options.activityIncludes
            splitDistanceType: options.splitDistanceType
            startTime: options.startTime
            endTime: options.endTime
            deviceIds: options.deviceIds
            maxPageSize: options.maxPageSize
          headers:
            Authorization: 'Bearer ' + Auth.isAuthenticated().MSAccessToken

      getDevices: (deviceId) ->
        $http.get AppCfg.mshealth.apiUrl + '/devices' + (if deviceId then '/' + encodeURIComponent(deviceId) else ''),
          headers:
            Authorization: 'Bearer ' + Auth.isAuthenticated().MSAccessToken
    }