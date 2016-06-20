angular.module 'resources.mshealth', []
.factory 'MSHealth', ($rootScope, $http, AppCfg, Auth) ->
    return {
      getByUrl: (url, params) ->
        $http
          url: url
          method: 'GET'
          params: params
          headers:
            Authorization: 'Bearer ' + $rootScope.current_user.msb_access_token

      getProfile: ->
        $http.get config.apiUrl + '/profile',
          headers:
            Authorization: 'Bearer ' + $rootScope.current_user.msb_access_token

      getSummaries: (options) ->
        $http
          url: config.apiUrl + '/summaries/' + options.period
          method: 'GET'
          params:
            startTime: options.startTime
            endTime: options.endTime
            deviceIds: options.deviceIds
            maxPageSize: options.maxPageSize
          headers:
            Authorization: 'Bearer ' + $rootScope.current_user.msb_access_token

      getActivities: (options) ->
        options = {} unless options
        $http
          url: config.apiUrl + '/activities'
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
            Authorization: 'Bearer ' + $rootScope.current_user.msb_access_token

      getDevices: (deviceId) ->
        $http.get config.apiUrl + '/devices' + (if deviceId then '/' + encodeURIComponent(deviceId) else ''),
          headers:
            Authorization: 'Bearer ' + $rootScope.current_user.msb_access_token
    }