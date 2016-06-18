var makeid;

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Array.prototype.remove = function(e) {
  var ref, t;
  if ((t = this.indexOf(e)) > -1) {
    return ([].splice.apply(this, [t, t - t + 1].concat(ref = [])), ref);
  }
};

Array.prototype.add = function(e) {
  e.$id = makeid();
  return this.push(e);
};

makeid = function() {
  var i, j, possible, text;
  text = "";
  possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (i = j = 1; j <= 5; i = ++j) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

window.mobilecheck = function() {
  var check;
  check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge|maemo|midp|mmp|mobile.+firefox|netfront|operam(ob|in)i|palm(os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windowsce|xda|xiino\/i.test(a)||\/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|awa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r|s)|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp(i|ip)|hs\-c|ht(c(\-||_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac(|\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt(|\/)|klon|kpt|kwc\-|kyo(c|k)|le(no|xi)|lg(g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-||o|v)|zz)|mt(50|p1|v)|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v)|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-|)|webc|whit|wi(g|nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
      return check = true;
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

window.mobileAndTabletcheck = function() {
  var check;
  check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge|maemo|midp|mmp|mobile.+firefox|netfront|operam(ob|in)i|palm(os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windowsce|xda|xiino|android|ipad|playbook|silk\/i.test(a)||\/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|awa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r|s)|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp(i|ip)|hs\-c|ht(c(\-||_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac(|\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt(|\/)|klon|kpt|kwc\-|kyo(c|k)|le(no|xi)|lg(g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-||o|v)|zz)|mt(50|p1|v)|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v)|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-|)|webc|whit|wi(g|nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
      return check = true;
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

var app;

app = angular.module('app', ['ngRoute', 'ngCookies', 'ngStorage', 'ui.router', 'ui.router.title', 'ngAnimate', 'ngMessages', 'ngMaterial', 'mdPickers', 'ui.sortable', 'ngMenuSidenav', 'highcharts-ng', 'hmTouchEvents', 'angularInlineEdit', 'validation.match', 'naif.base64', 'md.data.table', 'templates', 'app.shared', 'app.config', 'app.services', 'app.resources', 'app.directives', 'app.controllers']);

app.value("AppCfg", {
  apiUrl: "/api",
  requestInterval: 5000,
  defaultLimit: 20,
  defaultLimitOptions: [20, 30, 50]
});

angular.module("config.auth", []).run(["$rootScope", "$state", "Auth", function($rootScope, $state, Auth) {
  var checkAuthentication;
  $rootScope.$on("$stateChangeSuccess", function(e) {
    return checkAuthentication();
  });
  $rootScope.$watch(Auth.isAuthenticated, function(value, old) {
    return checkAuthentication();
  });
  return checkAuthentication = function() {
    if (!Auth.isAuthenticated() && !$state.is("login") && !$state.is("register")) {
      return $state.go("login");
    } else if ($state.is("login") || $state.is("register")) {
      if (Auth.isAuthenticated()) {
        return $state.go("cpanel.index");
      }
    }
  };
}]);

angular.module("app.config", ["config.global", "config.routes", "config.theme", "config.auth", "config.notify", "config.loadingBar"]);

angular.module('config.global', []).config(["$locationProvider", "$localStorageProvider", "$sessionStorageProvider", "$sceDelegateProvider", function($locationProvider, $localStorageProvider, $sessionStorageProvider, $sceDelegateProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $localStorageProvider.setKeyPrefix('powerful_tranier_');
  $sessionStorageProvider.setKeyPrefix('powerful_tranier_');
  return $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://az803746.vo.msecnd.net/tenant/amp/entityid/**']);
}]).run(["$rootScope", "$mdMedia", function($rootScope, $mdMedia) {
  return $rootScope.hideTooltipOnXS = $mdMedia('xs');
}]);

angular.module('config.loadingBar', []).config(function() {
  return Pace.options = {
    ajax: {
      ignoreURLs: ['browserLink']
    },
    eventLag: false
  };
}).run(["$rootScope", function($rootScope) {
  $rootScope.$on('$stateChangeStart', function() {
    return Pace.start();
  });
  return $rootScope.$$on('$stateNotFound,$stateChangeError,$stateChangeSuccess', function() {
    return Pace.stop();
  });
}]);

angular.module("config.notify", []).run(["$rootScope", "$interval", "AppCfg", "Auth", "Contact", "Plan", "mdToast", function($rootScope, $interval, AppCfg, Auth, Contact, Plan, mdToast) {
  var _interval, getFriendRequests, getPlanNotify, running, startInterval;
  $rootScope.friendRequests = [];
  $rootScope.planNotify = [];
  _interval = void 0;
  running = false;
  $rootScope.$watch(Auth.isAuthenticated, function(value, old) {
    if (value === false) {
      $rootScope.friendRequests = [];
      $rootScope.planNotify = [];
      $interval.cancel(_interval);
      return running = false;
    } else {
      return startInterval();
    }
  });
  getFriendRequests = function(interval) {
    return Contact.getRequests(interval).then(function(resp) {
      var contact, currentToast, i, len, ref;
      $rootScope.friendRequests = $rootScope.friendRequests.concat(resp.data.Data);
      if (interval && resp.data.Data.length) {
        currentToast = void 0;
        ref = resp.data.Data;
        for (i = 0, len = ref.length; i < len; i++) {
          contact = ref[i];
          if (currentToast) {
            currentToast.then(function() {
              return currentToast = mdToast.showSimple("New friend request from " + (contact.Name || contact.Username));
            });
          } else {
            currentToast = mdToast.showSimple("New friend request from " + (contact.Name || contact.Username));
          }
        }
      }
      return $rootScope.$broadcast("updateFriendRequests", $rootScope.friendRequests);
    });
  };
  getPlanNotify = function(interval) {
    return Plan.getNotify(interval).then(function(resp) {
      var currentToast, i, len, plan, ref;
      $rootScope.planNotify = $rootScope.planNotify.concat(resp.data.Data);
      if (interval && resp.data.Data.length) {
        currentToast = void 0;
        ref = resp.data.Data;
        for (i = 0, len = ref.length; i < len; i++) {
          plan = ref[i];
          if (currentToast) {
            currentToast.then(function() {
              return currentToast = mdToast.showSimple("New plan \"" + plan.PlanName + "\" shared from " + (plan.Name || plan.Username));
            });
          } else {
            currentToast = mdToast.showSimple("New plan \"" + plan.PlanName + "\" shared from " + (plan.Name || plan.Username));
          }
        }
      }
      return $rootScope.$broadcast("updatePlanNotify", $rootScope.planNotify);
    });
  };
  return startInterval = function() {
    if (!running) {
      running = true;
      getFriendRequests();
      return _interval = $interval(function() {
        getFriendRequests(AppCfg.requestInterval);
        return getPlanNotify(AppCfg.requestInterval);
      }, AppCfg.requestInterval);
    }
  };
}]);

angular.module('config.routes', []).config(["$urlMatcherFactoryProvider", "$stateProvider", "$urlRouterProvider", function($urlMatcherFactoryProvider, $stateProvider, $urlRouterProvider) {
  $urlMatcherFactoryProvider.caseInsensitive(true);
  $urlMatcherFactoryProvider.strictMode(false);
  $urlRouterProvider.otherwise("/");
  return $stateProvider.state("login", {
    url: "/login",
    templateUrl: "auth/login.html",
    controller: "AuthCtrl",
    resolve: {
      $title: function() {
        return "Login";
      }
    }
  }).state("register", {
    url: "/register",
    templateUrl: "auth/register.html",
    controller: "AuthCtrl",
    resolve: {
      $title: function() {
        return "Register";
      }
    }
  }).state("cpanel", {
    abstract: true,
    url: "",
    templateUrl: "layout/dashboard.html"
  }).state("cpanel.index", {
    url: "",
    templateUrl: "dashboard/index.html",
    controller: "DashboardIndexCtrl",
    resolve: {
      $title: function() {
        return "Dashboard";
      }
    }
  }).state("cpanel.report", {
    abstract: true,
    url: "/report",
    template: "<ui-view />"
  }).state("cpanel.report.health", {
    url: "/health",
    templateUrl: "report/health.html",
    controller: "ReportHealthCtrl",
    resolve: {
      $title: function() {
        return "Health summary";
      }
    }
  }).state("cpanel.report.workout", {
    url: "/workout",
    templateUrl: "report/workout.html",
    controller: "ReportWorkoutCtrl",
    resolve: {
      $title: function() {
        return "Workout summary";
      }
    }
  }).state("cpanel.plan", {
    abstract: true,
    url: "/plans",
    template: "<ui-view />"
  }).state("cpanel.plan.index", {
    url: "",
    templateUrl: "plan/index.html",
    controller: "PlanIndexCtrl",
    resolve: {
      $title: function() {
        return "Workout Plans";
      }
    }
  }).state("cpanel.plan.create", {
    url: "/create",
    templateUrl: "plan/build.html",
    controller: "PlanCreateCtrl",
    resolve: {
      $title: function() {
        return "Create";
      }
    }
  }).state("cpanel.plan.edit", {
    url: "/{id:[0-9]+}/edit",
    templateUrl: "plan/build.html",
    controller: "PlanCreateCtrl",
    resolve: {
      $title: function() {
        return "Update";
      }
    }
  }).state("cpanel.contact", {
    abstract: true,
    url: "/contacts",
    template: "<ui-view />"
  }).state("cpanel.contact.index", {
    url: "",
    templateUrl: "contact/index.html",
    controller: "ContactIndexCtrl",
    resolve: {
      $title: function() {
        return "Contacts";
      }
    }
  }).state("cpanel.profile", {
    url: '/profile',
    templateUrl: "profile/index.html",
    controller: "ProfileIndexCtrl",
    resolve: {
      $title: function() {
        return "Update profile";
      }
    }
  });
}]).run(["$rootScope", "$location", function($rootScope, $location) {
  return $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    var search;
    search = $location.search();
    if (search.hasOwnProperty('inapp')) {
      return $rootScope.inApp = search.inapp;
    }
  });
}]);

angular.module("config.theme", []).config(["$mdThemingProvider", function($mdThemingProvider) {
  $mdThemingProvider.definePalette('teal', $mdThemingProvider.extendPalette('teal', {
    'contrastDefaultColor': 'light'
  }));
  $mdThemingProvider.theme("default").primaryPalette("teal").accentPalette("pink").warnPalette("red");
  $mdThemingProvider.theme('default-dark', 'default').dark();
  $mdThemingProvider.theme('default-yellow-dark', 'default').primaryPalette("yellow").dark();
  $mdThemingProvider.theme("info-toast");
  $mdThemingProvider.theme("success-toast");
  $mdThemingProvider.theme("danger-toast");
  return $mdThemingProvider.setDefaultTheme("default");
}]);

angular.module('controllers.auth', []).controller('AuthCtrl', ["$scope", "$state", "mdToast", "Auth", function($scope, $state, mdToast, Auth) {
  $scope.progressing = false;
  $scope.user = {};
  $scope.showUserAvatarPicker = function(form) {
    $('#userAvatarPicker').click();
  };
  $scope.setUserAvatar = function(event, objects, files) {
    return $scope.user.avatar = "data:" + objects[0].filetype + ";base64," + objects[0].base64;
  };
  $scope.removeAvatar = function(form) {
    $scope.user.avatar = null;
    $scope.userAvatar = null;
    form.userAvatar.$setValidity("maxsize", true);
    return form.userAvatar.$setValidity("accept", true);
  };
  $scope.isValidForm = function(form) {
    return form.$valid;
  };
  $scope.login = function(form) {
    if (!$scope.isValidForm(form) || $scope.progressing) {
      return;
    }
    if (form.$valid) {
      $scope.progressing = true;
      return Auth.login($scope.user).then(function(resp) {
        var data, error;
        data = resp.data;
        if (data.ReturnCode === 0) {
          mdToast.showSimple(data.Message, "success");
          try {
            invokeCSharpAction("Token:" + data.Data.AccessToken);
          } catch (error) {

          }
          return Auth.setUser(data.Data);
        } else {
          mdToast.showSimple(data.Message, "danger");
          return $scope.progressing = false;
        }
      }, function(resp) {
        mdToast.showSimple(resp.data.Message, "danger");
        return $scope.progressing = false;
      });
    }
  };
  $scope.register = function(form) {
    if (!$scope.user.checkbox || !$scope.isValidForm(form) || $scope.progressing) {
      return;
    }
    if (form.$valid) {
      $scope.progressing = true;
      return Auth.register($scope.user).then(function(resp) {
        var data;
        data = resp.data;
        $scope.progressing = false;
        if (data.ReturnCode === 0) {
          mdToast.showSimple(data.Message, "success");
          return $state.go('login');
        } else {
          return mdToast.showSimple(data.Message, "danger");
        }
      }, function(resp) {
        $scope.progressing = false;
        return mdToast.showSimple(resp.data.Message, "danger");
      });
    }
  };
  return $scope.logout = function() {
    Auth.logout();
    return mdToast.showSimple("Success", "success");
  };
}]);

angular.module('controllers.contact', []).controller('ContactIndexCtrl', ["$rootScope", "$scope", "$location", "AppCfg", "Contact", "mdDialog", "mdToast", function($rootScope, $scope, $location, AppCfg, Contact, mdDialog, mdToast) {
  $scope.query = {
    limit: $location.search().limit || AppCfg.defaultLimit,
    limitOptions: AppCfg.defaultLimitOptions,
    page: $location.search().page || 1,
    total: 0
  };
  $scope.updateLocationSearch = false;
  $scope.searchStr = $location.search().q || "";
  $scope.waitingResponses = [];
  Contact.getWaitingResponses().then(function(resp) {
    return $scope.waitingResponses = resp.data.Data;
  });
  $scope.getContacts = function() {
    return Contact.getAll($scope.query).then(function(resp) {
      $scope.contacts = resp.data.Data.Result;
      $scope.query.total = resp.data.Data.Count;
      if ($scope.updateLocationSearch) {
        $location.search('limit', $scope.query.limit);
        return $location.search('page', $scope.query.page);
      } else {
        return $scope.updateLocationSearch = true;
      }
    }, function(resp) {
      return mdToast.showSimple(resp.data.Message, "danger");
    });
  };
  if ($scope.searchStr.length) {
    $scope.search($scope.searchStr);
  } else {
    $scope.getContacts();
  }
  $scope.search = function(searchStr) {
    $scope.searchStr = searchStr;
    $location.search('q', searchStr);
    if (searchStr.length) {
      $scope.query.page = 1;
      return Contact.search(searchStr, $scope.query).then(function(resp) {
        $scope.contacts = resp.data.Data.Result;
        $scope.query.total = resp.data.Data.Count;
        return $scope.showResults = $scope.searchStr;
      });
    } else {
      $scope.query.page = 1;
      return $scope.getContacts();
    }
  };
  $scope.queryResults = function() {
    if ($scope.searchStr.length) {
      return Contact.search($scope.showResults, $scope.query).then(function(resp) {
        $scope.results = resp.data.Data.Result;
        return $scope.query.total = resp.data.Data.Count;
      }, function(resp) {
        return mdToast.showSimple(resp.data.Message, "danger");
      });
    } else {
      return getContacts();
    }
  };
  $scope.accept = function(contact) {
    if (contact.IsWaitingAccept && !contact.IsFriend) {
      return Contact.accept(contact.Username).then(function(resp) {
        contact.IsFriend = true;
        contact.IsWaitingAccept === false;
        return mdToast.showSimple(resp.data.Message, "success");
      }, function(resp) {
        return mdToast.showSimple(resp.data.Message, "danger");
      });
    }
  };
  $scope.decline = function(contact) {
    if (contact.IsWaitingAccept && !contact.IsFriend) {
      return Contact["delete"](contact.Username).then(function(resp) {
        contact.IsWaitingAccept === false;
        return mdToast.showSimple(resp.data.Message, "success");
      }, function(resp) {
        return mdToast.showSimple(resp.data.Message, "danger");
      });
    }
  };
  $scope.add = function($event, contact) {
    if (contact.IsWaitingResponse) {
      return mdToast.showSimple("You has already sent a request for this contact.", "danger");
    } else if (contact.IsWaitingAccept) {
      return mdToast.showSimple("The contact has already sent you a request.", "danger");
    } else {
      return mdDialog.showConfirm($event, "Add contact", "Are you sure?", "primary").then(function() {
        return Contact.request(contact.Username).then(function(resp) {
          contact.IsWaitingResponse = true;
          $scope.waitingResponses.push(contact);
          return mdToast.showSimple(resp.data.Message, "success");
        }, function(resp) {
          return mdToast.showSimple(resp.data.Message, "danger");
        });
      });
    }
  };
  $scope.cancel = function($event, contact) {
    if (contact.IsWaitingResponse) {
      return mdDialog.showConfirm($event, "Cancel request", "Are you sure?", "warn").then(function() {
        return Contact["delete"](contact.Username).then(function(resp) {
          var c, i, j, len, ref;
          contact.IsWaitingResponse = false;
          ref = $scope.waitingResponses;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            c = ref[i];
            if (c.Username === contact.Username) {
              $scope.waitingResponses.splice(i, 1);
            }
          }
          return mdToast.showSimple(resp.data.Message, "success");
        }, function(resp) {
          return mdToast.showSimple(resp.data.Message, "danger");
        });
      });
    }
  };
  $scope["delete"] = function($event, contact) {
    return mdDialog.showConfirm($event, "Delete contact", "Are you sure?").then(function() {
      return Contact["delete"](contact.Username).then(function(resp) {
        $scope.contacts.remove(contact);
        return mdToast.showSimple(resp.data.Message, "success");
      }, function(resp) {
        return mdToast.showSimple(resp.data.Message, "danger");
      });
    });
  };
  $scope.requests = $rootScope.friendRequests;
  $scope.$on("updateFriendRequests", function(e, newValue) {
    return $scope.requests = newValue;
  });
  $scope.showRequests = function($event, requests) {
    if (requests.length) {
      return mdDialog.showFriendRequests($event, requests).then(function() {
        return $scope.getContacts();
      });
    }
  };
  return $scope.showWaiting = function($event, waitingResponses) {
    if (waitingResponses.length) {
      return mdDialog.showFriendRequests($event, waitingResponses, true).then(function() {
        return $scope.getContacts();
      });
    }
  };
}]);

angular.module("app.controllers", ["controllers.dashboard", "controllers.plan", "controllers.auth", "controllers.contact", "controllers.report", "controllers.profile"]);

angular.module('controllers.dashboard', []).controller('DashboardCtrl', ["$scope", "$mdSidenav", "$mdMedia", "Auth", function($scope, $mdSidenav, $mdMedia, Auth) {
  $scope.$watch(Auth.isAuthenticated, function() {
    return $scope.User = Auth.isAuthenticated();
  });
  return $scope.toggleNavLeft = function() {
    return $mdSidenav("left").toggle();
  };
}]).controller("DashboardIndexCtrl", ["$scope", "$state", "$timeout", function($scope, $state, $timeout) {
  return $scope.title = "Dashboard";
}]);

angular.module("controllers.plan", []).controller("PlanIndexCtrl", ["$scope", "$state", "$mdBottomSheet", "$location", "$mdMenu", "AppCfg", "mdDialog", "mdToast", "Plan", "EventModel", function($scope, $state, $mdBottomSheet, $location, $mdMenu, AppCfg, mdDialog, mdToast, Plan, EventModel) {
  $scope.query = {
    limit: $location.search().limit || AppCfg.defaultLimit,
    limitOptions: AppCfg.defaultLimitOptions,
    page: $location.search().page || 1,
    total: 0
  };
  $scope.updateLocationSearch = false;
  $scope.getPlans = function() {
    return Plan.getAll($scope.query).then(function(resp) {
      $scope.plans = resp.data.Data.Result;
      $scope.query.total = resp.data.Data.Count;
      if ($scope.updateLocationSearch) {
        $location.search('limit', $scope.query.limit);
        return $location.search('page', $scope.query.page);
      } else {
        return $scope.updateLocationSearch = false;
      }
    }, function(resp) {
      return mdToast.showSimple(resp.data.Message, "danger");
    });
  };
  $scope.getPlans(true);
  $scope.startWorkout = function(plan) {
    return Plan.get(plan.Id).then(function(resp) {
      return invokeCSharpAction('plan:' + JSON.stringify(resp.data.Data));
    }, function(resp) {
      return mdToast.showSimple(resp.data.Message, "danger");
    });
  };
  $scope.share = function(evt, plan) {
    $mdMenu.hide();
    return mdDialog.showContactsSelector(evt).then(function(contacts) {
      var contact, j, len, results;
      results = [];
      for (j = 0, len = contacts.length; j < len; j++) {
        contact = contacts[j];
        results.push(Plan.share(plan.Id, contact.Username).then(function(resp) {
          return mdToast.showSimple("Shared plan \"" + plan.Name + "\" to " + (contact.Name || contact.Username), "success");
        }, function(resp) {
          return mdToast.showSimple(resp.data.Message, "danger");
        }));
      }
      return results;
    });
  };
  return $scope["delete"] = function(evt, plan) {
    return mdDialog.showConfirm(evt, "Delete plan", "Are you sure?").then(function() {
      return Plan["delete"](plan.Id).then(function(resp) {
        $scope.plans.remove(plan);
        return mdToast.showSimple(resp.data.Message, "success");
      }, function(resp) {
        return mdToast.showSimple(resp.data.Message, "danger");
      });
    });
  };
}]).controller("PlanCreateCtrl", ["$scope", "$stateParams", "$state", "$q", "$timeout", "cookies", "mdDialog", "mdToast", "Plan", "Exercise", function($scope, $stateParams, $state, $q, $timeout, cookies, mdDialog, mdToast, Plan, Exercise) {
  if ($stateParams.id) {
    Plan.get($stateParams.id).then(function(resp) {
      $scope.plan = resp.data.Data;
      return $scope.plan.Id = $stateParams.id;
    }, function(resp) {
      mdToast.showSimple(resp.data.Message, "danger");
      return $state.go('cpanel.plan.index');
    });
  } else {
    $scope.plan = {
      Name: "New Workout Plan",
      Data: []
    };
    $timeout(function() {
      return cookies.learnTutorial(cookies.TUTORIAL_CHANGE_PLAN_IMAGE_LEARNED);
    }, 3000);
  }
  $scope.isSaving = false;
  $scope.selected = [];
  $scope.showPlanImagePicker = function() {
    $('#planImagePicker').click();
  };
  $scope.setPlanImage = function(event, objects, files) {
    return $scope.plan.Image = "data:" + objects[0].filetype + ";base64," + objects[0].base64;
  };
  $scope.addExercise = function($event) {
    return mdDialog.showExSelector($event).then(function(list) {
      var ex, j, len, results;
      results = [];
      for (j = 0, len = list.length; j < len; j++) {
        ex = list[j];
        ex.Sets = 1;
        results.push($scope.plan.Data.push(ex));
      }
      return results;
    });
  };
  $scope.showExPreview = function($event, ex) {
    return mdDialog.showExPreview($event, ex);
  };
  $scope.editSets = function($event, ex) {
    return mdDialog.showSetEdit($event, ex);
  };
  $scope.editCompletion = function($event, ex) {
    return mdDialog.showCompletionEdit($event, ex);
  };
  $scope.editRestTime = function($event, ex) {
    if (ex.Sets > 1) {
      return mdDialog.showRestTimeEdit($event, ex);
    }
  };
  $scope.removeEx = function() {
    return mdDialog.showConfirm(evt, "Delete plan", "Are you sure?").then(function() {
      var ex, i, j, len, ref, results;
      ref = $scope.selected;
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        ex = ref[i];
        results.push($scope.plan.Data.splice(i, 1));
      }
      return results;
    });
  };
  $scope.validate = function(plan) {
    return plan.Data.length > 0;
  };
  return $scope.save = function() {
    if ($scope.validate($scope.plan)) {
      $scope.isSaving = true;
      if ($scope.plan.Id) {
        return Plan.update($scope.plan).then(function(resp) {
          mdToast.showSimple(resp.data.Message, "success");
          $state.go("cpanel.plan.edit", {
            id: $scope.plan.Id
          });
          return $scope.isSaving = false;
        }, function(resp) {
          mdToast.showSimple(resp.data.Message, "danger");
          return $scope.isSaving = false;
        });
      } else {
        return Plan.add($scope.plan).then(function(resp) {
          mdToast.showSimple(resp.data.Message, "success");
          return $state.go("cpanel.plan.edit", {
            id: resp.data.Data.Id
          });
        }, function(resp) {
          mdToast.showSimple(resp.data.Message, "danger");
          return $scope.isSaving = false;
        });
      }
    } else {
      return mdToast.showSimple("Each plan must have at least one exercise", "danger");
    }
  };
}]).filter("CompletionFilter", function() {
  return function(input) {
    var min, sec, str;
    if (input.Repetitions) {
      if (input.Repetitions === -1) {
        return "Max reps";
      } else {
        return input.Repetitions + " reps";
      }
    } else if (input.Duration) {
      min = Math.floor(input.Duration / 60);
      sec = input.Duration % 60;
      str = "";
      if (min > 0) {
        if (sec > 0) {
          str = min + " min " + sec + " sec";
        } else {
          str = min + " minutes";
        }
      } else {
        str = sec + " seconds";
      }
      return str;
    } else {
      return "Select";
    }
  };
}).filter("RestTimeFilter", function() {
  return function(input) {
    var min, sec, str;
    if (input.Sets > 1) {
      if (input.RestTime === 'AsNeed') {
        return "As need";
      } else {
        min = Math.floor(input.RestTime / 60);
        sec = input.RestTime % 60;
        str = "";
        if (min > 0) {
          if (sec > 0) {
            str = min + " min " + sec + " sec";
          } else {
            str = min + " minutes";
          }
        } else {
          str = sec + " seconds";
        }
        return str;
      }
    } else {
      return "";
    }
  };
});

angular.module("controllers.profile", []).controller("ProfileIndexCtrl", ["$scope", "Auth", function($scope, Auth) {
  $scope.$watch(Auth.isAuthenticated, function() {
    return $scope.user = Auth.isAuthenticated();
  });
  $scope.progressing = false;
  $scope.showUserAvatarPicker = function(form) {
    $('#userAvatarPicker').click();
  };
  $scope.isValidForm = function(form) {
    if (!$scope.user.password) {
      return false;
    } else if ($scope.user.new_password === "" || !$scope.user.new_password) {
      form.new_password.$setValidity('match', true);
      form.new_password_confirmation.$setValidity('match', true);
    }
    return form.$valid;
  };
  $scope.setUserAvatar = function(event, objects, files) {
    return $scope.user.Avatar = "data:" + objects[0].filetype + ";base64," + objects[0].base64;
  };
  $scope.removeAvatar = function(form) {
    form.userAvatar.$setValidity("maxsize", true);
    form.userAvatar.$setValidity("accept", true);
    $scope.user.Avatar = null;
    return $scope.userAvatar = null;
  };
  return $scope.update = function(form) {
    $scope.progressing = !$scope.progressing;
    return form.$valid;
  };
}]);

angular.module("controllers.report", []).controller("ReportHealthCtrl", ["$scope", "$timeout", "Report", function($scope, $timeout, Report) {
  $scope.options = {};
  $scope.$watch('[sensor,group,options]', function() {
    return $scope.updateChart();
  }, true);
  $scope.updateToTime = function() {
    if (!$scope.options.toTime || $scope.filterToTime($scope.options.toTime)) {
      return $scope.options.toTime = $scope.options.fromTime;
    }
  };
  $scope.filterFromTime = function(date) {
    if ($scope.options.toTime) {
      return moment(date).valueOf() > moment($scope.options.toTime).valueOf();
    } else {
      return false;
    }
  };
  $scope.filterToTime = function(date) {
    if ($scope.options.fromTime) {
      return moment(date).valueOf() < moment($scope.options.fromTime).valueOf();
    } else {
      return false;
    }
  };
  $scope.updateChart = function() {
    if ($scope.sensor && $scope.group && $scope.options.func && $scope.options.fromTime && $scope.options.toTime) {
      return Report.get($scope.sensor, $scope.group, $scope.options).then(function(resp) {
        var i, k, len, ref, series, val;
        $scope.showChart = true;
        series = {
          name: $scope.sensor,
          data: []
        };
        ref = resp.data.Data;
        for (k = i = 0, len = ref.length; i < len; k = ++i) {
          val = ref[k];
          series.data.push([moment(val.Time).valueOf(), val.Value]);
        }
        if ($scope.sensor === 'HeartRate') {
          series.type = 'line';
        } else {
          series.type = 'column';
        }
        return $scope.updateChartConfig(series);
      });
    }
  };
  $scope.updateChartConfig = function(series) {
    var f;
    $scope.chartConfig.series = [series];
    f = moment($scope.fromTime);
    if ($scope.type === 'avg') {
      f = f.subtract(30, 'minutes');
    }
    switch ($scope.group) {
      case 'hourly':
        series.pointInterval = 3600 * 1000;
        series.pointStart = f.valueOf();
        $scope.chartConfig.options.tooltip = {
          xDateFormat: '%A, %b %e, %I:%M%P',
          shared: true
        };
        $scope.chartConfig.xAxis.tickInterval = 3600 * 1000;
        $scope.chartConfig.xAxis.dateTimeLabelFormats = {
          hour: '%I%P'
        };
        break;
      case 'daily':
        series.pointInterval = 3600 * 1000 * 24;
        series.pointStart = f.valueOf();
        $scope.chartConfig.options.tooltip = {
          xDateFormat: '%A, %b %e',
          shared: true
        };
        $scope.chartConfig.xAxis.tickInterval = 3600 * 1000 * 24;
        $scope.chartConfig.xAxis.dateTimeLabelFormats = {
          day: '%e. %b'
        };
    }
    return $scope.$broadcast('highchartsng.reflow');
  };
  $scope.chartConfig = {
    options: {
      exporting: {
        enabled: false
      },
      chart: {
        zoomType: 'x'
      }
    },
    series: [],
    title: {
      text: ""
    },
    loading: false,
    yAxis: {
      title: {
        text: ''
      },
      min: 0
    },
    xAxis: {
      type: 'datetime',
      minRange: 3600 * 1000,
      tickInterval: 3600 * 1000,
      dateTimeLabelFormats: {},
      title: {
        text: ''
      }
    },
    useHighStocks: false,
    panel: {
      size: 100
    },
    size: {
      width: null,
      height: null
    },
    func: function(chart) {
      return $timeout(function() {
        return chart.reflow();
      });
    }
  };
  return Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });
}]).controller("ReportWorkoutCtrl", ["$scope", function($scope) {
  return $scope.title = "";
}]);

