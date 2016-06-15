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
        Plan.get(plan.ID).then (resp) ->
            invokeCSharpAction('plan:' + JSON.stringify(resp.data.Data))
        , (resp) ->
            mdToast.showSimple resp.data.Message, "danger"

    $scope.share = (evt, plan) ->
        $mdMenu.hide()
        mdDialog.showContactsSelector(evt).then (contacts) ->
            for contact in contacts
                Plan.share(plan.ID, contact.Username).then (resp) ->
                    mdToast.showSimple "Shared plan \"#{plan.Name}\" to #{contact.Name||contact.Username}", "success"
                , (resp) ->
                    mdToast.showSimple resp.data.Message, "danger"

    $scope.delete = (evt, plan) ->
        mdDialog.showConfirm(evt, "Delete plan", "Are you sure?")
        .then ->
            Plan.delete(plan.ID).then (resp) ->
                $scope.plans.remove(plan)
                mdToast.showSimple resp.data.Message, "success"
            , (resp) ->
                mdToast.showSimple resp.data.Message, "danger"

.controller "PlanCreateCtrl", ($scope, $stateParams, $state, $q, $timeout, cookies, mdDialog, mdToast, Plan, EventModel) ->
    if $stateParams.id
        Plan.get($stateParams.id).then (resp) ->
            $scope.plan = resp.data.Data
            $scope.plan.ID = $stateParams.id
        , (resp) ->
            mdToast.showSimple resp.data.Message, "danger"
            $state.go('cpanel.plan.index')
    else
        $scope.plan =
            Name: "New Workout Plan"
            PlanData: []
        $timeout ->
            cookies.learnTutorial(cookies.TUTORIAL_CHANGE_PLAN_IMAGE_LEARNED)
        , 3000

    $scope.isSaving = false

    $scope.eventModel = 
        conditions: []
        actions: []

    EventModel.getConditions().then (resp) ->
        $scope.eventModel.conditions = resp.data.Data
    , (resp) ->
        mdToast.showSimple resp.data.Message, "danger"
    EventModel.getActions().then (resp) ->
        $scope.eventModel.actions = resp.data.Data
    , (resp) ->
        mdToast.showSimple resp.data.Message, "danger"

    $scope.showPlanImagePicker = ->
        $('#planImagePicker').click()
        return

    $scope.setPlanImage = (event, objects, files) ->
        $scope.plan.Image = "data:" + objects[0].filetype + ";base64," + objects[0].base64

    $scope.addCondition = (evt, bundle) ->
        mdDialog.showEventSelector(evt, "condition", $scope.eventModel.conditions)
        .then (model) ->
            bundle.Conditions.push(model) if model

    $scope.addAction = (evt, event) ->
        mdDialog.showEventSelector(evt, "action", $scope.eventModel.actions)
        .then (model) ->
            event.Actions.push(model) if model                 

    $scope.validate = (plan) ->
        for event in plan.PlanData
            return false unless event.Actions.length
        return true

    $scope.save = ->
        if $scope.validate($scope.plan)
            $scope.isSaving = true
            if $scope.plan.ID
                Plan.update($scope.plan).then (resp) ->
                    mdToast.showSimple resp.data.Message, "success"
                    $state.go("cpanel.plan.edit", {id: $scope.plan.ID})
                    $scope.isSaving = false
                , (resp) ->
                    mdToast.showSimple resp.data.Message, "danger"
                    $scope.isSaving = false
            else
                Plan.add($scope.plan).then (resp) ->
                    mdToast.showSimple resp.data.Message, "success"
                    $state.go("cpanel.plan.edit", {id: resp.data.Data.ID})
                , (resp) ->
                    mdToast.showSimple resp.data.Message, "danger"
                    $scope.isSaving = false
        else
            mdToast.showSimple "Each event must have at least one action", "danger"