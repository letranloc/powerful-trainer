angular.module 'controllers.contact', []
.controller 'ContactIndexCtrl', ($rootScope, $scope, $location, AppCfg, Contact, mdDialog, mdToast) ->
    $scope.query =
        limit: $location.search().limit || AppCfg.defaultLimit
        limitOptions: AppCfg.defaultLimitOptions
        page: $location.search().page || 1
        total: 0

    $scope.updateLocationSearch = false

    $scope.waitingResponses = []
    Contact.getWaitingResponses().then (resp) ->
        $scope.waitingResponses = resp.data.Data

    $scope.getContacts = ->
        Contact.getAll($scope.query).then (resp) ->
            $scope.contacts = resp.data.Data.Result
            $scope.query.total = resp.data.Data.Count
            if $scope.updateLocationSearch
                $location.search('limit', $scope.query.limit)
                $location.search('page', $scope.query.page)
            else $scope.updateLocationSearch = true
        , (resp) ->
            mdToast.showSimple resp.data.Message, "danger"
    $scope.getContacts()

    $scope.search = (searchStr) ->
        if searchStr.length
            $scope.query.page = 1
            Contact.search($scope.searchStr, $scope.query).then (resp) ->
                $scope.contacts = resp.data.Data.Result
                $scope.query.total = resp.data.Data.Count
                $scope.showResults = $scope.searchStr
        else
            $scope.query.page = 1
            $scope.getContacts()

    $scope.queryResults = ->
        if $scope.searchStr.length
            Contact.search($scope.showResults, $scope.query).then (resp) ->
                    $scope.results = resp.data.Data.Result
                    $scope.query.total = resp.data.Data.Count
            , (resp) ->
                mdToast.showSimple resp.data.Message, "danger"
        else
            getContacts()

    $scope.accept = (contact) ->
        if contact.IsWaitingAccept && !contact.IsFriend
            Contact.accept(contact.Username).then (resp) ->
                contact.IsFriend = true
                contact.IsWaitingAccept == false
                mdToast.showSimple resp.data.Message, "success"
            , (resp) ->
                mdToast.showSimple resp.data.Message, "danger"

    $scope.decline = (contact) ->
        if contact.IsWaitingAccept && !contact.IsFriend
            Contact.delete(contact.Username).then (resp) ->
                contact.IsWaitingAccept == false
                mdToast.showSimple resp.data.Message, "success"
            , (resp) ->
                mdToast.showSimple resp.data.Message, "danger"

    $scope.add = ($event, contact) ->
        if contact.IsWaitingResponse
            mdToast.showSimple "You has already sent a request for this contact.", "danger"
        else if contact.IsWaitingAccept
            mdToast.showSimple "The contact has already sent you a request.", "danger"
        else
            mdDialog.showConfirm($event, "Add contact", "Are you sure?", "primary")
            .then ->
                Contact.request(contact.Username).then (resp) ->
                    contact.IsWaitingResponse = true
                    $scope.waitingResponses.push(contact)
                    mdToast.showSimple resp.data.Message, "success"
                , (resp) ->
                    mdToast.showSimple resp.data.Message, "danger"

    $scope.cancel = ($event, contact) ->
        if contact.IsWaitingResponse
            mdDialog.showConfirm($event, "Cancel request", "Are you sure?", "warn")
            .then ->
                Contact.delete(contact.Username).then (resp) ->
                    contact.IsWaitingResponse = false
                    for c, i in $scope.waitingResponses
                        if c.Username is contact.Username
                            $scope.waitingResponses.splice(i,1)
                    mdToast.showSimple resp.data.Message, "success"
                , (resp) ->
                    mdToast.showSimple resp.data.Message, "danger"

    $scope.delete = ($event, contact) ->
        mdDialog.showConfirm($event, "Delete contact", "Are you sure?")
        .then ->
            Contact.delete(contact.Username).then (resp) ->
                contact.IsFriend = false
                mdToast.showSimple resp.data.Message, "success"
            , (resp) ->
                mdToast.showSimple resp.data.Message, "danger"

    $scope.requests = $rootScope.friendRequests
    $scope.$on "updateFriendRequests", (e, newValue) ->
        $scope.requests = newValue

    $scope.showRequests = ($event, requests)->
        if requests.length
            mdDialog.showFriendRequests($event, requests).then ->
                $scope.getContacts()

    $scope.showWaiting = ($event, waitingResponses) ->
        if waitingResponses.length
            mdDialog.showFriendRequests($event, waitingResponses, true).then ->
                $scope.getContacts()
            
        
.controller "ContactAddCtrl", ($scope, AppCfg, Contact, mdDialog, mdToast) ->
    $scope.showResults = false

    $scope.query =
        limit: AppCfg.defaultLimit
        limitOptions: AppCfg.defaultLimitOptions
        page: 1
        total: 0

    $scope.search = (form) ->
        if form.$valid
            Contact.search($scope.searchStr, $scope.query).then (resp) ->
                $scope.results = resp.data.Data.Result
                $scope.query.total = resp.data.Data.Count
                $scope.showResults = $scope.searchStr

    $scope.queryResults = ->
        Contact.search($scope.showResults, $scope.query).then (resp) ->
                $scope.results = resp.data.Data.Result
                $scope.query.total = resp.data.Data.Count
        , (resp) ->
            mdToast.showSimple resp.data.Message, "danger"

    $scope.accept = (contact) ->
        if contact.IsWaitingAccept && !contact.IsFriend
            Contact.accept(contact.Username).then (resp) ->
                contact.IsFriend = true
                contact.IsWaitingAccept == false
                mdToast.showSimple resp.data.Message, "success"
            , (resp) ->
                mdToast.showSimple resp.data.Message, "danger"

    $scope.decline = (contact) ->
        if contact.IsWaitingAccept && !contact.IsFriend
            Contact.delete(contact.Username).then (resp) ->
                contact.IsWaitingAccept == false
                mdToast.showSimple resp.data.Message, "success"
            , (resp) ->
                mdToast.showSimple resp.data.Message, "danger"

    $scope.add = ($event, contact) ->
        if contact.IsWaitingResponse
            mdToast.showSimple "You has already sent a request for this contact.", "danger"
        else if contact.IsWaitingAccept
            mdToast.showSimple "The contact has already sent you a request.", "dander"
        else
            mdDialog.showConfirm($event, "Add contact", "Are you sure?", "primary")
            .then ->
                Contact.request(contact.Username).then (resp) ->
                    contact.IsWaitingResponse = true
                    mdToast.showSimple resp.data.Message, "success"
                , (resp) ->
                    mdToast.showSimple resp.data.Message, "danger"
        