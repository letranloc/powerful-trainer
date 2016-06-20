angular.module "config.auth", []
.run ($rootScope, $state, $http, Auth) ->
    $rootScope.$on "$stateChangeSuccess", (e) ->
        checkAuthentication() 

    $rootScope.$watch Auth.isAuthenticated, (value, old) ->
        checkAuthentication()

    checkAuthentication = ->
        if !Auth.isAuthenticated() && !$state.is("login") && !$state.is("register")
            $state.go("login")
        else  if Auth.isAuthenticated()
            $http.defaults.headers.common.Authorization = Auth.isAuthenticated().AccessToken
            if $state.is("login") || $state.is("register")
                $state.go("cpanel.index")
