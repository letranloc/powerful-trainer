angular.module "services.mdDialog", []
.factory "mdDialog", ($mdDialog) ->
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
                            return Math.min(this._items.length + 2, this._query.total)
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
    }