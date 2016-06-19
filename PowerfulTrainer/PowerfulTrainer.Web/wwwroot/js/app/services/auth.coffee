angular.module "services.auth", []
.factory "Auth", ($http, cookies, AppCfg, mdToast) ->
    _user = null
    auth =
        login: (identity) ->
            $http.post AppCfg.apiUrl + "/account/login", identity

        logout: ->
            cookies.clearAccesstoken()
            _user = null;

        register: (user) ->
            $http.post AppCfg.apiUrl + "/account/register", user

        setUser: (u) ->
            _user = u;
            cookies.setAccesstoken(u)

        validate: (cookie) ->
            $http.get AppCfg.apiUrl + "/user",
                headers:
                    Authorization: cookie.AccessToken

        update: (user) ->
            $http.put AppCfg.apiUrl + "/account", user,
                headers:
                   Authorization : _user.AccessToken

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