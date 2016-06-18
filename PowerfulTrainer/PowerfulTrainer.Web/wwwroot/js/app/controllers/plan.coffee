angular.module "controllers.plan", []
.controller "PlanIndexCtrl", ($scope, $state, $mdBottomSheet, $location, $mdMenu, AppCfg, mdDialog, mdToast, Plan, EventModel) ->
    $scope.query =
        limit: $location.search().limit || AppCfg.defaultLimit
        limitOptions: AppCfg.defaultLimitOptions
        page: $location.search().page || 1
        total: 0

    $scope.updateLocationSearch = false

    $scope.getPlans = ->
        Plan.getAll($scope.query).then (resp) ->
            $scope.plans = resp.data.Data.Result
            $scope.query.total = resp.data.Data.Count
            if $scope.updateLocationSearch
                $location.search('limit', $scope.query.limit)
                $location.search('page', $scope.query.page)
            else $scope.updateLocationSearch = false
        , (resp) ->
            mdToast.showSimple resp.data.Message, "danger"
    $scope.getPlans(true)

    $scope.startWorkout = (plan) ->
        Plan.get(plan.Id).then (resp) ->
            invokeCSharpAction('plan:' + JSON.stringify(resp.data.Data))
        , (resp) ->
            mdToast.showSimple resp.data.Message, "danger"

    $scope.share = (evt, plan) ->
        $mdMenu.hide()
        mdDialog.showContactsSelector(evt).then (contacts) ->
            for contact in contacts
                Plan.share(plan.Id, contact.Username).then (resp) ->
                    mdToast.showSimple "Shared plan \"#{plan.Name}\" to #{contact.Name||contact.Username}", "success"
                , (resp) ->
                    mdToast.showSimple resp.data.Message, "danger"

    $scope.delete = (evt, plan) ->
        mdDialog.showConfirm(evt, "Delete plan", "Are you sure?")
        .then ->
            Plan.delete(plan.Id).then (resp) ->
                $scope.plans.remove(plan)
                mdToast.showSimple resp.data.Message, "success"
            , (resp) ->
                mdToast.showSimple resp.data.Message, "danger"

.controller "PlanCreateCtrl", ($scope, $stateParams, $state, $q, $timeout, cookies, mdDialog, mdToast, Plan, Exercise) ->
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
        mdDialog.showExPreview($event, ex)

    $scope.editSets = ($event, ex) ->
        mdDialog.showSetEdit($event, ex)
            
    $scope.editCompletion = ($event, ex) ->
        mdDialog.showCompletionEdit($event, ex)

    $scope.editRestTime = ($event, ex) ->
        if ex.Sets > 1
            mdDialog.showRestTimeEdit($event, ex)

    $scope.removeEx = ->
        mdDialog.showConfirm(evt, "Delete plan", "Are you sure?")
        .then ->
            for ex, i in $scope.selected
                $scope.plan.Data.splice(i, 1)

    $scope.validate = (plan) ->
        return plan.Data.length > 0

    $scope.save = ->
        if $scope.validate($scope.plan)
            $scope.isSaving = true
            if $scope.plan.Id
                Plan.update($scope.plan).then (resp) ->
                    mdToast.showSimple resp.data.Message, "success"
                    $state.go("cpanel.plan.edit", {id: $scope.plan.Id})
                    $scope.isSaving = false
                , (resp) ->
                    mdToast.showSimple resp.data.Message, "danger"
                    $scope.isSaving = false
            else
                Plan.add($scope.plan).then (resp) ->
                    mdToast.showSimple resp.data.Message, "success"
                    $state.go("cpanel.plan.edit", {id: resp.data.Data.Id})
                , (resp) ->
                    mdToast.showSimple resp.data.Message, "danger"
                    $scope.isSaving = false
        else
            mdToast.showSimple "Each plan must have at least one exercise", "danger"

.filter "CompletionFilter", ->
    return (input) ->
        if input.Repetitions
            if input.Repetitions is -1
                return "Max reps"
            else return input.Repetitions + " reps"
        else if input.Duration
            min = Math.floor(input.Duration / 60);
            sec = input.Duration % 60;
            str = ""
            if min > 0
                if sec > 0 then str = min + " min " + sec + " sec"
                else str = min + " minutes"
            else str = sec + " seconds"
            return str
        else return "Select"

.filter "RestTimeFilter", ->
    return (input) ->
        if input.Sets > 1
            if input.RestTime is 'AsNeed'
                return "As need"
            else
                min = Math.floor(input.RestTime / 60);
                sec = input.RestTime % 60;
                str = ""
                if min > 0
                    if sec > 0 then str = min + " min " + sec + " sec"
                    else str = min + " minutes"
                else str = sec + " seconds"
                return str
        else return ""