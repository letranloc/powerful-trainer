angular.module "services.auth", []
.factory "Auth", ($http, $window, $location, $timeout, $state, $sessionStorage, cookies, AppCfg, mdToast) ->
    _user = null
    refreshMSAccessToken = (u) ->
        if u.MSAccessToken
            delay = moment(u.MSExpireDate).unix() - moment().unix()
            if delay < 0
                delay = 0
            $timeout ->
                auth.requestTokenMSHealth().then (resp) ->
                    auth.setUser(resp.data.Data)
                    refreshMSAccessToken(resp.data.Data)
                , -> # retry atfer 1s
                    $timeout ->
                        refreshMSAccessToken(u)
                    , 1000
            , delay*1000

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
                        $timeout ->
                            try
                                invokeCSharpAction("Token:" + resp.data.Data.AccessToken)
                            catch
                        , 500
                        auth.setUser(resp.data.Data)
                        refreshMSAccessToken(_user)
                    , (resp) ->
                        auth.logout()
                        mdToast.showSimple "Session expired.", "info"
                    return _user
                else return false

    return auth