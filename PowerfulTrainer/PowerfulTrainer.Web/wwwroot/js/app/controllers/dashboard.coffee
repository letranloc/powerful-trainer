angular.module 'controllers.dashboard', []
.controller 'DashboardCtrl', ($rootScope, $scope, $mdSidenav, $mdMedia, $timeout, $state, Auth) ->
    $scope.$watch Auth.isAuthenticated, ->
        $scope.User = Auth.isAuthenticated()

    isShouldOpenToggleMenu = $state.includes('cpanel.index') || $state.includes('cpanel.report')

    $scope.$on '$viewContentLoaded', ->
        if isShouldOpenToggleMenu && !$rootScope.enableScrollShrink
            openToggleMenu()

    openToggleMenu = ->
        isShouldOpenToggleMenu = false
        $timeout ->
            $('#dashboard-toggle-menu').click()
        , 1000

    $scope.toggleNavLeft = ->
        $mdSidenav("left").toggle()
        if isShouldOpenToggleMenu && $rootScope.enableScrollShrink
            openToggleMenu()

.controller "DashboardIndexCtrl", ($rootScope, $scope, $sessionStorage, $mdpDatePicker, $state, Auth, MSHealth) ->

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

    $scope.showConnectMSHealth = -> !Auth.isAuthenticated().MSAccessToken
    if $scope.showConnectMSHealth
        $scope.connectToMSHealth = ->
            Auth.loginMSHealth()
    
    $scope.updateSummaries = ->
        $rootScope.setLoadingState(true)
        utc = moment($scope.currentDate).utc()
        MSHealth.getSummaries
            period: 'daily'
            startTime: utc.startOf('day').toISOString()
            endTime: utc.endOf('day').toISOString()
        .then (resp) ->
            $scope.summary = resp.data.summaries[0]
            $rootScope.setLoadingState(false)
        , (resp) ->
            mdToast.showSimple resp.data.Message, 'danger'
            $rootScope.setLoadingState(false)
    
        MSHealth.getActivities
            activityTypes: 'Sleep'
            activityIncludes: 'Details'
            startTime: utc.startOf('day').toISOString()
            endTime: utc.endOf('day').toISOString()
        .then (resp) ->
            if resp.data.sleepActivities
                $scope.sleepActivities = resp.data.sleepActivities
                for a in $scope.sleepActivities
                    a.sleepDuration = parseTimeToArray(a.sleepDuration)
                $rootScope.setLoadingState(false)
        , (resp) ->
            mdToast.showSimple resp.data.Message, 'danger'
            $rootScope.setLoadingState(false)

    $scope.updateSummaries()
            