angular.module("directives.appScroll", []).directive("appScroll", ["$window", "$timeout", function($window, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var $e, $p, last_position;
      $e = angular.element(element);
      $p = angular.element($window);
      last_position = 0;
      return $timeout(function() {
        return $p.bind('scroll', function(ev) {
          var pos;
          pos = ev.srcElement.scrollTop;
          console.log(this.pageYOffset);
          if (pos === 1) {
            return;
          }
          if (pos > last_position) {
            $e.addClass('hide2');
          } else {
            $e.removeClass('hide2');
          }
          last_position = pos;
          return $p.on('$destroy', function() {
            return $p.off('scroll', onScroll);
          });
        });
      }, 3000);
    }
  };
}]);

angular.module('directives.classRoute', []).directive('classRoute', ["$rootScope", "$route", function($rootScope, $route) {
  return function(scope, elem, attr) {
    var previous, r;
    previous = '';
    if ($route.current) {
      r = $route.current.$$route;
      if (attr['classRoute'] !== '' && r && r['classRoute'] && r['classRoute'][attr['classRoute']]) {
        previous = r['classRoute'][attr['classRoute']];
        attr.$addClass(previous);
      }
    }
    return $rootScope.$on('$routeChangeSuccess', function(event, currentRoute) {
      var cls, route;
      route = currentRoute.$$route;
      if (attr['classRoute'] !== '' && route && route['classRoute'] && route['classRoute'][attr['classRoute']]) {
        cls = route['classRoute'][attr['classRoute']];
      }
      if (previous) {
        attr.$removeClass(previous);
      }
      if (cls) {
        previous = cls;
        return attr.$addClass(cls);
      }
    });
  };
}]);

