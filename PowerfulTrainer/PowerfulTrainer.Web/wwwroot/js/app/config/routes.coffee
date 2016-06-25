angular.module 'config.routes', []
.config ($urlMatcherFactoryProvider, $stateProvider, $urlRouterProvider) ->
    $urlMatcherFactoryProvider.caseInsensitive(true)
    $urlMatcherFactoryProvider.strictMode(false)
    $urlRouterProvider.otherwise("/")

    $stateProvider
    # Auth
    .state "login",
        url: "/login"
        templateUrl: "auth/login.html"
        controller: "AuthCtrl"
        resolve:
            $title: -> "Login"

    .state "register",
        url: "/register"
        templateUrl: "auth/register.html"
        controller: "AuthCtrl"
        resolve:
            $title: -> "Register"

    .state 'callback',
        url: "/auth/:provider/callback"
        controller: "AuthCallbackCtrl"
        template: '<small>Redirecting, please waiting...</small>'
        resolve:
            $title: -> "Redirecting"

    .state "cpanel",
        abstract: true
        url: ""
        templateUrl: "layout/dashboard.html"

    # Dashboard
    .state "cpanel.index",
        url: ""
        templateUrl: "dashboard/index.html"
        controller: "DashboardIndexCtrl"
        resolve:
            $title: -> "Dashboard"

    .state "cpanel.report",
        abstract: true
        url: "/report"
        templateUrl: "layout/container.html"
        
    # Report
    .state "cpanel.report.health",
        url: "/health/:chartType"
        templateUrl: "report/health.html"
        controller: "ReportHealthCtrl"
        resolve:
            $title: -> "Health summary"

    .state "cpanel.report.workout",
        url: "/workout/:username/:date"
        templateUrl: "report/workout.html"
        controller: "ReportWorkoutCtrl"
        resolve:
            $title: -> "Workout summary"

    # Plan
    .state "cpanel.plan",
        abstract: true
        url: "/plans"
        templateUrl: "layout/container.html"

    .state "cpanel.plan.index",
        url: ""
        templateUrl: "plan/index.html"
        controller: "PlanIndexCtrl"
        resolve:
            $title: -> "Workout Plans"

    .state "cpanel.plan.create",
        url: "/create"
        templateUrl: "plan/build.html"
        controller: "PlanCreateCtrl"
        resolve:
            $title: -> "Create"
            
    .state "cpanel.plan.edit",
        url: "/{id:[0-9]+}/edit"
        templateUrl: "plan/build.html"
        controller: "PlanCreateCtrl"
        resolve:
            $title: -> "Update"
    
    # Contact
    .state "cpanel.contact",
        abstract: true
        url: "/contacts"
        templateUrl: "layout/container.html"

    .state "cpanel.contact.index",
        url: ""
        templateUrl: "contact/index.html"
        controller: "ContactIndexCtrl"
        resolve:
            $title: -> "Contacts"

    # Profile
    .state "cpanel.profile",
        url: '/profile'
        templateUrl: "profile/index.html"
        controller: "ProfileIndexCtrl"
        resolve:
            $title: -> "Update profile"

.run ($rootScope, $location) ->
    $rootScope.$on '$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) ->
        search = $location.search()
        if search.hasOwnProperty('inapp')
            $rootScope.inApp = search.inapp