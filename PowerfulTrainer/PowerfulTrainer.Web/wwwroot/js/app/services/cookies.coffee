angular.module "services.cookies", []
.factory "cookies", ($cookies, $sessionStorage, mdToast) ->    
    cookies =
        _tutorialdelay: 2000
        _tutorialHideDelay: 10000

        ACCESS_TOKEN: "access_token"
        TUTORIAL_CHANGE_PLAN_IMAGE_LEARNED: "tutorial_change_plan_image_learned"
        TUTORIAL_CHANGE_PLAN_IMAGE_LEARNED_TEXT: "Tips: Click on plan image to change"

        $cookies: -> $cookies

        setAccesstoken: (user) ->
            $cookies.putObject cookies.ACCESS_TOKEN, {Username: user.Username, AccessToken: user.AccessToken, MSAccessToken: user.MSAccessToken},
                        expires: user.ExpireDate

        getAccesstoken: -> $cookies.getObject(cookies.ACCESS_TOKEN)

        clearAccesstoken: -> $cookies.remove(cookies.ACCESS_TOKEN)

        setTutorialLearned: (tutorial) ->
            $sessionStorage[tutorial] = true

        learnTutorial: (tutorial) ->
            unless this.isTutorialLearned(tutorial)
                mdToast.show(mdToast.simple()
                    .textContent(cookies.TUTORIAL_CHANGE_PLAN_IMAGE_LEARNED_TEXT)
                    .action("I KNOW")
                    .highlightAction(true)
                    .position("bottom right")
                    .hideDelay(cookies._tutorialHideDelay))
                .then (resp) ->
                    if resp is "ok"
                        cookies.setTutorialLearned(tutorial)
                
        isTutorialLearned: (tutorial) ->
            !!$sessionStorage[tutorial]

    return cookies;