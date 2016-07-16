angular.module "services.mdToast", []
.factory "mdToast", ($mdToast) ->
    return {
        $mdToast: -> $mdToast

        show: (optionsOrPreset) ->
            $mdToast.show(optionsOrPreset)

        hide: (response) ->
            $mdToast.hide(response)

        cancel: (response) ->
            $mdToast.cancel(response)

        simple: -> $mdToast.simple()

        showSimple: (message, type) ->
            if message && message isnt '' && message.length > 5
                unless type
                    $mdToast.show($mdToast.simple().textContent(message).position("bottom right").hideDelay(3000))
                else
                    $mdToast.show($mdToast.simple().textContent(message).position("bottom right").hideDelay(3000).theme(type + "-toast"))
    }