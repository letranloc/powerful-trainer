angular.module "controllers.plan", []
.controller "PlanIndexCtrl", ($rootScope, $scope, $state, $mdBottomSheet, $location, $mdMenu, AppCfg, mdDialog, mdToast, Plan, EventModel) ->
    $scope.query =
        limit: $location.search().limit || AppCfg.defaultLimit
        limitOptions: AppCfg.defaultLimitOptions
        page: $location.search().page || 1
        total: 0

    $scope.updateLocationSearch = false

    $scope.getPlans = ->
        $rootScope.setLoadingState(true)
        Plan.getAll($scope.query).then (resp) ->
            $scope.plans = resp.data.Data.Result
            $scope.query.total = resp.data.Data.Count
            if $scope.updateLocationSearch
                $location.search('limit', $scope.query.limit)
                $location.search('page', $scope.query.page)
            else $scope.updateLocationSearch = false
            $rootScope.setLoadingState(false)
        , (resp) ->
            mdToast.showSimple resp.data.Message, "danger"
            $rootScope.setLoadingState(false)
    $scope.getPlans(true)

    $scope.openPTCard = ->
        invokeCSharpAction('PTCard:')

    $scope.startWorkout = (plan) ->
        $rootScope.setLoadingState(true)
        Plan.get(plan.Id).then (resp) ->
            invokeCSharpAction('plan:' + JSON.stringify(resp.data.Data))
            $rootScope.setLoadingState(false)
        , (resp) ->
            mdToast.showSimple resp.data.Message, "danger"
            $rootScope.setLoadingState(false)

    $scope.share = (evt, plan) ->
        $mdMenu.hide()
        mdDialog.showContactsSelector(evt, plan).then (contacts) ->
            for contact in contacts
                Plan.share(plan.Id, contact.Username).then (resp) ->
                    mdToast.showSimple "Shared plan \"#{plan.Name}\" to #{contact.Name||contact.Username}", "success"
                , (resp) ->
                    mdToast.showSimple resp.data.Message, "danger"

    $scope.delete = (evt, plan) ->
        $rootScope.setLoadingState(true)
        mdDialog.showConfirm(evt, "Delete plan", "Are you sure?")
        .then ->
            Plan.delete(plan.Id).then (resp) ->
                $scope.plans.remove(plan)
                mdToast.showSimple resp.data.Message, "success"
                $rootScope.setLoadingState(false)
            , (resp) ->
                mdToast.showSimple resp.data.Message, "danger"
                $rootScope.setLoadingState(false)

.controller "PlanCreateCtrl", ($rootScope, $scope, $stateParams, $state, $q, $timeout, cookies, mdDialog, mdToast, Plan, Exercise) ->
    if $stateParams.id
        Plan.get($stateParams.id).then (resp) ->
            $scope.plan = resp.data.Data
            $scope.plan.Id = $stateParams.id
        , (resp) ->
            mdToast.showSimple resp.data.Message, "danger"
            $state.go('cpanel.plan.index')
    else
        $scope.plan =
            Name: "New Workout Plan"
            Data: []
        $timeout ->
            cookies.learnTutorial(cookies.TUTORIAL_CHANGE_PLAN_IMAGE_LEARNED)
        , 3000

    $scope.isSaving = false
    $scope.selected = []

    $scope.showPlanImagePicker = ->
        $('#planImagePicker').click()
        return

    $scope.setPlanImage = (event, objects, files) ->
        $scope.plan.Image = "data:" + objects[0].filetype + ";base64," + objects[0].base64

    $scope.addExercise = ($event) ->
        mdDialog.showExSelector($event).then (list) ->
            for ex in list
                ex.Sets = 1
                $scope.plan.Data.push(ex)
                

    $scope.showExPreview = ($event, ex) ->
        unless ex.IsRestItem
            mdDialog.showExPreview($event, ex)

    $scope.getThumbnail = (ex) ->
        if ex.IsRestItem
            ex.Thumbnail
        else Exercise.getThumbnail(ex.Id)

    $scope.editSets = ($event, ex) ->
        unless ex.IsRestItem
            mdDialog.showSetEdit($event, ex)
            
    $scope.editCompletion = ($event, ex) ->
        mdDialog.showCompletionEdit($event, ex)

    $scope.editRestTime = ($event, ex) ->
        if ex.Sets > 1
            mdDialog.showRestTimeEdit($event, ex)

    $scope.removeEx = (evt) ->
        for ex in $scope.selected
            $scope.plan.Data.remove(ex)
        $scope.selected = []

    $scope.validate = (plan) ->
        valid = plan.Data.length > 0
        for ex in plan.Data
            console.log ex
            break unless valid
            if !ex.IsRestItem && !ex.Repetitions && !ex.Duration
                valid = false
        return valid

    $scope.save = ->
        if $scope.validate($scope.plan)
            $scope.isSaving = true
            $rootScope.setLoadingState(true)
            if $scope.plan.Id
                Plan.update($scope.plan).then (resp) ->
                    mdToast.showSimple resp.data.Message, "success"
                    $state.go("cpanel.plan.edit", {id: $scope.plan.Id})
                    $scope.isSaving = false
                    $rootScope.setLoadingState(false)
                , (resp) ->
                    mdToast.showSimple resp.data.Message, "danger"
                    $scope.isSaving = false
                    $rootScope.setLoadingState(false)
            else
                Plan.add($scope.plan).then (resp) ->
                    mdToast.showSimple resp.data.Message, "success"
                    $rootScope.setLoadingState(false)
                    $state.go("cpanel.plan.edit", {id: resp.data.Data.Id})
                , (resp) ->
                    mdToast.showSimple resp.data.Message, "danger"
                    $scope.isSaving = false
                    $rootScope.setLoadingState(false)
        else
            mdToast.showSimple "Invalid plan. Please check exercises and try again.", "danger"