angular.module('app.directives', ['directives.classRoute', 'directives.elemReady', 'directives.onLongPress', 'directives.inputControl', 'directives.eventModel', 'directives.appScroll', 'directives.hideKeyboardOnTouchOutside', 'directives.focusMe']);

angular.module('directives.elemReady', []).directive('elemReady', ["$parse", "$timeout", function($parse, $timeout) {
  return {
    restrict: 'A',
    link: function($scope, elem, attrs) {
      return elem.ready(function() {
        return $timeout(function() {
          return $scope.$apply(function() {
            var func;
            func = $parse(attrs.elemReady);
            return func($scope);
          });
        }, 1000);
      });
    }
  };
}]);

angular.module("directives.eventModel", []).directive("eventModel", function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
      schema: '=',
      model: '='
    },
    templateUrl: 'directives/event-model.html',
    link: function(scope, element, attrs) {
      var processing, render;
      processing = false;
      render = function() {
        if (!scope.schema || !scope.type || processing) {
          return;
        }
        processing = true;
        scope.eventModel = {
          Name: scope.schema.Name
        };
        if (scope.type === "condition") {
          return scope.model = scope.eventModel;
        } else if (scope.type === "action") {
          scope.model.Action = scope.eventModel;
          return scope.model.Frequency = 0;
        }
      };
      scope.$watch('schema', function(schema) {
        return render();
      });
      return scope.$watch('type', function() {
        return render();
      });
    }
  };
});

angular.module('directives.focusMe', []).directive('focusMe', ["$timeout", function($timeout) {
  return {
    scope: {
      trigger: '=focusMe'
    },
    link: function(scope, element) {
      return scope.$watch('trigger', function(value) {
        if (value === true) {
          return $timeout(function() {
            return element[0].focus();
          });
        }
      });
    }
  };
}]);

angular.module("directives.hideKeyboardOnTouchOutside", []).directive("body", ["$document", function($document) {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      var mc;
      mc = new Hammer(element[0]);
      return mc.on("tap", function(e) {
        if (e.target.tagetName !== "INPUT" && $document.activeElement) {
          return $document.activeElement.blur();
        }
      });
    }
  };
}]);

angular.module("directives.inputControl", []).directive("inputControl", ["$compile", "$templateCache", "EventModel", "mdToast", function($compile, $templateCache, EventModel, mdToast) {
  var getControlByType, sensorTypes;
  sensorTypes = null;
  getControlByType = function(scope, type) {
    switch (type) {
      case "Int":
      case "Double":
        return {
          view: "number",
          def: 0
        };
      case "String":
        return {
          view: "string",
          def: ""
        };
      case "BandSensorType":
        if (sensorTypes) {
          scope.sensorTypes = sensorTypes;
        } else {
          EventModel.getSensorTypes().then(function(resp) {
            sensorTypes = resp.data.Data;
            return scope.sensorTypes = sensorTypes;
          }, function(resp) {
            return mdToast.showSimple(resp.data.Message, "danger");
          });
        }
        return {
          view: "band-sensor-type",
          def: ""
        };
    }
  };
  return {
    restrict: 'E',
    scope: {
      name: '@',
      type: '@',
      model: '=',
      hide: '=',
      disabled: '=',
      readonly: '=',
      required: '='
    },
    template: "",
    link: function(scope, element, attrs) {
      var processing, render;
      processing = false;
      render = function() {
        var type;
        if (!scope.type || !scope.name || processing) {
          return;
        }
        processing = true;
        type = getControlByType(scope, scope.type);
        if (!scope.disabled) {
          scope.model = scope.model || type.def;
        }
        return element.replaceWith($compile($templateCache.get("directives/input-control/" + type.view + ".html"))(scope));
      };
      scope.$watch('name', function() {
        return render();
      });
      return scope.$watch('type', function() {
        return render();
      });
    }
  };
}]);

angular.module("directives.onLongPress", []).directive('onLongPress', ["$timeout", function($timeout) {
  return {
    restrict: 'A',
    link: function($scope, $elm, $attrs) {
      $elm.bind('touchstart mousedown', function(evt) {
        $scope.longPress = true;
        return $timeout(function() {
          if ($scope.longPress) {
            return $scope.$apply(function() {
              return $scope.$eval($attrs.onLongPress);
            });
          }
        }, 600);
      });
      return $elm.bind('touchend mouseup', function(evt) {
        $scope.longPress = false;
        if ($attrs.onTouchEnd) {
          return $scope.$apply(function() {
            return $scope.$eval($attrs.onTouchEnd);
          });
        }
      });
    }
  };
}]);

