angular.module "services.auth", []
.factory "Auth", ($http, $window, $location, $state, $sessionStorage, cookies, AppCfg, mdToast) ->
    _user = null
    auth =
        login: (identity) ->
            $http.post AppCfg.apiUrl + "/account/login", identity

        logout: ->
            cookies.clearAccesstoken()
            _user = null;

        register: (user) ->
            $http.post AppCfg.apiUrl + "/account/register", user

        loginMSHealth: ->
            $sessionStorage.callback = $state.current.name
            $window.location.href =  AppCfg.apiUrl + "/msaccount/auth?redirectUrl=" + AppCfg.mshealth.redirectUri($location)

        logoutMSHealth: ->
            $sessionStorage.callback = $location.absUrl()
            $window.location.href = AppCfg.mshealth.logoutUrl
                                        .replace("{client_id}", AppCfg.mshealth.clientId)
                                        .replace("{redirect_uri}", encodeURIComponent(AppCfg.mshealth.redirectUri($location)));

        requestTokenMSHealth: (code) ->
            $http
                url: AppCfg.apiUrl + "/msaccount/validate"
                method: 'GET'
                params:
                    code: code

        setUser: (u) ->
            _user = u;
            cookies.setAccesstoken(u)

        validate: (cookie) ->
            $http.get AppCfg.apiUrl + "/user",
                headers:
                    Authorization: cookie.AccessToken

        update: (user) ->
            $http.put AppCfg.apiUrl + "/account", user

        updateMS: (user) ->
            $http.put AppCfg.apiUrl + "/msaccount", user

        isAuthenticated: ->
            if _user
                 _user
            else
                _user = cookies.getAccesstoken()
                if _user
                    auth.validate(_user).then (resp) ->
                        setTimeout ->
                            try
                                invokeCSharpAction("Token:" + resp.data.Data.AccessToken)
                            catch
                        , 500
                        _user = resp.data.Data
                    , (resp) ->
                        auth.logout()
                        mdToast.showSimple "Session expired.", "info"
                    return _user
                else return false

    return auth