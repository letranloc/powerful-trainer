angular.module "config.auth", []
.run ($rootScope, $state, Auth) ->
    $rootScope.$on "$stateChangeSuccess", (e) ->
        checkAuthentication() 

    $rootScope.$watch Auth.isAuthenticated, (value, old) ->
        checkAuthentication()

    checkAuthentication = ->
        if !Auth.isAuthenticated() && !$state.is("login") && !$state.is("register")
            $state.go("login")
        else if $state.is("login") || $state.is("register")
            if Auth.isAuthenticated()
                $state.go("cpanel.index")       
