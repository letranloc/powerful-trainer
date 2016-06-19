app = angular.module 'app', [
    'ngRoute'
    'ngCookies'
    'ngStorage'
    'ui.router'
    'ui.router.title'
    'cfp.loadingBar'
    'ngAnimate'
    'ngMessages'
    'ngMaterial'
    'mdPickers'
    'ui.sortable'
    'ngMenuSidenav'
    'highcharts-ng'
    'hmTouchEvents'
    'angularInlineEdit'
    'validation.match'
    'naif.base64'
    'md.data.table'
    'templates'
    'app.shared'
    'app.config'
    'app.services'
    'app.resources'
    'app.directives'
    'app.controllers'
]

app.value "AppCfg",
    apiUrl: "/api"
    requestInterval: 5000
    defaultLimit: 20
    defaultLimitOptions: [20, 30, 50]