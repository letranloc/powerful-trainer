angular.module "controllers.profile", []
.controller "ProfileIndexCtrl", ($scope, $timeout, Auth, mdToast, mdDialog) ->
    $scope.$watch Auth.isAuthenticated, ->
        $scope.user = angular.copy(Auth.isAuthenticated())
        $scope.user.Birthday = new Date($scope.user.Birthday)
        $timeout ->
            if $scope.profileForm
                $scope.profileForm.password.$setValidity('required', true)

    $scope.progressing = false

    $scope.connectToMSHealth = ->
        Auth.loginMSHealth()

    $scope.disconnectToMSHealth = (evt) ->
        mdDialog.showConfirm(evt, "Confirm", "Are you sure?", "warn").then ->
            $scope.progressing = true
            user = 
                MSAccessToken: ""
            Auth.updateMS(user).then (resp) ->
                $scope.user.MSAccessToken = null
                Auth.setUser($scope.user)
                mdToast.showSimple "Success", "success"
                $scope.progressing = false
            , (resp) ->
                mdToast.showSimple resp.data.Message, "danger"
                $scope.progressing = false
            

    $scope.showUserAvatarPicker = (form) ->
        $('#userAvatarPicker').click()
        return

    $scope.isValidForm = (form) ->
        unless $scope.user.CurrentPassword then return false
        else if $scope.user.password is "" || !$scope.user.password
            form.new_password.$setValidity('match', true)
            form.new_password_confirmation.$setValidity('match', true)
        return form.$valid

    $scope.setUserAvatar = (event, objects, files) ->
        $scope.user.Avatar = "data:" + objects[0].filetype + ";base64," + objects[0].base64

    $scope.removeAvatar = (form) ->
        form.userAvatar.$setValidity("maxsize", true)
        form.userAvatar.$setValidity("accept", true)
        $scope.user.Avatar = null
        $scope.userAvatar = null

    $scope.update = (form) ->
        if $scope.isValidForm(form)
            $scope.progressing = true
            Auth.update($scope.user).then (resp) ->
                if resp.data.ReturnCode is 0
                    Auth.setUser(resp.data.Data)
                    mdToast.showSimple "Success", "success"
                else mdToast.showSimple resp.data.Message, "danger"
                $scope.progressing = false
            , (resp) ->
                mdToast.showSimple resp.data.Message, "danger"
                $scope.progressing = false
                
                
        