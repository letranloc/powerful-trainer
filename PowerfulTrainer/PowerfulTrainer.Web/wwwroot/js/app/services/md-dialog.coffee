angular.module "services.mdDialog", []
.factory "mdDialog", ($mdDialog, $mdEditDialog, $mdMedia) ->
    return {
        $mdDialog: -> $mdDialog

        showEventSelector: (evt, type, schemas) ->
            $mdDialog.show
                templateUrl: 'dialog/event-model.html'
                controller: ($scope, $mdDialog) ->
                    $scope.title = "Add #{type}"
                    $scope.currentModelIdx = -1
                    $scope.type = type
                    $scope.model = null
                    $scope.schemas = schemas
                    $scope.cancel = ->
                        $mdDialog.cancel()
                    $scope.close = ->
                        $mdDialog.hide($scope.model)
                parent: angular.element(document.body)
                targetEvent: evt
                clickOutsideToClose: true
        
        showConfirm:  (evt, title, content, type) ->
            $mdDialog.show
                templateUrl: 'dialog/confirm.html'
                controller: ($scope, $mdDialog) ->
                    $scope.title = title
                    $scope.type = if type then type else "warn"
                    $scope.content = content
                    $scope.cancel = ->
                        $mdDialog.cancel()
                    $scope.close = ->
                        $mdDialog.hide()
                parent: angular.element(document.body)
                targetEvent: evt
                clickOutsideToClose: true

        showFriendRequests: (evt, requests, isWaitingResponse) ->
            $mdDialog.show
                templateUrl: 'dialog/friend-requests.html'
                controller: ($scope, $mdDialog, Contact, mdToast) ->
                    $scope.contacts = requests
                    $scope.refresh = false
                    $scope.isWaitingResponse = isWaitingResponse
                    $scope.accept = (contact) ->
                        Contact.accept(contact.Username).then (resp) ->
                            $scope.contacts.remove(contact)
                            $scope.refresh = true
                            mdToast.showSimple resp.data.Message, "success"
                        , (resp) ->
                            mdToast.showSimple resp.data.Message, "danger"
                    $scope.decline = (contact) ->
                        Contact.delete(contact.Username).then (resp) ->
                            $scope.contacts.remove(contact)
                            mdToast.showSimple resp.data.Message, "success"
                        , (resp) ->
                            mdToast.showSimple resp.data.Message, "danger"
                    $scope.cancel = ->
                        if $scope.refresh
                            $mdDialog.hide()
                        else
                            $mdDialog.cancel()
                parent: angular.element(document.body)
                targetEvent: evt
                clickOutsideToClose: true
        
        showContactsSelector: (evt) ->
            $mdDialog.show
                templateUrl: 'dialog/share-plan.html'
                controller: ($scope, $mdDialog, AppCfg, Contact, mdToast) ->
                    $scope.selected = []
                    $scope.contacts = 
                        _items: []
                        _query:
                            limit: AppCfg.defaultLimit
                            total: 0
                            page: 1
                        getItemAtIndex: (idx) ->
                            if idx >= this._query.limit * this._query.page
                                this._fetchMoreItems(idx)
                                return null
                            else
                                return this._items[idx]
                        getLength: -> 
                            return Math.min(this._items.length + 5, this._query.total)
                        refresh: ->
                            this._query.page = 1
                            _self = this
                            Contact.getAll(this._query).then (resp) ->
                                _self._items = resp.data.Data.Result
                                _self._query.total = resp.data.Data.Count
                        _fetchMoreItems: (idx) ->
                            if idx < this._query.total
                                this._query.page += 1
                                _self = this
                                Contact.getAll(this._query).then (resp) ->
                                    _self._items = _self._items.concat(resp.data.Data.Result)
                                    _self._query.total = resp.data.Data.Count
                    $scope.contacts.refresh()
                    $scope.toggle = (contact, list) ->
                        idx = list.indexOf(contact)
                        if idx > -1
                            list.splice(idx, 1)
                        else
                            list.push(contact)
                    $scope.exists = (contact, list) ->
                        return list.indexOf(contact) > -1
                    $scope.share = (list) ->
                        $mdDialog.hide(list)
                    $scope.decline = (contact) ->
                        Contact.delete(contact.Username).then (resp) ->
                            $scope.contacts.remove(contact)
                            mdToast.showSimple resp.data.Message, "success"
                        , (resp) ->
                            mdToast.showSimple resp.data.Message, "danger"
                    $scope.cancel = ->
                        $mdDialog.cancel()
                parent: angular.element(document.body)
                targetEvent: evt
                clickOutsideToClose: true

        showExSelector: (evt) ->
            $mdDialog.show
                templateUrl: 'dialog/exercises-dialog.html'
                controller: ($rootScope, $scope, AppCfg, Exercise) ->
                    $scope.selected = []
                    $scope.getVideoSrc = $rootScope.getVideoSrc
                    $scope.exercises = 
                        _items: []
                        _query:
                            limit: AppCfg.defaultLimit
                            total: 0
                            page: 1
                        getItemAtIndex: (idx) ->
                            if idx >= this._query.limit * this._query.page
                                this._fetchMoreItems(idx)
                                return null
                            else
                                return this._items[idx]
                        getLength: -> 
                            return Math.min(this._items.length + 5, this._query.total)
                        refresh: ->
                            this._query.page = 1
                            _self = this
                            Exercise.getAll($scope.name, $scope.bodyPart, $scope.level, $scope.focus, this._query).then (resp) ->
                                _self._items = resp.data.Data.Result
                                _self._query.total = resp.data.Data.Count
                        _fetchMoreItems: (idx) ->
                            if idx < this._query.total
                                this._query.page += 1
                                _self = this
                                Exercise.getAll($scope.name, $scope.bodyPart, $scope.level, $scope.focus, this._query).then (resp) ->
                                    _self._items = _self._items.concat(resp.data.Data.Result)
                                    _self._query.total = resp.data.Data.Count
                    $scope.exercises.refresh()
                    $scope.$watch "[name, bodypart, level, focus]", ->
                        $scope.exercises.refresh()
                    $scope.togglePreview = ($event, showPreview) ->
                        console.log $event
                        if $event.target.tagetName isnt "INPUT"
                            return !showPreview
                        return showPreview
                    $scope.toggle = (ex, list) ->
                        idx = list.indexOf(ex)
                        if idx > -1
                            list.splice(idx, 1)
                        else
                            list.push(ex)
                    $scope.exists = (ex, list) ->
                        return list.indexOf(ex) > -1
                    $scope.loadBodyParts = ->
                        unless $scope.bodyParts
                            Exercise.getBodyPart().then (resp) ->
                                $scope.bodyParts = resp.data.Data
                    $scope.loadFocuss = ->
                        unless $scope.focuss
                            Exercise.getFocus().then (resp) ->
                                $scope.focuss = resp.data.Data
                    $scope.loadLevels = ->
                        unless $scope.levels
                            Exercise.getLevel().then (resp) ->
                                $scope.levels = resp.data.Data
                    $scope.cancel = ->
                        $mdDialog.cancel()
                    $scope.close = (list) ->
                        $mdDialog.hide(list)
                parent: angular.element(document.body)
                targetEvent: evt
                clickOutsideToClose: true
                fullscreen: ($mdMedia('sm') || $mdMedia('xs'))

        showSetEdit: (evt, exercise) ->
            evt.stopPropagation()
            $mdEditDialog.large
                targetEvent: evt
                title: 'Edit set'
                modelValue: exercise.Sets
                type: 'number'
                validators:
                    min: 0
                    max: 99
                save: (input) ->
                    exercise.Sets = input.$modelValue
                    if exercise.Sets > 1
                        exercise.RestTime = "AsNeed"
                    else exercise.RestTime = null

        showCompletionEdit: (evt, exercise) ->
            evt.stopPropagation()
            $mdEditDialog.show
                targetEvent: evt
                templateUrl: 'dialog/edit-completion.html'
                controller: ($scope, $element) ->
                    $scope.duration = 1
                    $scope.selectedIndex = 0
                    $scope.durationMin = 1
                    $scope.durationSec = 0
                    $scope.repetitionCount = 1
                    $scope.repetitionChecker = 1
                    if exercise.Duration
                        $scope.durationMin = Math.floor(exercise.Duration / 60)
                        $scope.durationSec = exercise.Duration % 60
                    else if exercise.Repetitions
                        $scope.selectedIndex = 1
                        $scope.repetition = 1
                        $scope.duration = null
                        if exercise.Repetitions is -1
                            $scope.repetitionChecker = 0
                        else
                            $scope.repetitionChecker = 1
                            $scope.repetitionCount = exercise.Repetitions
                    $scope.cancel = ->
                        $element.remove()
                        return
                    $scope.save = ->
                        console.log $scope
                        if $scope.repetition
                            exercise.Duration = null
                            if +$scope.repetitionChecker is 1
                                exercise.Repetitions = $scope.repetitionCount
                            else exercise.Repetitions = -1
                        else if $scope.duration
                            exercise.Repetitions = null
                            exercise.Duration = "" + ($scope.durationMin*60 + $scope.durationSec)
                        $element.remove()
                        return

        showRestTimeEdit: (evt, exercise) ->
            evt.stopPropagation()
            $mdEditDialog.show
                targetEvent: evt
                templateUrl: 'dialog/edit-rest-between-sets.html'
                controller: ($scope, $element) ->
                    if exercise.Sets < 2 then $scope.cancel()
                    $scope.restTimeChecker = 1
                    $scope.restTimeMin = 1
                    $scope.restTimeSec = 0
                    if exercise.RestTime
                        if exercise.RestTime is "AsNeed"
                            $scope.restTimeChecker = 0
                        else if exercise.RestTime
                            $scope.restTimeMin = Math.floor(exercise.RestTime / 60)
                            $scope.restTimeSec = exercise.RestTime % 60
                    $scope.cancel = ->
                        $element.remove()
                        return
                    $scope.save = ->
                        if +$scope.restTimeChecker is 0
                                exercise.RestTime = "AsNeed"
                        else
                            exercise.RestTime = "" + ($scope.restTimeMin*60 + $scope.restTimeSec)
                        $element.remove()
                        return
        
        showExPreview: (evt, exercise) ->
            evt.stopPropagation()
            $mdEditDialog.show
                targetEvent: evt
                controller: ($scope) ->
                    $scope.exercise = exercise
                templateUrl: 'dialog/exercise-preview.html'
    }