angular.module 'controllers.dashboard', []
.controller 'DashboardCtrl', ($scope, $mdSidenav, $mdMedia, Auth) ->
    $scope.$watch Auth.isAuthenticated, ->
        $scope.User = Auth.isAuthenticated()

    $scope.toggleNavLeft = ->
        $mdSidenav("left").toggle()

.controller "DashboardIndexCtrl", ($scope, $sessionStorage, $mdpDatePicker, $state, Auth, MSHealth) ->

    unless $sessionStorage.startTime
        $sessionStorage.startTime = new Date()
    $scope.currentDate = new Date($sessionStorage.startTime)

    $scope.showDatePicker = (evt) ->
        $mdpDatePicker $scope.currentDate,
            targetEvent: evt
        .then (selectedDate) ->
            $sessionStorage.startTime = selectedDate
            $scope.currentDate = selectedDate
            $scope.updateSummaries()

    $scope.showReportChart = (type) ->
        $state.go('cpanel.report.health', {
            chartType: type
        })

    $scope.showConnectMSHealth = !Auth.isAuthenticated().MSAccessToken
    if $scope.showConnectMSHealth
        $scope.connectToMSHealth = ->
            Auth.loginMSHealth()
    
    $scope.updateSummaries = ->
        MSHealth.getSummaries
            period: 'daily'
            startTime: moment($scope.currentDate).startOf('day').toISOString()
            endTime: moment($scope.currentDate).startOf('day').add(1, 'h').toISOString()
        .then (resp) ->
            console.log resp.data
            $scope.summary = resp.data.summaries[0]
        , (resp) ->
            console.log resp
    
        MSHealth.getActivities
            activityTypes: 'Sleep'
            activityIncludes: 'Details'
            startTime: moment($scope.currentDate).startOf('day').toISOString()
            endTime: moment($scope.currentDate).endOf('day').toISOString()
        .then (resp) ->
            console.log resp.data
            if resp.data.sleepActivities
                $scope.sleepActivities = resp.data.sleepActivities
                for a in $scope.sleepActivities
                    a.sleepDuration = $scope.parseTimeToArray(a.sleepDuration)
        , (resp) ->
            console.log resp

    $scope.updateSummaries()

    $scope.parseTimeToArray = (input) ->
        return input unless input
        time = moment(input.replace('H', ':').replace('M', ':'), 'PTH:m:sS')
        return [time.hours(), time.minutes()]
            
