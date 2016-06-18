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
        template: "<ui-view />"
        
    .state "cpanel.report.health",
        url: "/health"
        templateUrl: "report/health.html"
        controller: "ReportHealthCtrl"
        resolve:
            $title: -> "Health summary"

    .state "cpanel.report.workout",
        url: "/workout"
        templateUrl: "report/workout.html"
        controller: "ReportWorkoutCtrl"
        resolve:
            $title: -> "Workout summary"

    # Plan
    .state "cpanel.plan",
        abstract: true
        url: "/plans"
        template: "<ui-view />"

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
        template: "<ui-view />"

    .state "cpanel.contact.index",
        url: ""
        templateUrl: "contact/index.html"
        controller: "ContactIndexCtrl"
        resolve:
            $title: -> "Contacts"

.run ($rootScope, $location) ->
    $rootScope.$on '$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) ->
        search = $location.search()
        if search.hasOwnProperty('inapp')
            $rootScope.inApp = search.inapp