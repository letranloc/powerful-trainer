angular.module "controllers.profile", []
.controller "ProfileIndexCtrl", ($scope, Auth) ->
    $scope.$watch Auth.isAuthenticated, ->
        $scope.user = Auth.isAuthenticated()

    $scope.progressing = false

    $scope.showUserAvatarPicker = (form) ->
        form.userAvatar.$setValidity("maxsize", true)
        form.userAvatar.$setValidity("accept", true)
        $('#userAvatarPicker').click()
        return

    $scope.isValidForm = (form) ->
        unless $scope.user.password then return false
        else if $scope.user.new_password is "" || !$scope.user.new_password
            form.new_password.$setValidity('match', true)
            form.new_password_confirmation.$setValidity('match', true)
        return form.$valid

    $scope.setUserAvatar = (event, objects, files) ->
        $scope.user.Avatar = "data:" + objects[0].filetype + ";base64," + objects[0].base64

    $scope.update = (form) ->
        $scope.progressing = !$scope.progressing
        form.$valid
        