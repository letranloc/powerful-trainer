angular.module 'controllers.auth', []
.controller 'AuthCtrl', ($scope, $state, mdToast, Auth) ->
    $scope.progressing = false;

    $scope.user = {}

    $scope.showUserAvatarPicker = (form) ->
        $scope.userAvatar = null
        form.userAvatar.$setValidity("maxsize", true)
        form.userAvatar.$setValidity("accept", true)
        $('#userAvatarPicker').click()
        return

    $scope.setUserAvatar = (event, objects, files) ->
        $scope.user.avatar = "data:" + objects[0].filetype + ";base64," + objects[0].base64

    $scope.isValidForm = (form) ->
        form.$valid

    $scope.login = (form) ->
        if !$scope.isValidForm(form) || $scope.progressing then return
        if form.$valid
            $scope.progressing = true
            Auth.login($scope.user).then (resp) ->
                data = resp.data
                if data.ReturnCode is 0
                    mdToast.showSimple data.Message, "success"
                    try
                        invokeCSharpAction("Token:" + data.Data.AccessToken)
                    catch
                    Auth.setUser(data.Data)
                else
                    mdToast.showSimple data.Message, "danger"
                    $scope.progressing = false
            ,(resp) ->
                mdToast.showSimple resp.data.Message, "danger"
                $scope.progressing = false

    $scope.register = (form) ->
        if !$scope.user.checkbox || !$scope.isValidForm(form) || $scope.progressing then return
        if form.$valid
            $scope.progressing = true
            Auth.register($scope.user).then (resp) ->
                data = resp.data
                $scope.progressing = false
                if data.ReturnCode is 0
                    mdToast.showSimple data.Message, "success"
                    $state.go('login')
                else
                    mdToast.showSimple data.Message, "danger"
            , (resp) ->
                $scope.progressing = false;
                mdToast.showSimple resp.data.Message, "danger"

    $scope.logout = ->
        Auth.logout()
        mdToast.showSimple "Success", "success"