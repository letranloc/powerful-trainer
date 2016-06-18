angular.module "config.notify", []
.run ($rootScope, $interval, AppCfg, Auth, Contact, Plan, mdToast) ->
    $rootScope.friendRequests = []
    $rootScope.planNotify = []
    _interval = undefined
    running = false

    $rootScope.$watch Auth.isAuthenticated, (value, old) ->
        if value is false
            $rootScope.friendRequests = []
            $rootScope.planNotify = []
            $interval.cancel(_interval)
            running = false
        else startInterval()
            

    getFriendRequests = (interval) ->
        Contact.getRequests(interval).then (resp) ->
            $rootScope.friendRequests = $rootScope.friendRequests.concat(resp.data.Data)
            if interval && resp.data.Data.length
                currentToast = undefined
                for contact in resp.data.Data
                    if currentToast
                        currentToast.then ->
                            currentToast = mdToast.showSimple "New friend request from #{contact.Name||contact.Username}"
                    else 
                        currentToast = mdToast.showSimple "New friend request from #{contact.Name||contact.Username}"
            $rootScope.$broadcast "updateFriendRequests", $rootScope.friendRequests

    getPlanNotify = (interval) ->
        Plan.getNotify(interval).then (resp) ->
            $rootScope.planNotify = $rootScope.planNotify.concat(resp.data.Data)
            if interval && resp.data.Data.length
                currentToast = undefined
                for plan in resp.data.Data
                    if currentToast
                        currentToast.then ->
                            currentToast = mdToast.showSimple "New plan \"#{plan.PlanName}\" shared from #{plan.Name||plan.Username}"
                    else 
                        currentToast = mdToast.showSimple "New plan \"#{plan.PlanName}\" shared from #{plan.Name||plan.Username}"
            $rootScope.$broadcast "updatePlanNotify", $rootScope.planNotify
            
    startInterval = ->
        unless running
            running = true
            getFriendRequests()
            # getPlanNotify()
            _interval = $interval -> 
                getFriendRequests(AppCfg.requestInterval)
                getPlanNotify(AppCfg.requestInterval)
            , AppCfg.requestInterval