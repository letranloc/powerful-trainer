angular.module 'controllers.dashboard', []
.controller 'DashboardCtrl', ($scope, $mdSidenav, $mdMedia, Auth) ->
    $scope.$watch Auth.isAuthenticated, ->
        $scope.User = Auth.isAuthenticated()

    $scope.toggleNavLeft = ->
        $mdSidenav("left").toggle()

.controller "DashboardIndexCtrl", ($scope, $state, $timeout) ->
    $scope.title = "Dashboard"