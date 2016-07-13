angular.module 'controllers.dashboard', []
.controller 'DashboardCtrl', ($rootScope, $scope, $mdSidenav, $mdMedia, $timeout, $state, Auth) ->
    $scope.$watch Auth.isAuthenticated, ->
        $scope.User = Auth.isAuthenticated()

    isOpenedToggleMenu = false;

    isShouldOpenToggleMenu = ->
        if $state.includes('cpanel.index') || $state.includes('cpanel.report')
            if $('#dashboard-toggle-menu').find('md-menu-sidenav-content').css('max-height') is '0px'
                return true
        return false

    $scope.$on '$viewContentLoaded', ->
        $timeout ->
            if isShouldOpenToggleMenu() && !$rootScope.enableScrollShrink
                openToggleMenu()

    openToggleMenu = ->
        unless isOpenedToggleMenu
            isOpenedToggleMenu = true
            $timeout ->
                $('#dashboard-toggle-menu').find('md-toogle-menu').click()

    $scope.toggleNavLeft = ->
        $mdSidenav("left").toggle()
        if isShouldOpenToggleMenu() && $rootScope.enableScrollShrink
            openToggleMenu()

.controller "DashboardIndexCtrl", ($rootScope, $scope, $sessionStorage, $mdpDatePicker, $state, Auth, MSHealth, mdToast) ->

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
        utc = moment($scope.currentDate)
        MSHealth.getSummaries
            period: 'daily'
            startTime: utc.startOf('day').toISOString()
            endTime: utc.endOf('day').toISOString()
        .then (resp) ->
            $scope.summary = resp.data.summaries[0]
            $rootScope.setLoadingState(false)
        , (resp) ->
            #mdToast.showSimple resp.data.Message, 'danger'
            $rootScope.setLoadingState(false)
    
        MSHealth.getActivities
            activityTypes: 'Sleep,Run'
            activityIncludes: 'Details'
            startTime: utc.startOf('day').toISOString()
            endTime: utc.endOf('day').toISOString()
        .then (resp) ->
            if resp.data.sleepActivities
                $scope.sleepActivities = resp.data.sleepActivities
                for a in $scope.sleepActivities
                    a.sleepDuration = parseTimeToArray(a.sleepDuration, 'H:m:s')
            if resp.data.runActivities
                $scope.runActivities = resp.data.runActivities
                for a in $scope.runActivities
                    a.duration = parseTimeToArray(a.duration, 'H:m:s')
                    a.distanceSummary.totalDistance = Math.round(a.distanceSummary.totalDistance/1000)/100
            $rootScope.setLoadingState(false)
        , (resp) ->
            #mdToast.showSimple resp.data.Message, 'danger'
            $rootScope.setLoadingState(false)

    $scope.updateSummaries()
            
