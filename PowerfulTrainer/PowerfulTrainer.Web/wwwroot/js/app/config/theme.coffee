angular.module "config.theme", []
.config ($mdThemingProvider) ->
    $mdThemingProvider.definePalette('teal', $mdThemingProvider.extendPalette('teal', {
        'contrastDefaultColor': 'light'
    }))

    $mdThemingProvider.theme("default")
        .primaryPalette("teal")
        .accentPalette("pink")
        .warnPalette("red")

    $mdThemingProvider.theme('default-dark', 'default')
        .dark();

    $mdThemingProvider.theme('default-yellow-dark', 'default')
        .primaryPalette("yellow")
        .dark()

    # Toast themes
    $mdThemingProvider.theme("info-toast")
    $mdThemingProvider.theme("success-toast")
    $mdThemingProvider.theme("danger-toast")

    $mdThemingProvider.setDefaultTheme("default")