angular.module("resources.contact", []).factory("Contact", ["$http", "AppCfg", "Auth", function($http, AppCfg, Auth) {
  return {
    getAll: function(query) {
      return $http({
        url: AppCfg.apiUrl + "/friends",
        method: 'GET',
        params: {
          size: query.limit,
          page: query.page
        },
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    search: function(str, query) {
      return $http({
        url: AppCfg.apiUrl + ("/friends/search/" + str),
        method: 'GET',
        params: {
          size: query.limit,
          page: query.page
        },
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    request: function(username) {
      return $http.post(AppCfg.apiUrl + ("/friends/" + username), null, {
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    getRequests: function(interval) {
      interval = interval ? '/' + interval : "";
      return $http.get(AppCfg.apiUrl + ("/friends/requests" + interval), {
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    accept: function(username) {
      return $http.post(AppCfg.apiUrl + ("/friends/accept/" + username), null, {
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    getWaitingResponses: function() {
      return $http.get(AppCfg.apiUrl + "/friends/waitingresponse", {
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    "delete": function(username) {
      return $http["delete"](AppCfg.apiUrl + ("/friends/" + username), {
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    }
  };
}]);

angular.module("resources.eventModel", []).factory("EventModel", ["$http", "AppCfg", "Auth", function($http, AppCfg, Auth) {
  return {
    getConditions: function() {
      return $http.get(AppCfg.apiUrl + "/conditions", {
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    getActions: function() {
      return $http.get(AppCfg.apiUrl + "/actions", {
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    getSensorTypes: function() {
      return $http.get(AppCfg.apiUrl + "/sensortypes", {
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    }
  };
}]);

angular.module('resources.exercise', []).factory('Exercise', ["$http", "AppCfg", "Auth", function($http, AppCfg, Auth) {
  return {
    getAll: function(name, bodypart, level, focus, query) {
      return $http({
        url: AppCfg.apiUrl + '/exercise',
        method: 'GET',
        params: {
          name: name,
          bodypart: bodypart,
          level: level,
          focus: focus,
          page: query.page,
          size: query.limit
        },
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    getLevel: function() {
      return $http({
        url: AppCfg.apiUrl + '/exercise/level',
        method: 'GET',
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    getFocus: function() {
      return $http({
        url: AppCfg.apiUrl + '/exercise/focus',
        method: 'GET',
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    getBodyPart: function() {
      return $http({
        url: AppCfg.apiUrl + '/exercise/bodypart',
        method: 'GET',
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    }
  };
}]);

angular.module("resources.plan", []).factory("Plan", ["$http", "AppCfg", "Auth", function($http, AppCfg, Auth) {
  return {
    add: function(plan) {
      return $http.post(AppCfg.apiUrl + "/plans", plan, {
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    get: function(id) {
      return $http.get(AppCfg.apiUrl + ("/plans/" + id), {
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    getAll: function(query) {
      return $http({
        url: AppCfg.apiUrl + "/plans",
        method: 'GET',
        params: {
          size: query.limit,
          page: query.page
        },
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    "delete": function(id) {
      return $http["delete"](AppCfg.apiUrl + ("/plans/" + id), {
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    update: function(plan) {
      return $http.put(AppCfg.apiUrl + ("/plans/" + plan.ID), plan, {
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    getShare: function(id) {
      return $http.get(AppCfg.apiUrl + ("/plans/" + id + "/share"), {
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    share: function(id, username) {
      return $http.post(AppCfg.apiUrl + "/plans/share", {
        PlanID: id,
        Username: username
      }, {
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    },
    getNotify: function(interval) {
      interval = interval ? '/' + interval : "";
      return $http.get(AppCfg.apiUrl + ("/plans/sharenotify" + interval), {
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    }
  };
}]);

angular.module('resources.report', []).factory('Report', ["$http", "AppCfg", "Auth", function($http, AppCfg, Auth) {
  return {
    get: function(sensor, group, params) {
      return $http({
        url: AppCfg.apiUrl + ("/dashboard/" + sensor + "/" + group),
        method: 'GET',
        params: {
          func: params.func,
          fromTime: params.fromTime,
          toTime: params.toTime
        },
        headers: {
          Authorization: Auth.isAuthenticated().AccessToken
        }
      });
    }
  };
}]);

angular.module("app.resources", ["resources.plan", "resources.contact", "resources.eventModel", "resources.report", "resources.exercise"]);

angular.module("services.auth", []).factory("Auth", ["$http", "cookies", "AppCfg", "mdToast", function($http, cookies, AppCfg, mdToast) {
  var _user, auth;
  _user = null;
  auth = {
    login: function(identity) {
      return $http.post(AppCfg.apiUrl + "/account/login", identity);
    },
    logout: function() {
      cookies.clearAccesstoken();
      return _user = null;
    },
    register: function(user) {
      return $http.post(AppCfg.apiUrl + "/account/register", user);
    },
    setUser: function(u) {
      _user = u;
      return cookies.setAccesstoken(u);
    },
    validate: function(cookie) {
      return $http.get(AppCfg.apiUrl + "/user", {
        headers: {
          Authorization: cookie.AccessToken
        }
      });
    },
    isAuthenticated: function() {
      if (_user) {
        return _user;
      } else {
        _user = cookies.getAccesstoken();
        if (_user) {
          auth.validate(_user).then(function(resp) {
            setTimeout(function() {
              var error;
              try {
                return invokeCSharpAction("Token:" + resp.data.Data.AccessToken);
              } catch (error) {

              }
            }, 500);
            return _user = resp.data.Data;
          }, function(resp) {
            auth.logout();
            return mdToast.showSimple("Session expired.", "info");
          });
          return _user;
        } else {
          return false;
        }
      }
    }
  };
  return auth;
}]);

angular.module("services.cookies", []).factory("cookies", ["$cookies", "$sessionStorage", "mdToast", function($cookies, $sessionStorage, mdToast) {
  var cookies;
  cookies = {
    _tutorialdelay: 2000,
    _tutorialHideDelay: 10000,
    ACCESS_TOKEN: "access_token",
    TUTORIAL_CHANGE_PLAN_IMAGE_LEARNED: "tutorial_change_plan_image_learned",
    TUTORIAL_CHANGE_PLAN_IMAGE_LEARNED_TEXT: "Tips: Click on plan image to change",
    $cookies: function() {
      return $cookies;
    },
    setAccesstoken: function(user) {
      return $cookies.putObject(cookies.ACCESS_TOKEN, {
        AccessToken: user.AccessToken
      }, {
        expires: user.ExpireDate
      });
    },
    getAccesstoken: function() {
      return $cookies.getObject(cookies.ACCESS_TOKEN);
    },
    clearAccesstoken: function() {
      return $cookies.remove(cookies.ACCESS_TOKEN);
    },
    setTutorialLearned: function(tutorial) {
      return $sessionStorage[tutorial] = true;
    },
    learnTutorial: function(tutorial) {
      if (!this.isTutorialLearned(tutorial)) {
        return mdToast.show(mdToast.simple().textContent(cookies.TUTORIAL_CHANGE_PLAN_IMAGE_LEARNED_TEXT).action("I KNOW").highlightAction(true).position("bottom right").hideDelay(cookies._tutorialHideDelay)).then(function(resp) {
          if (resp === "ok") {
            return cookies.setTutorialLearned(tutorial);
          }
        });
      }
    },
    isTutorialLearned: function(tutorial) {
      return !!$sessionStorage[tutorial];
    }
  };
  return cookies;
}]);

angular.module("services.mdDialog", []).factory("mdDialog", ["$mdDialog", "$mdEditDialog", "$mdMedia", function($mdDialog, $mdEditDialog, $mdMedia) {
  return {
    $mdDialog: function() {
      return $mdDialog;
    },
    showEventSelector: function(evt, type, schemas) {
      return $mdDialog.show({
        templateUrl: 'dialog/event-model.html',
        controller: ["$scope", "$mdDialog", function($scope, $mdDialog) {
          $scope.title = "Add " + type;
          $scope.currentModelIdx = -1;
          $scope.type = type;
          $scope.model = null;
          $scope.schemas = schemas;
          $scope.cancel = function() {
            return $mdDialog.cancel();
          };
          return $scope.close = function() {
            return $mdDialog.hide($scope.model);
          };
        }],
        parent: angular.element(document.body),
        targetEvent: evt,
        clickOutsideToClose: true
      });
    },
    showConfirm: function(evt, title, content, type) {
      return $mdDialog.show({
        templateUrl: 'dialog/confirm.html',
        controller: ["$scope", "$mdDialog", function($scope, $mdDialog) {
          $scope.title = title;
          $scope.type = type ? type : "warn";
          $scope.content = content;
          $scope.cancel = function() {
            return $mdDialog.cancel();
          };
          return $scope.close = function() {
            return $mdDialog.hide();
          };
        }],
        parent: angular.element(document.body),
        targetEvent: evt,
        clickOutsideToClose: true
      });
    },
    showFriendRequests: function(evt, requests, isWaitingResponse) {
      return $mdDialog.show({
        templateUrl: 'dialog/friend-requests.html',
        controller: ["$scope", "$mdDialog", "Contact", "mdToast", function($scope, $mdDialog, Contact, mdToast) {
          $scope.contacts = requests;
          $scope.refresh = false;
          $scope.isWaitingResponse = isWaitingResponse;
          $scope.accept = function(contact) {
            return Contact.accept(contact.Username).then(function(resp) {
              $scope.contacts.remove(contact);
              $scope.refresh = true;
              return mdToast.showSimple(resp.data.Message, "success");
            }, function(resp) {
              return mdToast.showSimple(resp.data.Message, "danger");
            });
          };
          $scope.decline = function(contact) {
            return Contact["delete"](contact.Username).then(function(resp) {
              $scope.contacts.remove(contact);
              return mdToast.showSimple(resp.data.Message, "success");
            }, function(resp) {
              return mdToast.showSimple(resp.data.Message, "danger");
            });
          };
          return $scope.cancel = function() {
            if ($scope.refresh) {
              return $mdDialog.hide();
            } else {
              return $mdDialog.cancel();
            }
          };
        }],
        parent: angular.element(document.body),
        targetEvent: evt,
        clickOutsideToClose: true
      });
    },
    showContactsSelector: function(evt) {
      return $mdDialog.show({
        templateUrl: 'dialog/share-plan.html',
        controller: ["$scope", "$mdDialog", "AppCfg", "Contact", "mdToast", function($scope, $mdDialog, AppCfg, Contact, mdToast) {
          $scope.selected = [];
          $scope.contacts = {
            _items: [],
            _query: {
              limit: AppCfg.defaultLimit,
              total: 0,
              page: 1
            },
            getItemAtIndex: function(idx) {
              if (idx >= this._query.limit * this._query.page) {
                this._fetchMoreItems(idx);
                return null;
              } else {
                return this._items[idx];
              }
            },
            getLength: function() {
              return Math.min(this._items.length + 5, this._query.total);
            },
            refresh: function() {
              var _self;
              this._query.page = 1;
              _self = this;
              return Contact.getAll(this._query).then(function(resp) {
                _self._items = resp.data.Data.Result;
                return _self._query.total = resp.data.Data.Count;
              });
            },
            _fetchMoreItems: function(idx) {
              var _self;
              if (idx < this._query.total) {
                this._query.page += 1;
                _self = this;
                return Contact.getAll(this._query).then(function(resp) {
                  _self._items = _self._items.concat(resp.data.Data.Result);
                  return _self._query.total = resp.data.Data.Count;
                });
              }
            }
          };
          $scope.contacts.refresh();
          $scope.toggle = function(contact, list) {
            var idx;
            idx = list.indexOf(contact);
            if (idx > -1) {
              return list.splice(idx, 1);
            } else {
              return list.push(contact);
            }
          };
          $scope.exists = function(contact, list) {
            return list.indexOf(contact) > -1;
          };
          $scope.share = function(list) {
            return $mdDialog.hide(list);
          };
          $scope.decline = function(contact) {
            return Contact["delete"](contact.Username).then(function(resp) {
              $scope.contacts.remove(contact);
              return mdToast.showSimple(resp.data.Message, "success");
            }, function(resp) {
              return mdToast.showSimple(resp.data.Message, "danger");
            });
          };
          return $scope.cancel = function() {
            return $mdDialog.cancel();
          };
        }],
        parent: angular.element(document.body),
        targetEvent: evt,
        clickOutsideToClose: true
      });
    },
    showExSelector: function(evt) {
      return $mdDialog.show({
        templateUrl: 'dialog/exercises-dialog.html',
        controller: ["$rootScope", "$scope", "AppCfg", "Exercise", function($rootScope, $scope, AppCfg, Exercise) {
          $scope.selected = [];
          $scope.getVideoSrc = $rootScope.getVideoSrc;
          $scope.currentItemPre = null;
          $scope.exercises = {
            _items: [],
            _query: {
              limit: AppCfg.defaultLimit,
              total: 0,
              page: 1
            },
            getItemAtIndex: function(idx) {
              var item;
              if (idx >= this._query.limit * this._query.page) {
                this._fetchMoreItems(idx);
                return null;
              } else {
                item = this._items[idx];
                if (item) {
                  item.idx = idx;
                }
                return item;
              }
            },
            getLength: function() {
              return Math.min(this._items.length + 3, this._query.total);
            },
            refresh: function() {
              var _self;
              this._query.page = 1;
              _self = this;
              return Exercise.getAll($scope.name, $scope.bodyPart, $scope.level, $scope.focus, this._query).then(function(resp) {
                _self._items = resp.data.Data.Result;
                return _self._query.total = resp.data.Data.Count;
              });
            },
            _fetchMoreItems: function(idx) {
              var _self;
              if (idx < this._query.total) {
                this._query.page += 1;
                _self = this;
                return Exercise.getAll($scope.name, $scope.bodyPart, $scope.level, $scope.focus, this._query).then(function(resp) {
                  _self._items = _self._items.concat(resp.data.Data.Result);
                  return _self._query.total = resp.data.Data.Count;
                });
              }
            }
          };
          $scope.exercises.refresh();
          $scope.showExPreview = function(ex) {
            if (ex) {
              if (ex.showPreview) {
                $scope.currentItemPre = null;
              } else {
                if ($scope.currentItemPre) {
                  $scope.currentItemPre.showPreview = false;
                }
                $scope.currentItemPre = ex;
                $scope.topIndex = ex.idx + 2;
              }
              return ex.showPreview = !ex.showPreview;
            }
          };
          $scope.$watch("[name, bodypart, level, focus]", function() {
            return $scope.exercises.refresh();
          });
          $scope.togglePreview = function($event, showPreview) {
            console.log($event);
            if ($event.target.tagetName !== "INPUT") {
              return !showPreview;
            }
            return showPreview;
          };
          $scope.toggle = function(ex, list) {
            var idx;
            idx = list.indexOf(ex);
            if (idx > -1) {
              return list.splice(idx, 1);
            } else {
              return list.push(ex);
            }
          };
          $scope.exists = function(ex, list) {
            return list.indexOf(ex) > -1;
          };
          $scope.loadBodyParts = function() {
            if (!$scope.bodyParts) {
              return Exercise.getBodyPart().then(function(resp) {
                return $scope.bodyParts = resp.data.Data;
              });
            }
          };
          $scope.loadFocuss = function() {
            if (!$scope.focuss) {
              return Exercise.getFocus().then(function(resp) {
                return $scope.focuss = resp.data.Data;
              });
            }
          };
          $scope.loadLevels = function() {
            if (!$scope.levels) {
              return Exercise.getLevel().then(function(resp) {
                return $scope.levels = resp.data.Data;
              });
            }
          };
          $scope.cancel = function() {
            return $mdDialog.cancel();
          };
          return $scope.close = function(list) {
            return $mdDialog.hide(list);
          };
        }],
        parent: angular.element(document.body),
        targetEvent: evt,
        clickOutsideToClose: true,
        fullscreen: $mdMedia('sm') || $mdMedia('xs')
      });
    },
    showSetEdit: function(evt, exercise) {
      evt.stopPropagation();
      return $mdEditDialog.large({
        targetEvent: evt,
        title: 'Edit set',
        modelValue: exercise.Sets,
        type: 'number',
        validators: {
          min: 0,
          max: 99
        },
        save: function(input) {
          exercise.Sets = input.$modelValue;
          if (exercise.Sets > 1) {
            return exercise.RestTime = "AsNeed";
          } else {
            return exercise.RestTime = null;
          }
        }
      });
    },
    showCompletionEdit: function(evt, exercise) {
      evt.stopPropagation();
      return $mdEditDialog.show({
        targetEvent: evt,
        templateUrl: 'dialog/edit-completion.html',
        controller: function($scope, $element) {
          $scope.duration = 1;
          $scope.selectedIndex = 0;
          $scope.durationMin = 1;
          $scope.durationSec = 0;
          $scope.repetitionCount = 1;
          $scope.repetitionChecker = 1;
          if (exercise.Duration) {
            $scope.durationMin = Math.floor(exercise.Duration / 60);
            $scope.durationSec = exercise.Duration % 60;
          } else if (exercise.Repetitions) {
            $scope.selectedIndex = 1;
            $scope.repetition = 1;
            $scope.duration = null;
            if (exercise.Repetitions === -1) {
              $scope.repetitionChecker = 0;
            } else {
              $scope.repetitionChecker = 1;
              $scope.repetitionCount = exercise.Repetitions;
            }
          }
          $scope.cancel = function() {
            $element.remove();
          };
          return $scope.save = function() {
            console.log($scope);
            if ($scope.repetition) {
              exercise.Duration = null;
              if (+$scope.repetitionChecker === 1) {
                exercise.Repetitions = $scope.repetitionCount;
              } else {
                exercise.Repetitions = -1;
              }
            } else if ($scope.duration) {
              exercise.Repetitions = null;
              exercise.Duration = "" + ($scope.durationMin * 60 + $scope.durationSec);
            }
            $element.remove();
          };
        }
      });
    },
    showRestTimeEdit: function(evt, exercise) {
      evt.stopPropagation();
      return $mdEditDialog.show({
        targetEvent: evt,
        templateUrl: 'dialog/edit-rest-between-sets.html',
        controller: function($scope, $element) {
          if (exercise.Sets < 2) {
            $scope.cancel();
          }
          $scope.restTimeChecker = 1;
          $scope.restTimeMin = 1;
          $scope.restTimeSec = 0;
          if (exercise.RestTime) {
            if (exercise.RestTime === "AsNeed") {
              $scope.restTimeChecker = 0;
            } else if (exercise.RestTime) {
              $scope.restTimeMin = Math.floor(exercise.RestTime / 60);
              $scope.restTimeSec = exercise.RestTime % 60;
            }
          }
          $scope.cancel = function() {
            $element.remove();
          };
          return $scope.save = function() {
            if (+$scope.restTimeChecker === 0) {
              exercise.RestTime = "AsNeed";
            } else {
              exercise.RestTime = "" + ($scope.restTimeMin * 60 + $scope.restTimeSec);
            }
            $element.remove();
          };
        }
      });
    },
    showExPreview: function(evt, exercise) {
      evt.stopPropagation();
      return $mdEditDialog.show({
        targetEvent: evt,
        controller: function($scope) {
          return $scope.exercise = exercise;
        },
        templateUrl: 'dialog/exercise-preview.html'
      });
    }
  };
}]);

angular.module("services.mdToast", []).factory("mdToast", ["$mdToast", function($mdToast) {
  return {
    $mdToast: function() {
      return $mdToast;
    },
    show: function(optionsOrPreset) {
      return $mdToast.show(optionsOrPreset);
    },
    hide: function(response) {
      return $mdToast.hide(response);
    },
    cancel: function(response) {
      return $mdToast.cancel(response);
    },
    simple: function() {
      return $mdToast.simple();
    },
    showSimple: function(message, type) {
      if (!type) {
        return $mdToast.show($mdToast.simple().textContent(message).position("bottom right").hideDelay(3000));
      } else {
        return $mdToast.show($mdToast.simple().textContent(message).position("bottom right").hideDelay(3000).theme(type + "-toast"));
      }
    }
  };
}]);

angular.module("app.services", ["services.auth", "services.mdToast", "services.mdDialog", "services.cookies"]);

angular.module('shared.helper', []).run(["$rootScope", function($rootScope) {
  $rootScope.$$on = function(events, fn) {
    var e, i, len, ref, results;
    ref = events.split(/[ ,]+/);
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      e = ref[i];
      results.push($rootScope.$on(e, fn));
    }
    return results;
  };
  return $rootScope.getVideoSrc = function(id) {
    return "https://az803746.vo.msecnd.net/tenant/amp/entityid/" + id + "?blobrefkey=103&$blob=1";
  };
}]);

angular.module('app.shared', ['shared.helper']);

angular.module("templates", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/login.html", "<div layout=\"row\" layout-align=\"center center\" id=\"login-page\" ng-controller=\"AuthCtrl\">\r\n    <md-card md-whiteframe=\"24\">\r\n        <md-card-header class=\"blue darken-3 white-text\" md-whiteframe=\"2\">\r\n            <md-card-avatar>\r\n                <img src=\"../images/logo.png\" />\r\n            </md-card-avatar>\r\n            <md-card-header-text>\r\n                <span class=\"md-headline\">Powerful Trainer</span>\r\n            </md-card-header-text>\r\n            <md-button class=\"md-fab md-mini white\" aria-label=\"Register\" ui-sref=\"register\">\r\n                <md-tooltip md-direction=\"right\" ng-hide=\"hideTooltipOnXS\">\r\n                    Register\r\n                </md-tooltip>\r\n                <md-icon md-font-icon=\"fa fa-plus fa-15x\" class=\"blue-grey-text\"></md-icon>\r\n            </md-button>\r\n        </md-card-header>\r\n        <md-progress-linear ng-if=\"progressing\" md-mode=\"indeterminate\"></md-progress-linear>\r\n        <md-card-content layout=\"col\" layout-align=\"center center\">\r\n            <form name=\"loginForm\" ng-submit=\"login(loginForm)\">\r\n                <md-input-container class=\"md-block\">\r\n                    <md-icon md-font-icon=\"fa fa-user\"></md-icon>\r\n                    <input name=\"username\" ng-model=\"user.username\" type=\"text\" placeholder=\"Username\" required />\r\n                </md-input-container>\r\n                <md-input-container class=\"md-block\">\r\n                    <md-icon md-font-icon=\"fa fa-key\"></md-icon>\r\n                    <input name=\"password\" ng-model=\"user.password\" type=\"password\" placeholder=\"Password\" required />\r\n                </md-input-container>\r\n                <div layout=\"row\" layout-align=\"center center\">\r\n                    <md-button type=\"submit\" class=\"md-fab md-primary\" ng-disabled=\"!isValidForm(loginForm) || progressing\" title=\"Login\" aria-label=\"Login\" ng-click=\"login(loginForm)\">\r\n                        <md-icon md-font-icon=\"fa fa-arrow-right fa-15x\"></md-icon>\r\n                    </md-button>\r\n                </div>\r\n            </form>\r\n        </md-card-content>\r\n    </md-card>\r\n</div>");
  $templateCache.put("auth/register.html", "<div layout=\"column\" layout-align=\"center center\" layout-fill id=\"register-page\" ng-controller=\"AuthCtrl\">\r\n    <md-card md-whiteframe=\"24\">\r\n        <md-card-header class=\"blue darken-3 white-text\" md-whiteframe=\"2\">\r\n            <md-button title=\"Login\" aria-label=\"Login\" class=\"md-icon-button\" ui-sref=\"login\">\r\n                <md-icon class=\"white-text\" md-font-icon=\"fa fa-arrow-left fa-inverse fa-15x\"></md-icon>\r\n            </md-button>\r\n            <md-card-avatar>\r\n                <img src=\"../images/logo.png\" />\r\n            </md-card-avatar>\r\n            <md-card-header-text>\r\n                <span class=\"md-headline\">Powerful Trainer</span>\r\n            </md-card-header-text>\r\n        </md-card-header>\r\n        <md-progress-linear ng-if=\"progressing\" md-mode=\"indeterminate\"></md-progress-linear>\r\n        <md-card-content>\r\n            <form layout=\"column\" layout-gt-sm=\"row\" name=\"registerForm\" ng-submit=\"register(registerForm)\">\r\n                <div flex layout-padding layout=\"column\">\r\n                    <md-input-container layout-align=\"center center\" layout=\"row\">\r\n                        <img ng-if=\"user.avatar\" src=\"../images/avatar-default.png\" data-ng-src=\"{{user.avatar}}\"\r\n                             class=\"md-avatar\" width=\"160\" height=\"160\"/>\r\n                        <img ng-if=\"!user.avatar\" src=\"../images/avatar-default.png\" class=\"md-avatar\" width=\"160\" height=\"160\" />\r\n                    </md-input-container>\r\n                    <md-input-container class=\"md-block\">\r\n                        <md-icon md-font-icon=\"fa fa-picture-o\"></md-icon>\r\n                        <div layout=\"row\" style=\"height:20px\">\r\n                            <md-button class=\"md-primary md-mini md-raised\" ng-click=\"showUserAvatarPicker(registerForm)\"\r\n                                       style=\"margin-top:-4px\" aria-label=\"Choose a avatar image\">Choose</md-button>\r\n                            <md-input-container class=\"md-block\" style=\"margin:0\">\r\n                                <label>Avatar</label>\r\n                                <input type=\"text\" ng-model=\"userAvatar.filename\" ng-disabled=\"true\" />\r\n                                <div ng-messages=\"registerForm.userAvatar.$error\" md-auto-hide=\"false\">\r\n                                    <div ng-message=\"maxsize\">The size maximun is 1025KB</div>\r\n                                    <div ng-message=\"accept\">Not a valid image</div>\r\n                                </div>\r\n                                <small ng-show=\"userAvatar\" class=\"red-text pointer\"\r\n                                       ng-click=\"removeAvatar(registerForm)\"><u>Remove avatar</u></small>\r\n                            </md-input-container>\r\n                        </div>\r\n                        <input id=\"userAvatarPicker\" aria-label=\"Image picker\" name=\"userAvatar\" ng-hide=\"true\" ng-model=\"userAvatar\" type=\"file\"\r\n                               maxsize=\"1024\" accept=\"image/*\" base-sixty-four-input on-after-validate=\"setUserAvatar\" />\r\n                    </md-input-container>\r\n                    <md-input-container class=\"md-block\">\r\n                        <md-icon md-font-icon=\"fa fa-user-md\"></md-icon>\r\n                        <input name=\"name\" ng-model=\"user.name\" type=\"text\" placeholder=\"Full name\" maxlength=\"40\" />\r\n                        <div ng-messages=\"registerForm.name.$error\">\r\n                            <div ng-message=\"maxlength\">The name is too long! (max: 40).</div>\r\n                        </div>\r\n                    </md-input-container>\r\n                    <div layout-gt-xs=\"row\">\r\n                        <md-input-container class=\"md-block\">\r\n                            <label>Gender</label>\r\n                            <md-icon md-font-icon=\"fa fa-venus-mars\"></md-icon>\r\n                            <md-select ng-model=\"user.gender\">\r\n                                <md-option ng-repeat=\"gender in [\'Male\', \'Female\', \'Other\'] track by $index\" value=\"{{$index}}\">{{gender}}</md-option>\r\n                            </md-select>\r\n                        </md-input-container>\r\n                        <div layout=\"column\">\r\n                            <mdp-date-picker mdp-open-on-click name=\"birthday\" mdp-placeholder=\"Birthday (mm/dd/yyyy)\"\r\n                                             mdp-format=\"MM/DD/YYYY\" ng-model=\"user.birthday\"></mdp-date-picker>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div flex layout-padding layout=\"column\">\r\n                    <md-input-container class=\"md-block\">\r\n                        <md-icon md-font-icon=\"fa fa-user\"></md-icon>\r\n                        <input name=\"username\" ng-model=\"user.username\" type=\"text\" placeholder=\"Username\" required minlength=\"3\" maxlength=\"10\" />\r\n                        <div ng-messages=\"registerForm.username.$error\">\r\n                            <div ng-message-exp=\"[\'required\', \'minlength\', \'maxlength\']\">The username must be between 3 and 10 characters.</div>\r\n                        </div>\r\n                    </md-input-container>\r\n                    <md-input-container class=\"md-block\">\r\n                        <md-icon md-font-icon=\"fa fa-key\"></md-icon>\r\n                        <input name=\"password\" ng-model=\"user.password\" type=\"password\" placeholder=\"Password\" required minlength=\"8\" maxlength=\"50\" />\r\n                        <div ng-messages=\"registerForm.password.$error\">\r\n                            <div ng-message-exp=\"[\'required\', \'minlength\', \'maxlength\']\">The password must be between 8 and 50 characters.</div>\r\n                        </div>\r\n                    </md-input-container>\r\n                    <md-input-container class=\"md-block\">\r\n                        <md-icon md-font-icon=\"fa fa-key\"></md-icon>\r\n                        <input name=\"password_confirmation\" ng-model=\"user.password_confirmation\" type=\"password\" placeholder=\"Confirm password\" required match=\"user.password\" />\r\n                        <div ng-messages=\"registerForm.password_confirmation.$error\">\r\n                            <div ng-message=\"match\">The password confirmation do not match.</div>\r\n                        </div>\r\n                    </md-input-container>\r\n                    <md-input-container class=\"md-block\" ng-if=\"false\">\r\n                        <md-checkbox ng-model=\"user.type\">\r\n                            Become a trainer.\r\n                        </md-checkbox>\r\n                    </md-input-container>\r\n                    <md-input-container class=\"md-block\">\r\n                        <md-checkbox ng-model=\"user.checkbox\">\r\n                            Agree to our Terms and Data Policy.\r\n                        </md-checkbox>\r\n                    </md-input-container>\r\n                    <div layout=\"row\" layout-align=\"center center\">\r\n                        <md-button type=\"submit\" class=\"md-fab md-primary\" ng-disabled=\"!user.checkbox || !isValidForm(registerForm) || progressing\" title=\"Register\" aria-label=\"Register\" ng-click=\"register(registerForm)\">\r\n                            <md-icon md-font-icon=\"fa fa-check fa-15x\"></md-icon>\r\n                        </md-button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </md-card-content>\r\n    </md-card>\r\n</div>");
  $templateCache.put("contact/index.html", "<div class=\"toolbar-fixed\" layout=\"column\" layout-align=\"center none\" flex>\r\n    <md-toolbar md-scroll-shrink ng-if=\"true\" md-whiteframe=\"2\" flex>\r\n        <div class=\"md-toolbar-tools\">\r\n            <md-button hide-gt-sm class=\"md-icon-button\" aria-label=\"Left navigation toggle\" ng-click=\"toggleNavLeft()\" ng-controller=\"DashboardCtrl\">\r\n                <md-icon md-font-icon=\"fa fa-bars fa-15x\"></md-icon>\r\n            </md-button>\r\n            <div layout-align=\"start center\" ng-show=\"toggleSearch\" class=\"fix-search\">\r\n                <div style=\"display:inline-flex\">\r\n                    <md-input-container md-theme=\"default-yellow-dark\" md-no-float>\r\n                        <input id=\"searchBox\" type=\"text\" ng-model=\"searchStr\" ng-change=\"search(searchStr)\"\r\n                               focus-me=\"toggleSearch\" placeholder=\"Search...\" />\r\n                    </md-input-container>\r\n                </div>\r\n            </div>\r\n            <h3 class=\"md-title\" ng-hide=\"toggleSearch\">Contacts ({{contacts.length || 0}})</h3>\r\n            <md-button class=\"md-icon-button\" aria-label=\"Search\" ng-click=\"toggleSearch=!toggleSearch\">\r\n                <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                    Search\r\n                </md-tooltip>\r\n                <md-icon md-font-icon=\"fa fa-search fa-15x\" ng-class=\"{\'amber-text\': toggleSearch}\"></md-icon>\r\n            </md-button>\r\n            <span flex></span>\r\n            <md-chips style=\"display:inline-table\">\r\n                <md-chip ng-click=\"showWaiting($event, waitingResponses)\" class=\"pointer grey lighten-2\" ng-class=\"{\'lighten-5\': waitingResponses.length}\">\r\n                    <i class=\"fa fa-signing\"></i>\r\n                    {{waitingResponses.length}}\r\n                    <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS&&waitingResponses.length\">\r\n                        <span ng-hide=\"waitingResponses.length\">You don\'t have any waiting response</span>\r\n                        <span ng-show=\"waitingResponses.length\">You have {{waitingResponses.length}} waiting response{{waitingResponses.length==1?\'\':\'s\'}}</span>\r\n                    </md-tooltip>\r\n                </md-chip>\r\n                <md-chip ng-click=\"showRequests($event, requests)\" class=\"pointer grey  lighten-2\" ng-class=\"{\'lighten-5\': requests.length}\">\r\n                    <i class=\"fa fa-user-plus\"></i>\r\n                    {{requests.length}}\r\n                    <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS&&requests.length\">\r\n                        <span ng-hide=\"requests.length\">You don\'t have any request</span>\r\n                        <span ng-show=\"requests.length\">You have {{requests.length}} new request{{requests.length==1?\'\':\'s\'}}</span>\r\n                    </md-tooltip>\r\n                </md-chip>\r\n            </md-chips>\r\n            <md-button ng-if=\"false\" class=\"md-fab md-mini\" aria-label=\"Add\" ui-sref=\"cpanel.contact.add\">\r\n                <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                    Add contact\r\n                </md-tooltip>\r\n                <md-icon md-font-icon=\"fa fa-plus fa-15x\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-content flex>\r\n        <div layout=\"row\" layout-align=\"center center\" ng-show=\"contacts.length==0&&!searchStr.length\">\r\n            <h3>Oops...You don\'t have any contacts.</h3>\r\n        </div>\r\n        <md-list ng-hide=\"searchStr.length\">\r\n            <md-list-item md-ink-ripple class=\"md-2-line\" ng-repeat=\"contact in contacts\" ng-click=\"false\"\r\n                          ng-mouseenter=\"showMenuBtn=true\" ng-mouseleave=\"showMenuBtn=false\">\r\n                <img src=\"../images/avatar-default.png\" data-ng-src=\"{{contact.Avatar}}\" class=\"md-avatar\">\r\n                <div class=\"md-list-item-text\">\r\n                    <h3><b>{{contact.Name || contact.Username}}</b></h3>\r\n                    <p>\r\n                        {{contact.Username}}\r\n                        <span ng-show=\"contact.Type\"> (Trainer)</span>\r\n                    </p>\r\n                </div>\r\n                <div class=\"md-secondary\" ng-show=\"showMenuBtn\">\r\n                    <md-button class=\"md-fab md-raised md-mini md-accent\" aria-label=\"Unfriend\" ng-click=\"delete($event, contact)\">\r\n                        <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                            Unfriend\r\n                        </md-tooltip>\r\n                        <md-icon md-font-icon=\"fa fa-trash fa-15x\"></md-icon>\r\n                    </md-button>\r\n                </div>\r\n                <md-divider ng-if=\"!$last\"></md-divider>\r\n            </md-list-item>\r\n        </md-list>\r\n        <md-list ng-show=\"searchStr.length\">\r\n            <md-subheader class=\"md-no-sticky\">Search for \"{{showResults}}\": {{query.total}} result{{query.total<=1?\'\':\'s\'}}</md-subheader>\r\n            <md-list-item md-ink-ripple class=\"md-2-line\" ng-repeat=\"contact in contacts\">\r\n                <img src=\"../images/avatar-default.png\" data-ng-src=\"{{contact.Avatar}}\" class=\"md-avatar\">\r\n                <div class=\"md-list-item-text\">\r\n                    <h3>\r\n                        <b>{{contact.Name || contact.Username}}</b>\r\n                        <small ng-show=\"contact.IsWaitingResponse\">\r\n                            you have sent add friend request\r\n                        </small>\r\n                        <small ng-show=\"contact.IsWaitingAccept\">\r\n                            ask you to be friend\r\n                        </small>\r\n                    </h3>\r\n                    <p>\r\n                        {{contact.Username}}\r\n                        <span ng-show=\"contact.Type\"> (Trainer)</span>\r\n                    </p>\r\n                </div>\r\n                <div class=\"md-secondary\" layout=\"row\">\r\n                    <md-chips>\r\n                        <md-chip class=\"pointer\" ng-show=\"contact.IsWaitingResponse\" ng-click=\"cancel($event, contact)\">\r\n                            Cancel request\r\n                        </md-chip>\r\n                        <md-chip class=\"pointer\" ng-show=\"contact.IsWaitingAccept\" ng-click=\"accept(contact)\">\r\n                            Accept\r\n                        </md-chip>\r\n                        <md-chip class=\"pointer\" ng-show=\"contact.IsWaitingAccept\" ng-click=\"decline(contact)\">\r\n                            Decline\r\n                        </md-chip>\r\n                        <md-chip class=\"pointer\" ng-show=\"contact.IsFriend\" ng-click=\"delete($event, contact)\">\r\n                            Unfriend\r\n                        </md-chip>\r\n                        <md-chip class=\"pointer teal white-text\" ng-show=\"!contact.IsWaitingResponse&&!contact.IsWaitingAccept&&!contact.IsFriend\"\r\n                                 ng-click=\"add($event, contact)\">\r\n                            Add friend\r\n                        </md-chip>\r\n                    </md-chips>\r\n                </div>\r\n                <md-divider ng-if=\"!$last\"></md-divider>\r\n            </md-list-item>\r\n        </md-list>\r\n        <md-table-pagination ng-hide=\"query.total<=query.limit\" md-limit=\"query.limit\" md-limit-options=\"query.limitOptions\" md-page=\"query.page\" md-label=\"{page: \'Page:\', rowsPerPage: \'Per page:\', of: \'of\'}\"\r\n                             md-total=\"{{query.total}}\" md-on-paginate=\"queryResults\" md-page-select></md-table-pagination>\r\n    </md-content>\r\n</div>");
  $templateCache.put("dashboard/index.html", "<div layout=\"column\" class=\"toolbar-fixed\">\r\n    <md-toolbar class=\"blue darken-3\" md-whiteframe=\"2\">\r\n        <div class=\"md-toolbar-tools\">\r\n            <md-button hide-gt-sm class=\"md-icon-button\" aria-label=\"Left navigation toggle\" ng-click=\"toggleNavLeft()\" ng-controller=\"DashboardCtrl\">\r\n                <md-icon md-font-icon=\"fa fa-bars fa-15x\"></md-icon>\r\n            </md-button>\r\n            <h2>\r\n                <b>Dashboard</b>\r\n            </h2>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-content>\r\n\r\n    </md-content>\r\n</div>");
  $templateCache.put("dialog/confirm.html", "<md-dialog>\r\n    <md-toolbar class=\"md-{{type}}\">\r\n        <div class=\"md-toolbar-tools\">\r\n            <h2>{{title}}</h2>\r\n            <span flex></span>\r\n            <md-button class=\"md-icon-button\" aria-label=\"{{title}}\" ng-click=\"cancel()\">\r\n                <md-icon md-font-icon=\"fa fa-times fa-15x\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-dialog-content>\r\n        <div class=\"md-dialog-content\" layout=\"column\" layout-align=\"center center\">\r\n            {{content}}\r\n        </div>\r\n    </md-dialog-content>\r\n    <md-dialog-actions layout=\"row\">\r\n        <span flex></span>\r\n        <md-button  md-autofocus class=\"md-accent\" aria-label=\"Cancel\" ng-click=\"cancel()\">\r\n            Cancel\r\n        </md-button>\r\n        <md-button class=\"md-primary\" aria-label=\"Ok\" ng-click=\"close()\">\r\n            Confirm\r\n        </md-button>\r\n    </md-dialog-actions>\r\n</md-dialog>");
  $templateCache.put("dialog/edit-completion.html", "<md-edit-dialog>\r\n    <md-tabs md-selected=\"selectedIndex\" style=\"min-height:200px\">\r\n        <md-tab label=\"duration\" ng-click=\"repetition=null;duration=1;\">\r\n            <md-content layout-padding layout=\"row\">\r\n                <md-input-container style=\"max-width:50px\">\r\n                    <input type=\"number\" ng-model=\"durationMin\" min=\"0\" max=\"99\" placeholder=\"Min\"/>\r\n                </md-input-container>\r\n                <md-input-container style=\"max-width:50px\">\r\n                    <input type=\"number\" ng-model=\"durationSec\" min=\"0\" max=\"59\" placeholder=\"Sec\" />\r\n                </md-input-container>\r\n            </md-content>\r\n        </md-tab>\r\n        <md-tab label=\"repetition\" ng-click=\"duration=null;repetitionChecker=repetitionChecker||1;repetition=1\">\r\n            <md-content layout-padding>\r\n                <md-radio-group layout=\"column\" ng-model=\"repetitionChecker\">\r\n                    <div layout=\"row\">\r\n                        <md-radio-button value=\"1\"></md-radio-button>\r\n                        <md-input-container style=\"max-width:50px\">\r\n                            <input type=\"number\" min=\"1\" ng-model=\"repetitionCount\" ng-disabled=\"repetitionChecker==0\" max=\"999\" placeholder=\"Reps\" />\r\n                        </md-input-container>\r\n                    </div>\r\n                    <md-radio-button value=\"0\">Max reps</md-radio-button>\r\n                </md-radio-group>\r\n            </md-content>\r\n        </md-tab>\r\n    </md-tabs>\r\n    <md-actions>\r\n        <md-button class=\"md-accent md-ink-ripple\" ng-click=\"cancel()\">CANCEL</md-button>\r\n        <md-button class=\"md-primary md-ink-ripple\" ng-click=\"save()\">SAVE</md-button>\r\n    </md-actions>\r\n</md-edit-dialog>");
  $templateCache.put("dialog/edit-rest-between-sets.html", "<md-edit-dialog>\r\n    <md-content layout-padding>\r\n        <md-radio-group layout=\"column\" ng-model=\"restTimeChecker\">\r\n            <div layout=\"row\">\r\n                <md-radio-button value=\"1\"></md-radio-button>\r\n                <md-input-container style=\"max-width:50px\">\r\n                    <input type=\"number\" ng-model=\"restTimeMin\" ng-disabled=\"restTimeChecker==0\" min=\"0\" max=\"99\" placeholder=\"Min\" />\r\n                </md-input-container>\r\n                <md-input-container style=\"max-width:50px\">\r\n                    <input type=\"number\" ng-model=\"restTimeSec\" ng-disabled=\"restTimeChecker==0\" min=\"0\" max=\"59\" placeholder=\"Sec\" />\r\n                </md-input-container>\r\n            </div>\r\n            <md-radio-button value=\"0\">As need</md-radio-button>\r\n        </md-radio-group>\r\n    </md-content>\r\n    <md-actions layout=\"row\">\r\n        <md-button class=\"md-accent md-ink-ripple\" ng-click=\"cancel()\">CANCEL</md-button>\r\n        <md-button class=\"md-primary md-ink-ripple\" ng-click=\"save()\">SAVE</md-button>\r\n    </md-actions>\r\n</md-edit-dialog>");
  $templateCache.put("dialog/event-model.html", "<md-dialog>\r\n    <md-toolbar>\r\n        <div class=\"md-toolbar-tools\">\r\n            <h2>{{title}}</h2>\r\n            <span flex></span>\r\n            <md-button class=\"md-icon-button\" aria-label=\"Close dialog\" ng-click=\"cancel()\">\r\n                <md-icon md-font-icon=\"fa fa-times fa-15x\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-dialog-content>\r\n        <div class=\"md-dialog-content\" layout=\"column\">\r\n            <md-input-container>\r\n                <label>{{type.capitalizeFirstLetter()}}</label>\r\n                <md-select ng-model=\"currentModelIdx\">\r\n                    <md-option ng-repeat=\"schema in schemas track by $index\" value=\"{{$index}}\">\r\n                        {{schema.Name}}\r\n                    </md-option>\r\n                </md-select>\r\n            </md-input-container>\r\n            <div ng-show=\"currentModelIdx != -1\">\r\n                <event-model type=\"{{type}}\" model=\"model\" schema=\"schemas[currentModelIdx]\"></event-model>\r\n            </div>\r\n        </div>\r\n    </md-dialog-content>\r\n    <md-dialog-actions layout=\"row\">\r\n        <span flex></span>\r\n        <md-button class=\"md-accent\" aria-label=\"Cancel\" ng-click=\"cancel()\">\r\n            Cancel\r\n        </md-button>\r\n        <md-button class=\"md-primary\" aria-label=\"Ok\" ng-click=\"close()\">\r\n            Ok\r\n        </md-button>\r\n    </md-dialog-actions>\r\n</md-dialog>");
  $templateCache.put("dialog/exercise-preview.html", "<md-edit-dialog>\r\n    <md-content layout=\"row\">\r\n        <video width=\"400\" height=\"225\" controls autoplay>\r\n            <source src=\"\" ng-src=\"{{getVideoSrc(exercise.VideoId)}}\" type=\"video/mp4\">\r\n            Your browser does not support the video tag.\r\n        </video>\r\n        <div layout=\"column\" layout-padding style=\"max-width:300px\">\r\n            <div>\r\n                Difficulty level<br />\r\n                {{exercise.DifficultyLevel}}\r\n            </div>\r\n            <div>\r\n                Focus<br />\r\n                {{exercise.Focus}}\r\n            </div>\r\n            <div>\r\n                Equipment<br />\r\n                {{exercise.Equipment}}\r\n            </div>\r\n            <div>\r\n                Body part(s)<br />\r\n                {{exercise.BodyParts}}\r\n            </div>\r\n        </div>\r\n    </md-content>\r\n</md-edit-dialog>");
  $templateCache.put("dialog/exercises-dialog.html", "<md-dialog style=\"width:100%;height:100%\">\r\n    <md-toolbar>\r\n        <div class=\"md-toolbar-tools\">\r\n            <h2>Select exercise</h2>\r\n            <span flex></span>\r\n            <md-button class=\"md-icon-button\" aria-label=\"Close dialog\" ng-click=\"cancel()\">\r\n                <md-icon md-font-icon=\"fa fa-times fa-15x\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-dialog-content>\r\n        <div class=\"md-dialog-content\" layout=\"column\" layout-align=\"center\">\r\n            <div layout=\"column\" layout-gt-sm=\"row\" layout-align-gt-sm=\"center center\" flex>\r\n                <md-input-container class=\"md-block\" flex>\r\n                    <input type=\"text\" ng-model=\"name\" name=\"search\" placeholder=\"Search...\" ng-change=\"exercises.refresh()\" />\r\n                    <u class=\"blue-text pointer\" ng-click=\"showAdvanced=!showAdvanced\"><small>{{showAdvanced?\'Hide\':\'Show\'}} advanced</small></u>\r\n                </md-input-container>\r\n                <div flex-gt-sm=\"20\" layout-gt-sm=\"row\" style=\"margin-top:-23px;max-height:70px\" ng-show=\"showAdvanced\">\r\n                    <md-input-container class=\"md-block\">\r\n                        <md-select placeholder=\"Level\" ng-model=\"level\" md-on-open=\"loadLevels()\" style=\"min-width: 200px;\">\r\n                            <md-option ng-value=\"lv\" ng-repeat=\"lv in levels\">{{lv}}</md-option>\r\n                        </md-select>\r\n                    </md-input-container>\r\n                    <md-input-container class=\"md-block\">\r\n                        <md-select placeholder=\"Body parts\" ng-model=\"bodypart\" md-on-open=\"loadBodyParts()\" style=\"min-width: 200px;\">\r\n                            <md-option ng-value=\"bp\" ng-repeat=\"bp in bodyParts\">{{bp}}</md-option>\r\n                        </md-select>\r\n                    </md-input-container>\r\n                    <md-input-container class=\"md-block\">\r\n                        <md-select placeholder=\"Focus\" ng-model=\"focus\" md-on-open=\"loadFocuss()\" style=\"min-width: 200px;\">\r\n                            <md-option ng-value=\"fs\" ng-repeat=\"fs in focuss\">{{fs}}</md-option>\r\n                        </md-select>\r\n                    </md-input-container>\r\n                </div>\r\n            </div>\r\n            <md-virtual-repeat-container style=\"height:400px\" md-top-index=\"topIndex\">\r\n                <div md-virtual-repeat=\"ex in exercises\" md-on-demand class=\"repeated-item\" flex>\r\n                    <div layout=\"column\">\r\n                        <div layout=\"row\" layout-align=\"start center\" class=\"pointer\">\r\n                            <md-checkbox ng-checked=\"exists(ex, selected)\" ng-click=\"toggle(ex, selected)\" aria-label=\"{{ex.Name}}\"></md-checkbox>\r\n                            <div layout=\"row\" layout-align=\"start center\" ng-click=\"showExPreview(ex)\">\r\n                                <img src=\"\" ng-src=\"{{ex.Thumbnail}}\" class=\"md-avatar\" />\r\n                                {{ex.Name}}\r\n                            </div>\r\n                        </div>\r\n                        <div layout=\"column\" layout-gt-sm=\"row\" ng-if=\"ex.showPreview\">\r\n                            <video width=\"400\" height=\"225\" controls autoplay>\r\n                                <source src=\"\" ng-src=\"{{getVideoSrc(ex.VideoId)}}\" type=\"video/mp4\">\r\n                                Your browser does not support the video tag.\r\n                            </video>\r\n                            <div layout=\"column\" layout-padding>\r\n                                <div>\r\n                                    Difficulty level<br />\r\n                                    {{ex.DifficultyLevel}}\r\n                                </div>\r\n                                <div>\r\n                                    Focus<br />\r\n                                    {{ex.Focus}}\r\n                                </div>\r\n                                <div>\r\n                                    Equipment<br />\r\n                                    {{ex.Equipment}}\r\n                                </div>\r\n                                <div>\r\n                                    Body part(s)<br />\r\n                                    {{ex.BodyParts}}\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </md-virtual-repeat-container>\r\n        </div>\r\n    </md-dialog-content>\r\n    <md-dialog-actions layout=\"row\">\r\n        <span flex></span>\r\n        <md-button class=\"md-accent\" aria-label=\"Cancel\" ng-click=\"cancel()\">\r\n            Cancel\r\n        </md-button>\r\n        <md-button class=\"md-primary\" aria-label=\"Ok\" ng-click=\"close(selected)\">\r\n            Ok\r\n        </md-button>\r\n    </md-dialog-actions>\r\n</md-dialog>");
  $templateCache.put("dialog/friend-requests.html", "<md-dialog style=\"min-width:30%\">\r\n    <md-toolbar>\r\n        <div class=\"md-toolbar-tools\">\r\n            <h2>{{isWaitingResponse?\'Waiting responses\':\'Friend requests\'}}</h2>\r\n            <div flex></div>\r\n            <md-button class=\"md-icon-button\" aria-label=\"Close dialog\" ng-click=\"cancel()\">\r\n                <md-icon md-font-icon=\"fa fa-times fa-15x\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-dialog-content>\r\n        <div class=\"md-dialog-content\" layout=\"column\">\r\n            <div layout=\"row\" layout-align=\"center center\" ng-show=\"contacts.length==0\">\r\n                <h3>You don\'t have any request.</h3>\r\n            </div>\r\n            <md-list>\r\n                <md-list-item md-ink-ripple class=\"md-2-line\" ng-repeat=\"contact in contacts\">\r\n                    <img src=\"../images/avatar-default.png\" data-ng-src=\"{{contact.Avatar}}\" class=\"md-avatar\">\r\n                    <div class=\"md-list-item-text\">\r\n                        <h3><b>{{contact.Name || contact.Username}}</b></h3>\r\n                        <p>\r\n                            {{contact.Username}}\r\n                            <span ng-show=\"contact.Type\"> (Trainer)</span>\r\n                        </p>\r\n                    </div>\r\n                    <div class=\"md-secondary\" layout=\"row\">\r\n                        <md-button ng-if=\"!isWaitingResponse\" class=\"md-fab md-raised md-mini md-primary\" aria-label=\"Accept\" ng-click=\"accept(contact)\">\r\n                            <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                                Accept\r\n                            </md-tooltip>\r\n                            <md-icon md-font-icon=\"fa fa-check fa-15x\"></md-icon>\r\n                        </md-button>\r\n                        <md-button class=\"md-fab md-raised md-mini md-accent\" aria-label=\"Decline\" ng-click=\"decline(contact)\">\r\n                            <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                                {{isWaitingResponse?\'Cancel request\':\'Decline\'}}\r\n                            </md-tooltip>\r\n                            <md-icon md-font-icon=\"fa fa-times fa-15x\"></md-icon>\r\n                        </md-button>\r\n                    </div>\r\n                    <md-divider ng-if=\"!$last\"></md-divider>\r\n                </md-list-item>\r\n            </md-list>\r\n        </div>\r\n    </md-dialog-content>\r\n    <md-dialog-actions layout=\"row\">\r\n        <span flex></span>\r\n        <md-button class=\"md-accent\" aria-label=\"Cancel\" ng-click=\"cancel()\">\r\n            Close\r\n        </md-button>\r\n    </md-dialog-actions>\r\n</md-dialog>");
  $templateCache.put("dialog/share-plan.html", "<md-dialog style=\"min-width:30%\">\r\n    <md-toolbar>\r\n        <div class=\"md-toolbar-tools\">\r\n            <h2>Share plan</h2>\r\n            <div flex></div>\r\n            <md-button class=\"md-icon-button\" aria-label=\"Close dialog\" ng-click=\"cancel()\">\r\n                <md-icon md-font-icon=\"fa fa-times fa-15x\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-dialog-content>\r\n        <div class=\"md-dialog-content\" layout=\"column\">\r\n            <div layout=\"row\" layout-align=\"center center\" ng-show=\"contacts.items.length==0\">\r\n                <h3>You don\'t have any request.</h3>\r\n            </div>\r\n            <md-virtual-repeat-container class=\"virtual-repeat-infinite-scroll vertical-container\">\r\n                <div md-virtual-repeat=\"contact in contacts\" md-on-demand class=\"repeated-item\" flex>\r\n                    <md-checkbox ng-checked=\"exists(contact, selected)\" ng-click=\"toggle(contact, selected)\">\r\n                        {{contact.Name || contact.Username}}\r\n                    </md-checkbox>\r\n                </div>\r\n            </md-virtual-repeat-container>\r\n        </div>\r\n    </md-dialog-content>\r\n    <md-dialog-actions layout=\"row\">\r\n        <span flex></span>\r\n        <md-button class=\"md-accent\" aria-label=\"Cancel\" ng-click=\"cancel()\">\r\n            Close\r\n        </md-button>\r\n        <md-button class=\"md-primary\" aria-label=\"Share\" ng-click=\"share(selected)\">\r\n            Share\r\n        </md-button>\r\n    </md-dialog-actions>\r\n</md-dialog>");
  $templateCache.put("directives/event-model.html", "<input-control model=\"model.Frequency\" disabled=\"type!=\'action\'\"\r\n                name=\"Frequency\" type=\"Int\"></input-control>\r\n<input-control ng-repeat=\"property in schema.Properties\" model=\"eventModel[property.Name]\"\r\n               name=\"{{property.Name}}\" type=\"{{property.Type}}\" ng-if=\"property.Name!=\'Name\'\" required=\"true\"></input-control>");
  $templateCache.put("layout/dashboard.html", "<div layout=\"column\" id=\"dashboard\" ng-controller=\"DashboardCtrl\">\r\n    <section layout=\"row\" flex>\r\n        <ng-include src=\"\'layout/sidenav.html\'\" layout=\"vertical\"></ng-include>\r\n        <div layout=\"column\" flex>\r\n            <!--\r\n               <ng-include src=\"\'layout/toolbar.html\'\"></ng-include>\r\n            -->\r\n            <md-content layout=\"column\" id=\"dashboard-content\" flex>\r\n                <ui-view></ui-view>\r\n            </md-content> \r\n        </div>\r\n    </section>\r\n</div>");
  $templateCache.put("layout/footer.html", "");
  $templateCache.put("layout/header.html", "");
  $templateCache.put("layout/sidenav.html", "<md-sidenav class=\"md-sidenav-left blue darken-3 white-text\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia(\'gt-sm\')\"\r\n            flex layout=\"column\" style=\"min-width:320px\">\r\n    <md-toolbar md-whiteframe=\"2\" class=\"blue darken-4\">\r\n        <span flex></span>\r\n        <div class=\"md-toolbar-tools\">\r\n            <img src=\"../images/logo.png\" width=\"50\" height=\"50\" />\r\n            <h2>\r\n                <b>Powerful Trainer</b>\r\n            </h2>\r\n            <span flex></span>\r\n            <md-icon md-font-icon=\"fa fa-angle-left\" class=\"pointer\" ng-show=\"hideTooltipOnXS\" ng-click=\"toggleNavLeft()\"></md-icon>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-menu-sidenav flex>\r\n        <md-menu-sidenav-item ng-class=\"{\'toggle-active\': (\'cpanel.index\' | includedByState)||(\'cpanel.report\' | includedByState)}\">\r\n            <md-menu-sidenav-title>\r\n                <md-toogle-menu layout=\"row\" flex>\r\n                    <md-icon md-font-icon=\"fa fa-th-large\"></md-icon>\r\n                    <h1 class=\"md-body-2\" flex>Dashboard</h1>\r\n                </md-toogle-menu>\r\n                <md-icon md-font-icon=\"fa fa-caret-down\"></md-icon>\r\n            </md-menu-sidenav-title>\r\n            <md-menu-sidenav-content>\r\n                <md-menu-sidenav-subitem ui-sref=\"cpanel.index\" ui-sref-active=\"active\" ng-click=\"toggleNavLeft()\">Dashboard</md-menu-sidenav-subitem>\r\n                <md-menu-sidenav-subitem ui-sref=\"cpanel.report.health\" ui-sref-active=\"active\" ng-click=\"toggleNavLeft()\">Health summary</md-menu-sidenav-subitem>\r\n                <md-menu-sidenav-subitem ui-sref=\"cpanel.report.workout\" ui-sref-active=\"active\" ng-click=\"toggleNavLeft()\">Workout summary</md-menu-sidenav-subitem>\r\n            </md-menu-sidenav-content>\r\n        </md-menu-sidenav-item>\r\n        <md-menu-sidenav-item ng-class=\"{active: (\'cpanel.plan\' | includedByState)}\" ui-sref=\"cpanel.plan.index\"  ng-click=\"toggleNavLeft()\">\r\n            <md-menu-sidenav-title>\r\n                <md-icon md-font-icon=\"fa fa-leaf\"></md-icon>\r\n                <h1 class=\"md-body-2\" flex>Workout plans</h1>\r\n            </md-menu-sidenav-title>\r\n        </md-menu-sidenav-item>\r\n        <md-menu-sidenav-item ng-class=\"{active: (\'cpanel.contact\' | includedByState)}\" ui-sref=\"cpanel.contact.index\"  ng-click=\"toggleNavLeft()\">\r\n            <md-menu-sidenav-title>\r\n                <md-icon md-font-icon=\"fa fa-users\"></md-icon>\r\n                <h1 class=\"md-body-2\" flex>My contacts</h1>\r\n            </md-menu-sidenav-title>\r\n        </md-menu-sidenav-item>\r\n    </md-menu-sidenav>\r\n\r\n    <md-list>\r\n        <md-divider></md-divider>\r\n        <md-list-item ui-sref=\"!#\"  ng-click=\"toggleNavLeft()\">\r\n            <md-icon md-font-icon=\"fa fa-wrench white-text\" style=\"margin-right:0\"></md-icon>\r\n            <p>Settings</p>\r\n        </md-list-item>\r\n        <md-divider></md-divider>\r\n        <md-list-item class=\"md-2-line md-small-line\" ng-class=\"{active: (\'cpanel.profile\' | includedByState)}\">\r\n            <img src=\"../images/avatar-default.png\" ng-data-src=\"{{User.Avatar}}\" class=\"md-avatar md-circle pointer\" ui-sref=\"cpanel.profile\"/>\r\n            <div class=\"md-list-item-text\">\r\n                <h3 class=\"pointer\" ui-sref=\"cpanel.profile\">{{User.Name || User.Username}}</h3>\r\n                <small><u class=\"pointer\" ng-click=\"logout()\" ng-controller=\"AuthCtrl\">Sign out</u></small>\r\n            </div>\r\n        </md-list-item>\r\n    </md-list>\r\n</md-sidenav>");
  $templateCache.put("layout/toolbar.html", "<md-toolbar class=\"blue darken-3\" md-whiteframe=\"2\" ng-if=\"!useCustomToolbar\">\r\n    <div class=\"md-toolbar-tools\">\r\n        <md-button hide-gt-sm class=\"md-icon-button\" aria-label=\"Left navigation toggle\" ng-click=\"toggleNavLeft()\" ng-controller=\"DashboardCtrl\">\r\n            <md-icon md-font-icon=\"fa fa-bars fa-15x\"></md-icon>\r\n        </md-button>\r\n        <h2>\r\n            <b>{{$header}}</b>\r\n        </h2>\r\n    </div>\r\n</md-toolbar>");
  $templateCache.put("plan/build.html", "<div class=\"toolbar-fixed\" layout=\"column\" layout-align=\"center none\" flex>\r\n    <md-toolbar md-scroll-shrink ng-if=\"true\" md-whiteframe=\"2\" flex>\r\n        <div class=\"md-toolbar-tools\">\r\n            <md-button hide-gt-sm class=\"md-icon-button\" aria-label=\"Left navigation toggle\" ng-click=\"toggleNavLeft()\" ng-controller=\"DashboardCtrl\">\r\n                <md-icon md-font-icon=\"fa fa-bars fa-15x\"></md-icon>\r\n            </md-button>\r\n            <div layout-fill layout-align=\"start center\">\r\n                <div style=\"display:inline-flex\">\r\n                    <span style=\"height:52px\">\r\n                        <image src=\"../images/plan-avatar-default.png\" data-ng-src=\"{{plan.Image}}\" class=\"md-avatar\"\r\n                               width=\"40\" height=\"40\" ng-click=\"showPlanImagePicker()\" style=\"margin:12px 5px 0 0\" />\r\n                        <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                            Click to change\r\n                        </md-tooltip>\r\n                    </span>\r\n                    <input type=\"file\" id=\"planImagePicker\" ng-model=\"planImage\" maxsize=\"1024\"\r\n                           base-sixty-four-input ng-hide=\"true\" accept=\"image/*\" on-after-validate=\"setPlanImage\" />\r\n                    <md-input-container md-no-float class=\"md-icon-right\" md-theme=\"default-yellow-dark\" style=\"padding-left:0\">\r\n                        <input name=\"plan_name\" ng-model=\"plan.Name\" placeholder=\"Plan name\" required minlegth=\"3\" />\r\n                        <md-icon md-font-icon=\"fa fa-pencil\"></md-icon>\r\n                    </md-input-container>\r\n                </div>\r\n            </div>\r\n            <span flex></span>\r\n            <md-button class=\"md-icon-button md-mini\" aria-label=\"Add event\" ng-click=\"addExercise($event)\">\r\n                <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                    Add event\r\n                </md-tooltip>\r\n                <md-icon md-font-icon=\"fa fa-plus fa-15x\"></md-icon>\r\n            </md-button>\r\n            <md-button ng-if=\"false\" md-theme=\"default-dark\" class=\"md-fab md-mini md-primary\" aria-label=\"Save\" ng-disabled=\"plan.Data.length==0 || isSaving\" ng-click=\"save()\">\r\n                <md-tooltip md-theme=\"default\" md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                    Save\r\n                </md-tooltip>\r\n                <md-icon md-font-icon=\"fa fa-floppy-o fa-15x\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-content flex>\r\n        <md-toolbar class=\"md-table-toolbar alternate blue lighten-5 blue-text\" ng-show=\"selected.length\">\r\n            <div class=\"md-toolbar-tools\">\r\n                <span>{{selected.length}} {{selected.length > 1 ? \'items\' : \'item\'}} selected</span>\r\n                <span flex></span>\r\n                <md-button class=\"md-icon-button md-mini md-accent\" aria-label=\"Remove exercises\"\r\n                           ng-click=\"removeEx()\">\r\n                    <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                        Remove exercises\r\n                    </md-tooltip>\r\n                    <md-icon md-font-icon=\"fa fa-trash fa-15x\"></md-icon>\r\n                </md-button>\r\n            </div>\r\n        </md-toolbar>\r\n        <md-table-container style=\"min-height:300px\">\r\n            <table md-table md-row-select multiple ng-model=\"selected\">\r\n                <thead md-head>\r\n                    <tr md-row layou=\"row\">\r\n                        <th md-column><span>EXERCISE</span></th>\r\n                        <th md-column><span>SETS</span></th>\r\n                        <th md-column><span>COMPLETION</span></th>\r\n                        <th md-column><span>REST BETWEEN SETS</span></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody md-body ui-sortable ng-model=\"plan.Data\">\r\n                    <tr md-row md-select=\"ex\" md-auto-select md-select-id=\"ExerciseId\" ng-repeat=\"ex in plan.Data\" ng-mouseenter=\"showEDelBtn=true\" ng-mouseleave=\"showEDelBtn=false\">\r\n                        <td md-cell ng-click=\"showExPreview($event, ex)\">\r\n                            <img src=\"\" ng-src=\"{{ex.Thumbnail}}\" class=\"md-avatar\">\r\n                            {{ex.Name}}\r\n                        </td>\r\n                        <td md-cell ng-click=\"editSets($event, ex)\">\r\n                            <span class=\"dotted\">{{ex.Sets||0}}</span>\r\n                        </td>\r\n                        <td md-cell ng-click=\"editCompletion($event, ex)\">\r\n                            <span class=\"dotted\">{{ex | CompletionFilter}}</span>\r\n                        </td>\r\n                        <td md-cell ng-click=\"editRestTime($event, ex)\">\r\n                            <span class=\"dotted\">{{ex | RestTimeFilter}}</span>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </md-table-container>\r\n        <md-card ng-if=\"false\" class=\"event-model\" ng-mouseenter=\"showEDelBtn=true\" ng-mouseleave=\"showEDelBtn=false\" md-whiteframe=\"2\"\r\n                 ng-repeat=\"ex in plan.Data\">\r\n            <md-card-header>\r\n                <md-card-header-text layout=\"row\">\r\n                    <div ng-click=\"hideCardContent=!hideCardContent\">\r\n                        <md-button class=\"md-icon-button\" ng-show=\"hideCardContent\" aria-label=\"Expend\">\r\n                            <md-icon md-font-icon=\"fa fa-angle-down fa-2x\"></md-icon>\r\n                        </md-button>\r\n                        <md-button class=\"md-icon-button\" ng-hide=\"hideCardContent\" aria-label=\"Collapse\">\r\n                            <md-icon md-font-icon=\"fa fa-angle-up fa-2x\"></md-icon>\r\n                        </md-button>\r\n                    </div>\r\n                    <div flex layout=\"column\">\r\n                        <span class=\"md-title\">{{ex.Name}}</span>\r\n                    </div>\r\n                    <md-button class=\"md-icon-button md-mini md-accent\" aria-label=\"Remove exercise\" ng-show=\"showEDelBtn\"\r\n                               ng-click=\"plan.Data.remove(ex)\">\r\n                        <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                            Remove exercise\r\n                        </md-tooltip>\r\n                        <md-icon md-font-icon=\"fa fa-trash fa-15x\"></md-icon>\r\n                    </md-button>\r\n                </md-card-header-text>\r\n            </md-card-header>\r\n            <md-divider></md-divider>\r\n            <md-card-content ng-hide=\"hideCardContent\">\r\n                \r\n            </md-card-content>\r\n        </md-card>\r\n    </md-content>\r\n    <md-button class=\"md-fab md-primary md-fab-bottom-right\" aria-label=\"Save\" ng-disabled=\"plan.Data.length==0 || isSaving\" ng-click=\"save()\">\r\n        <md-tooltip md-theme=\"default\" md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n            Save\r\n        </md-tooltip>\r\n        <md-icon md-font-icon=\"fa fa-floppy-o fa-2x\"></md-icon>\r\n    </md-button>\r\n</div>");
  $templateCache.put("plan/index.html", "<div class=\"toolbar-fixed\" layout=\"column\" layout-align=\"center none\" flex>\r\n    <md-toolbar md-scroll-shrink ng-if=\"true\" md-whiteframe=\"2\" flex>\r\n        <div class=\"md-toolbar-tools\">\r\n            <md-button hide-gt-sm class=\"md-icon-button\" aria-label=\"Left navigation toggle\" ng-click=\"toggleNavLeft()\" ng-controller=\"DashboardCtrl\">\r\n                <md-icon md-font-icon=\"fa fa-bars fa-15x\"></md-icon>\r\n            </md-button>\r\n            <h3>\r\n                <span>Workout Plans</span>\r\n            </h3>\r\n            <span flex></span>\r\n            <md-button ng-if=\"false\" class=\"md-fab md-mini\" aria-label=\"Add\" ui-sref=\"cpanel.plan.create\">\r\n                <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                    Add workout plan\r\n                </md-tooltip>\r\n                <md-icon md-font-icon=\"fa fa-plus fa-15x\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-content flex>\r\n        <div layout=\"row\" layout-align=\"center center\" ng-show=\"plans.length==0\">\r\n            <h3>Oops...You don\'t have any workout plans.</h3>\r\n        </div>\r\n        <md-list>\r\n            <md-list-item md-ink-ripple class=\"md-3-line plan-list-item\" ng-repeat=\"plan in plans\" ng-click=\"false\"\r\n                          ng-mouseenter=\"showMenuBtn=true\" ng-mouseleave=\"showMenuBtn=false\">\r\n                <img src=\"../images/plan-avatar-default.png\" data-ng-src=\"{{plan.Image}}\" class=\"md-avatar\">\r\n                <div class=\"md-list-item-text\">\r\n                    <h3><b>{{plan.Name}}</b></h3>\r\n                    <h4>{{plan.OwnerName}}</h4>\r\n                    <p>\r\n                        {{plan.UpdateDate | date: \'medium\'}}\r\n                    </p>\r\n                </div>\r\n                <div class=\"md-secondary\" ng-show=\"showMenuBtn\" style=\"min-width:105px\">\r\n                    <md-button class=\"md-fab md-raised md-mini md-primary\" aria-label=\"Edit\" ui-sref=\"cpanel.plan.edit({id: plan.Id})\">\r\n                        <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                            Edit\r\n                        </md-tooltip>\r\n                        <md-icon md-font-icon=\"fa fa-pencil fa-15x\"></md-icon>\r\n                    </md-button>\r\n                    <md-menu>\r\n                        <md-button class=\"md-fab md-raised md-mini md-accent\" aria-label=\"More\" ng-click=\"$mdOpenMenu($event)\">\r\n                            <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                                More\r\n                            </md-tooltip>\r\n                            <md-icon md-font-icon=\"fa fa-chevron-down fa-15x\"></md-icon>\r\n                        </md-button>\r\n                        <md-menu-content width=\"4\">\r\n                            <md-menu-item ng-show=\"inApp\">\r\n                                <md-button ng-click=\"startWorkout(plan)\" aria-label=\"Edit\">\r\n                                    <md-icon md-font-icon=\"fa fa-play fa-15x\"></md-icon>\r\n                                    Start\r\n                                </md-button>\r\n                            </md-menu-item>\r\n                            <md-menu-item>\r\n                                <md-button ui-sref=\"cpanel.plan.edit({id: plan.Id})\" aria-label=\"Edit\">\r\n                                    <md-icon md-font-icon=\"fa fa-pencil fa-15x\"></md-icon>\r\n                                    Edit\r\n                                </md-button>\r\n                            </md-menu-item>\r\n                            <md-menu-item>\r\n                                <md-button ng-click=\"share($event, plan)\" aria-label=\"Share\">\r\n                                    <md-icon md-font-icon=\"fa fa-share fa-15x\"></md-icon>\r\n                                    Share\r\n                                </md-button>\r\n                            </md-menu-item>\r\n                            <md-menu-divider></md-menu-divider>\r\n                            <md-menu-item>\r\n                                <md-button class=\"red-text\" ng-click=\"delete($event, plan)\" aria-label=\"Delete\">\r\n                                    <md-icon md-font-icon=\"fa fa-trash fa-15x\"></md-icon>\r\n                                    Delete\r\n                                </md-button>\r\n                            </md-menu-item>\r\n                        </md-menu-content>\r\n                    </md-menu>\r\n                </div>\r\n                <md-divider ng-if=\"!$last\"></md-divider>\r\n            </md-list-item>\r\n        </md-list>\r\n        <md-table-pagination ng-hide=\"query.total<=query.limit\" md-limit=\"query.limit\" md-limit-options=\"query.limitOptions\" md-page=\"query.page\" md-label=\"{page: \'Page:\', rowsPerPage: \'Per page:\', of: \'of\'}\"\r\n                             md-total=\"{{query.total}}\" md-on-paginate=\"getPlans\" md-page-select></md-table-pagination>\r\n    </md-content>\r\n    <md-button class=\"md-fab md-fab-bottom-right\" aria-label=\"Add\" ui-sref=\"cpanel.plan.create\">\r\n        <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n            Add workout plan\r\n        </md-tooltip>\r\n        <md-icon md-font-icon=\"fa fa-plus fa-2x\"></md-icon>\r\n    </md-button>\r\n</div>");
  $templateCache.put("profile/index.html", "<div class=\"toolbar-fixed\" layout=\"column\" layout-align=\"center center\" layout-fill>\r\n    <md-toolbar class=\"blue darken-3\" md-whiteframe=\"2\">\r\n        <div class=\"md-toolbar-tools\">\r\n            <md-button hide-gt-sm class=\"md-icon-button\" aria-label=\"Left navigation toggle\"\r\n                       ng-click=\"toggleNavLeft()\" ng-controller=\"DashboardCtrl\">\r\n                <md-icon md-font-icon=\"fa fa-bars fa-15x\"></md-icon>\r\n            </md-button>\r\n            <h2>\r\n                <b>{{user.Name||user.Username}}</b>\r\n            </h2>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-content>\r\n        <md-card>\r\n            <md-progress-linear ng-if=\"progressing\" md-mode=\"indeterminate\"></md-progress-linear>\r\n            <md-card-content>\r\n                <form layout=\"column\" layout-gt-sm=\"row\" name=\"profileForm\" ng-submit=\"update(profileForm)\">\r\n                    <div flex layout-padding layout=\"column\">\r\n                        <md-input-container layout-align=\"center center\" layout=\"row\">\r\n                            <img ng-if=\"user.Avatar\" src=\"../images/avatar-default.png\" data-ng-src=\"{{user.Avatar}}\"\r\n                                 class=\"md-avatar md-circle\" width=\"160\" height=\"160\" />\r\n                            <img ng-if=\"!user.Avatar\" src=\"../images/avatar-default.png\" class=\"md-avatar md-circle\" width=\"160\" height=\"160\" />\r\n                        </md-input-container>\r\n                        <md-input-container class=\"md-block\">\r\n                            <md-icon md-font-icon=\"fa fa-picture-o\"></md-icon>\r\n                            <div layout=\"row\" style=\"height:20px\">\r\n                                <md-button class=\"md-primary md-mini md-raised\" ng-click=\"showUserAvatarPicker(profileForm)\"\r\n                                           style=\"margin-top:-4px\" aria-label=\"Choose a avatar image\">Choose</md-button>\r\n                                <md-input-container class=\"md-block\" style=\"margin:0\">\r\n                                    <label>Avatar</label>\r\n                                    <input type=\"text\" ng-model=\"userAvatar.filename\" ng-disabled=\"true\" />\r\n                                    <div ng-messages=\"profileForm.userAvatar.$error\" md-auto-hide=\"false\">\r\n                                        <div ng-message=\"maxsize\">The size maximun is 1025KB</div>\r\n                                        <div ng-message=\"accept\">Not a valid image</div>\r\n                                    </div>\r\n                                    <small ng-show=\"user.Avatar\" class=\"red-text pointer\"\r\n                                           ng-click=\"removeAvatar(profileForm)\"><u>Remove avatar</u></small>\r\n                                </md-input-container>\r\n                            </div>\r\n                            <input id=\"userAvatarPicker\" aria-label=\"Image picker\" name=\"userAvatar\" ng-hide=\"true\" ng-model=\"userAvatar\" type=\"file\"\r\n                                   maxsize=\"1024\" accept=\"image/*\" base-sixty-four-input on-after-validate=\"setUserAvatar\" />\r\n                        </md-input-container>\r\n                        <md-input-container class=\"md-block\">\r\n                            <md-icon md-font-icon=\"fa fa-user-md\"></md-icon>\r\n                            <input name=\"name\" ng-model=\"user.Name\" type=\"text\" placeholder=\"Full name\" maxlength=\"40\" />\r\n                            <div ng-messages=\"profileForm.name.$error\">\r\n                                <div ng-message=\"maxlength\">The name is too long! (max: 40).</div>\r\n                            </div>\r\n                        </md-input-container>\r\n                        <div layout-gt-xs=\"row\">\r\n                            <md-input-container class=\"md-block\">\r\n                                <label>Gender</label>\r\n                                <md-icon md-font-icon=\"fa fa-venus-mars\"></md-icon>\r\n                                <md-select ng-model=\"user.Gender\">\r\n                                    <md-option ng-repeat=\"gender in [\'Male\', \'Female\', \'Other\'] track by $index\" value=\"{{$index}}\">{{gender}}</md-option>\r\n                                </md-select>\r\n                            </md-input-container>\r\n                            <div layout=\"column\">\r\n                                <mdp-date-picker mdp-open-on-click name=\"birthday\" mdp-placeholder=\"Birthday (mm/dd/yyyy)\"\r\n                                                 mdp-format=\"MM/DD/YYYY\" ng-model=\"user.Birthday\"></mdp-date-picker>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div flex layout-padding layout=\"column\">\r\n                        <small><b>Change password</b></small>\r\n                        <md-input-container class=\"md-block\">\r\n                            <md-icon md-font-icon=\"fa fa-user\"></md-icon>\r\n                            <input name=\"username\" ng-model=\"user.Username\" type=\"text\" placeholder=\"Username\" readonly disabled />\r\n                        </md-input-container>\r\n                        <md-input-container class=\"md-block\">\r\n                            <md-icon md-font-icon=\"fa fa-key\"></md-icon>\r\n                            <input name=\"new_password\" ng-model=\"user.new_password\" type=\"password\" placeholder=\"New Password\" minlength=\"8\" maxlength=\"50\" />\r\n                            <small class=\"grey-text\">Leave empty for not change.</small>\r\n                            <div ng-messages=\"profileForm.new_password.$error\">\r\n                                <div ng-message-exp=\"[\'minlength\', \'maxlength\']\">The new password must be between 8 and 50 characters.</div>\r\n                            </div>\r\n                        </md-input-container>\r\n                        <md-input-container class=\"md-block\">\r\n                            <md-icon md-font-icon=\"fa fa-key\"></md-icon>\r\n                            <input name=\"new_password_confirmation\" ng-model=\"user.new_password_confirmation\" type=\"password\" placeholder=\"Confirm new password\" match=\"user.new_password\" />\r\n                            <div ng-messages=\"profileForm.new_password_confirmation.$error\">\r\n                                <div ng-message=\"match\">The new password confirmation do not match.</div>\r\n                            </div>\r\n                        </md-input-container>\r\n                        <small><b>Enter current password <span class=\"red-text\">*</span></b></small>\r\n                        <md-input-container class=\"md-block\">\r\n                            <md-icon md-font-icon=\"fa fa-key\"></md-icon>\r\n                            <input name=\"password\" ng-model=\"user.password\" type=\"password\" placeholder=\"Current Password\" required />\r\n                            <div ng-messages=\"profileForm.password.$error\">\r\n                                <div ng-message-exp=\"[\'required\']\">Please enter current your password.</div>\r\n                            </div>\r\n                        </md-input-container>\r\n                        <div layout=\"row\" layout-align=\"center center\">\r\n                            <md-button type=\"submit\" class=\"md-fab md-primary\" ng-disabled=\"!isValidForm(profileForm) || progressing\"\r\n                                       title=\"Update\" aria-label=\"Update\" ng-click=\"update(profileForm)\">\r\n                                <md-icon md-font-icon=\"fa fa-check fa-15x\"></md-icon>\r\n                            </md-button>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </md-card-content>\r\n        </md-card>\r\n    </md-content>\r\n</div>");
  $templateCache.put("report/health.html", "<div class=\"toolbar-fixed\">\r\n    <md-toolbar class=\"blue darken-3\" md-whiteframe=\"2\" ng-if=\"!useCustomToolbar\">\r\n        <div class=\"md-toolbar-tools\">\r\n            <md-button hide-gt-sm class=\"md-icon-button\" aria-label=\"Left navigation toggle\" ng-click=\"toggleNavLeft()\" ng-controller=\"DashboardCtrl\">\r\n                <md-icon md-font-icon=\"fa fa-bars fa-15x\"></md-icon>\r\n            </md-button>\r\n            <h2>\r\n                <b>Health report</b>\r\n            </h2>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-content>\r\n        <div layout=\"column\" layout-gt-xs=\"row\" layout-align-gt-xs=\"center start\">\r\n            <input-control model=\"sensor\" name=\"sensor-type\" type=\"BandSensorType\"></input-control>\r\n            <md-input-container class=\"md-block\" ng-show=\"sensor\">\r\n                <label>Group</label>\r\n                <md-select ng-model=\"group\" ng-change=\"options.toTime=options.fromTime\">\r\n                    <md-option ng-repeat=\"type in [\'hourly\', \'daily\']\" value=\"{{type}}\">\r\n                        {{type.capitalizeFirstLetter()}}\r\n                    </md-option>\r\n                </md-select>\r\n            </md-input-container>\r\n            <md-input-container class=\"md-block\" ng-show=\"group\">\r\n                <label>Type</label>\r\n                <md-select ng-model=\"options.func\">\r\n                    <md-option ng-repeat=\"t in [\'sum\', \'avg\']\" value=\"{{t}}\" ng-selected=\"$first\">\r\n                        {{t.capitalizeFirstLetter()}}\r\n                    </md-option>\r\n                </md-select>\r\n            </md-input-container>\r\n            <div ng-show=\"group==\'daily\'\" layout-gt-xs=\"row\">\r\n                <mdp-date-picker mdp-open-on-click required name=\"fromDate\" mdp-placeholder=\"From date (dd/mm/yyyy)\"\r\n                                 mdp-format=\"DD/MM/YYYY\" ng-model=\"options.fromTime\" ng-change=\"updateToTime()\"></mdp-date-picker>\r\n                <mdp-date-picker mdp-open-on-click required name=\"toDate\" mdp-placeholder=\"To date (dd/mm/yyyy)\"\r\n                                 mdp-format=\"DD/MM/YYYY\" ng-model=\"options.toTime\" mdp-date-filter=\"filterToTime\"></mdp-date-picker>\r\n            </div>\r\n            <div ng-show=\"group==\'hourly\'\" layout-gt-xs=\"row\">\r\n                <mdp-date-picker mdp-open-on-click required name=\"onDate\" mdp-placeholder=\"Date (dd/mm/yyyy)\"\r\n                                 mdp-format=\"DD/MM/YYYY\" ng-model=\"options.fromTime\" ng-change=\"options.toTime=options.fromTime\"></mdp-date-picker>\r\n                <mdp-time-picker mdp-open-on-click required name=\"fromTime\" mdp-placeholder=\"From time (HH:mm A)\"\r\n                                 mdp-format=\"HH:mm A\" ng-model=\"options.fromTime\" ng-change=\"updateToTime()\"></mdp-time-picker>\r\n                <mdp-time-picker mdp-open-on-click required name=\"toTime\" mdp-placeholder=\"To time (HH:mm A)\"\r\n                                 mdp-format=\"HH:mm A\" ng-model=\"options.toTime\" mdp-date-filter=\"filterToTime\"></mdp-time-picker>\r\n            </div>\r\n        </div>\r\n        <highchart ng-show=\"showChart\" config=\"chartConfig\"></highchart>\r\n    </md-content>\r\n</div>");
  $templateCache.put("report/workout.html", "<div class=\"toolbar-fixed\">\r\n    <md-toolbar class=\"blue darken-3\" md-whiteframe=\"2\" ng-if=\"!useCustomToolbar\">\r\n        <div class=\"md-toolbar-tools\">\r\n            <md-button hide-gt-sm class=\"md-icon-button\" aria-label=\"Left navigation toggle\" ng-click=\"toggleNavLeft()\" ng-controller=\"DashboardCtrl\">\r\n                <md-icon md-font-icon=\"fa fa-bars fa-15x\"></md-icon>\r\n            </md-button>\r\n            <h2>\r\n                <b>Workout report</b>\r\n            </h2>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-content>\r\n\r\n    </md-content>\r\n</div>");
  $templateCache.put("directives/input-control/band-sensor-type.html", "<md-input-container class=\"md-block\" ng-hide=\"hide||disabled\">\r\n    <label>Sensor type</label>\r\n    <md-select ng-model=\"model\">\r\n        <md-option ng-repeat=\"type in sensorTypes\" value=\"{{type}}\" ng-disabled=\"readonly\" ng-selected=\"required&&$first\">\r\n            {{type}}\r\n        </md-option>\r\n    </md-select>\r\n</md-input-container>");
  $templateCache.put("directives/input-control/number.html", "<md-input-container class=\"md-block\" ng-hide=\"hide||disabled\">\r\n    <label>{{name}} ({{type}})</label>\r\n    <input type=\"number\" step=\"any\" ng-model=\"model\" ng-disabled=\"readonly\">\r\n</md-input-container>");
  $templateCache.put("directives/input-control/string.html", "<md-input-container class=\"md-block\" ng-hide=\"hide||disabled\">\r\n    <label>{{name}} ({{type}})</label>\r\n    <input type=\"text\" step=\"any\" ng-model=\"model\" ng-disabled=\"readonly\">\r\n</md-input-container>");
  return $templateCache.put("directives/input-control/text.html", "<md-input-container class=\"md-block\" ng-hide=\"hide||disabled\">\r\n    <label>{{name}} ({{type}})</label>\r\n    <textarea ng-model=\"model\" rows=\"3\" ng-disabled=\"readonly\"></textarea>\r\n</md-input-container>");
}]);
