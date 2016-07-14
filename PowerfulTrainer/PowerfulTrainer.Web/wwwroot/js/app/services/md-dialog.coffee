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
        
        showContactsSelector: (evt, plan) ->
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
                    $scope.share = (list) ->
                        $mdDialog.hide(list)
                    $scope.shareViaQR = ->
                        invokeCSharpAction('sharebyqr:' + plan.Id)
                        $scope.cancel()
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
                    $scope.restItem = 
                        Name: 'Rest'
                        Thumbnail: '../images/rest-exercise-gray.png'
                        IsRestItem: true
                    $scope.getVideoSrc = $rootScope.getVideoSrc
                    $scope.currentItemPre = null;
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
                                item = this._items[idx]
                                item.idx = idx if item
                                return item
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
                    $scope.getThumbnail = (ex) ->
                        if ex
                            if ex.IsRestItem
                                ex.Thumbnail
                            else Exercise.getThumbnail(ex.Id)
                    $scope.showExPreview = (ex) ->
                        if ex
                            if ex.showPreview
                                $scope.currentItemPre = null
                            else
                                if $scope.currentItemPre
                                    $scope.currentItemPre.showPreview = false
                                $scope.currentItemPre = ex
                                $scope.topIndex = ex.idx + 1
                            ex.showPreview = !ex.showPreview
                    $scope.$watch "[name, bodypart, level, focus]", ->
                        $scope.exercises.refresh()
                    $scope.togglePreview = ($event, showPreview) ->
                        console.log $event
                        if $event.target.tagetName isnt "INPUT"
                            return !showPreview
                        return showPreview
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
            $mdDialog.show
                templateUrl: 'dialog/edit-sets.html'
                controller: ($scope, $mdDialog) ->
                    $scope.sets = exercise.Sets
                    $scope.cancel = ->
                        $mdDialog.cancel()
                    $scope.close = ->
                        if 0 <= $scope.sets <= 99
                            if $scope.sets > 1
                                exercise.RestTime = "As need"
                            else exercise.RestTime = null
                            exercise.Sets = $scope.sets
                            $mdDialog.hide()
                parent: angular.element(document.body)
                targetEvent: evt
                clickOutsideToClose: true

        showCompletionEdit: (evt, exercise) ->
            $mdDialog.show
                templateUrl: 'dialog/edit-completion.html'
                controller: ($scope, $mdDialog) ->
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
                        $mdDialog.cancel()
                    $scope.close = ->
                        hide = false
                        if $scope.repetition
                            exercise.Duration = null
                            if +$scope.repetitionChecker is 1
                                if 0 < $scope.repetitionCount < 1000
                                    exercise.Repetitions = $scope.repetitionCount
                            else
                                exercise.Repetitions = -1
                                hide = true
                        else if $scope.duration
                            if (0 <= $scope.durationMin < 100) && (0 <= $scope.durationSec < 60)
                                hide = true
                                exercise.Repetitions = null
                                exercise.Duration = "" + ($scope.durationMin*60 + $scope.durationSec)
                        $mdDialog.hide() if hide
                parent: angular.element(document.body)
                targetEvent: evt
                clickOutsideToClose: true

        showRestTimeEdit: (evt, exercise) ->
            $mdDialog.show
                templateUrl: 'dialog/edit-rest-between-sets.html'
                controller: ($scope, $mdDialog) ->
                    if exercise.Sets < 2 then $scope.cancel()
                    $scope.restTimeChecker = 1
                    $scope.restTimeMin = 1
                    $scope.restTimeSec = 0
                    if exercise.RestTime
                        if exercise.RestTime is "As need"
                            $scope.restTimeChecker = 0
                        else if exercise.RestTime
                            $scope.restTimeMin = Math.floor(exercise.RestTime / 60)
                            $scope.restTimeSec = exercise.RestTime % 60
                    $scope.cancel = ->
                        $mdDialog.cancel()
                    $scope.close = ->
                        hide = false
                        if +$scope.restTimeChecker is 0
                            exercise.RestTime = "As need"
                            hide = true
                        else
                            if (0 <= $scope.restTimeMin < 100) && (0 <= $scope.restTimeSec < 60)
                                exercise.RestTime = "" + ($scope.restTimeMin*60 + $scope.restTimeSec)
                                hide = true
                        $mdDialog.hide() if hide
                parent: angular.element(document.body)
                targetEvent: evt
                clickOutsideToClose: true
        
        showExPreview: (evt, exercise) ->
            $mdDialog.show
                templateUrl: 'dialog/exercise-preview.html'
                controller: ($rootScope, $scope, $mdDialog) ->
                    $scope.exercise = exercise
                    $scope.getVideoSrc = $rootScope.getVideoSrc
                    $scope.cancel = ->
                        $mdDialog.cancel()
                parent: angular.element(document.body)
                targetEvent: evt
                clickOutsideToClose: true
                fullscreen: ($mdMedia('sm') || $mdMedia('xs'))

        showWorkoutReport: (evt, contact) ->
            $mdDialog.show
                templateUrl: 'dialog/workout-report.html'
                parent: angular.element(document.body)
                targetEvent: evt
                clickOutsideToClose: true
                fullscreen: ($mdMedia('sm') || $mdMedia('xs'))
                controller: ($scope, $mdpDatePicker, Report) ->
                    $scope.contact = contact
                    $scope.selectedDate = new Date()
                    $scope.reports = []
    
                    getArrayTimeFromSeconds = (seconds) ->
                        min = Math.floor(seconds / 60);
                        sec = seconds % 60;
                        return [min, sec]

                    $scope.showDatePicker = (evt) ->
                        $mdpDatePicker $scope.startTime,
                            targetEvent: evt
                            maxDate: moment()
                        .then (selectedDate) ->
                            $scope.selectedDate = selectedDate
                            $scope.getReport()

                    $scope.getReport = ->
                        selectedDate = moment($scope.selectedDate)
                        Report.get(contact.Username, selectedDate.startOf('day').toISOString(), selectedDate.endOf('day').toISOString())
                        .then (resp) ->
                            $scope.reports = resp.data.Data
                            $scope.reports = $scope.reports.concat($scope.reports).concat($scope.reports).concat($scope.reports)
                            for report in $scope.reports
                                report.DurationArr = getArrayTimeFromSeconds(report.Duration)

                    $scope.getReport()
                    
                    $scope.cancel = ->
                        $mdDialog.cancel()
            
    }