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

app = angular.module('app', ['ngRoute', 'ngCookies', 'ngStorage', 'ui.router', 'ui.router.title', 'ngAnimate', 'ngMessages', 'ngMaterial', 'mdPickers', 'ngMenuSidenav', 'highcharts-ng', 'hmTouchEvents', 'angularInlineEdit', 'validation.match', 'naif.base64', 'md.data.table', 'templates', 'app.config', 'app.shared', 'app.services', 'app.resources', 'app.directives', 'app.controllers']);

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

angular.module('config.global', []).config(["$locationProvider", "$localStorageProvider", "$sessionStorageProvider", function($locationProvider, $localStorageProvider, $sessionStorageProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $localStorageProvider.setKeyPrefix('powerful_tranier_');
  return $sessionStorageProvider.setKeyPrefix('powerful_tranier_');
}]).run(["$rootScope", "$mdMedia", function($rootScope, $mdMedia) {
  return $rootScope.hideTooltipOnXS = $mdMedia('xs');
}]);

angular.module('config.loadingBar', []).config(function() {
  return Pace.options = {};
});

angular.module("config.notify", []).run(["$rootScope", "$interval", "AppCfg", "Auth", "Contact", "Plan", "mdToast", function($rootScope, $interval, AppCfg, Auth, Contact, Plan, mdToast) {
  var getFriendRequests, getPlanNotify, interval, running, startInterval;
  $rootScope.friendRequests = [];
  $rootScope.planNotify = [];
  interval = void 0;
  running = false;
  $rootScope.$watch(Auth.isAuthenticated, function(value, old) {
    if (value === false) {
      $rootScope.friendRequests = [];
      $rootScope.planNotify = [];
      $interval.cancel(interval);
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
      return $interval(function() {
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
        return "Login";
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
  }).state("cpanel.contact.add", {
    url: "/add",
    templateUrl: "contact/add.html",
    controller: "ContactAddCtrl",
    resolve: {
      $title: function() {
        return "Add contact";
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
    $scope.userAvatar = null;
    form.userAvatar.$setValidity("maxsize", true);
    form.userAvatar.$setValidity("accept", true);
    $('#userAvatarPicker').click();
  };
  $scope.setUserAvatar = function(event, objects, files) {
    return $scope.user.avatar = "data:" + objects[0].filetype + ";base64," + objects[0].base64;
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
  $scope.toggleSearch = false;
  $scope.updateLocationSearch = false;
  $scope.waitingResponses = [];
  Contact.getWaitingResponses().then(function(resp) {
    return $scope.waitingResponses = resp.data.Data;
  });
  $scope.toggleSearchBox = function() {
    return $scope.toggleSearch = !$scope.toggleSearch;
  };
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
  $scope.getContacts();
  $scope.search = function(searchStr) {
    if (searchStr.length) {
      $scope.query.page = 1;
      return Contact.search($scope.searchStr, $scope.query).then(function(resp) {
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
        contact.IsFriend = false;
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
}]).controller("ContactAddCtrl", ["$scope", "AppCfg", "Contact", "mdDialog", "mdToast", function($scope, AppCfg, Contact, mdDialog, mdToast) {
  $scope.showResults = false;
  $scope.query = {
    limit: AppCfg.defaultLimit,
    limitOptions: AppCfg.defaultLimitOptions,
    page: 1,
    total: 0
  };
  $scope.search = function(form) {
    if (form.$valid) {
      return Contact.search($scope.searchStr, $scope.query).then(function(resp) {
        $scope.results = resp.data.Data.Result;
        $scope.query.total = resp.data.Data.Count;
        return $scope.showResults = $scope.searchStr;
      });
    }
  };
  $scope.queryResults = function() {
    return Contact.search($scope.showResults, $scope.query).then(function(resp) {
      $scope.results = resp.data.Data.Result;
      return $scope.query.total = resp.data.Data.Count;
    }, function(resp) {
      return mdToast.showSimple(resp.data.Message, "danger");
    });
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
  return $scope.add = function($event, contact) {
    if (contact.IsWaitingResponse) {
      return mdToast.showSimple("You has already sent a request for this contact.", "danger");
    } else if (contact.IsWaitingAccept) {
      return mdToast.showSimple("The contact has already sent you a request.", "dander");
    } else {
      return mdDialog.showConfirm($event, "Add contact", "Are you sure?", "primary").then(function() {
        return Contact.request(contact.Username).then(function(resp) {
          contact.IsWaitingResponse = true;
          return mdToast.showSimple(resp.data.Message, "success");
        }, function(resp) {
          return mdToast.showSimple(resp.data.Message, "danger");
        });
      });
    }
  };
}]);

angular.module("app.controllers", ["controllers.dashboard", "controllers.plan", "controllers.auth", "controllers.contact", "controllers.report"]);

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
    return Plan.get(plan.ID).then(function(resp) {
      return invokeCSharpAction('plan:' + JSON.stringify(resp.data.Data));
    }, function(resp) {
      return mdToast.showSimple(resp.data.Message, "danger");
    });
  };
  $scope.share = function(evt, plan) {
    $mdMenu.hide();
    return mdDialog.showContactsSelector(evt).then(function(contacts) {
      var contact, i, len, results;
      results = [];
      for (i = 0, len = contacts.length; i < len; i++) {
        contact = contacts[i];
        results.push(Plan.share(plan.ID, contact.Username).then(function(resp) {
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
      return Plan["delete"](plan.ID).then(function(resp) {
        $scope.plans.remove(plan);
        return mdToast.showSimple(resp.data.Message, "success");
      }, function(resp) {
        return mdToast.showSimple(resp.data.Message, "danger");
      });
    });
  };
}]).controller("PlanCreateCtrl", ["$scope", "$stateParams", "$state", "$q", "$timeout", "cookies", "mdDialog", "mdToast", "Plan", "EventModel", function($scope, $stateParams, $state, $q, $timeout, cookies, mdDialog, mdToast, Plan, EventModel) {
  if ($stateParams.id) {
    Plan.get($stateParams.id).then(function(resp) {
      $scope.plan = resp.data.Data;
      return $scope.plan.ID = $stateParams.id;
    }, function(resp) {
      mdToast.showSimple(resp.data.Message, "danger");
      return $state.go('cpanel.plan.index');
    });
  } else {
    $scope.plan = {
      Name: "New Workout Plan",
      PlanData: []
    };
    $timeout(function() {
      return cookies.learnTutorial(cookies.TUTORIAL_CHANGE_PLAN_IMAGE_LEARNED);
    }, 3000);
  }
  $scope.isSaving = false;
  $scope.eventModel = {
    conditions: [],
    actions: []
  };
  EventModel.getConditions().then(function(resp) {
    return $scope.eventModel.conditions = resp.data.Data;
  }, function(resp) {
    return mdToast.showSimple(resp.data.Message, "danger");
  });
  EventModel.getActions().then(function(resp) {
    return $scope.eventModel.actions = resp.data.Data;
  }, function(resp) {
    return mdToast.showSimple(resp.data.Message, "danger");
  });
  $scope.showPlanImagePicker = function() {
    $('#planImagePicker').click();
  };
  $scope.setPlanImage = function(event, objects, files) {
    return $scope.plan.Image = "data:" + objects[0].filetype + ";base64," + objects[0].base64;
  };
  $scope.addCondition = function(evt, bundle) {
    return mdDialog.showEventSelector(evt, "condition", $scope.eventModel.conditions).then(function(model) {
      if (model) {
        return bundle.Conditions.push(model);
      }
    });
  };
  $scope.addAction = function(evt, event) {
    return mdDialog.showEventSelector(evt, "action", $scope.eventModel.actions).then(function(model) {
      if (model) {
        return event.Actions.push(model);
      }
    });
  };
  $scope.validate = function(plan) {
    var event, i, len, ref;
    ref = plan.PlanData;
    for (i = 0, len = ref.length; i < len; i++) {
      event = ref[i];
      if (!event.Actions.length) {
        return false;
      }
    }
    return true;
  };
  return $scope.save = function() {
    if ($scope.validate($scope.plan)) {
      $scope.isSaving = true;
      if ($scope.plan.ID) {
        return Plan.update($scope.plan).then(function(resp) {
          mdToast.showSimple(resp.data.Message, "success");
          $state.go("cpanel.plan.edit", {
            id: $scope.plan.ID
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
            id: resp.data.Data.ID
          });
        }, function(resp) {
          mdToast.showSimple(resp.data.Message, "danger");
          return $scope.isSaving = false;
        });
      }
    } else {
      return mdToast.showSimple("Each event must have at least one action", "danger");
    }
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

angular.module('app.directives', ['directives.classRoute', 'directives.elemReady', 'directives.onLongPress', 'directives.inputControl', 'directives.eventModel', 'directives.appScroll', 'directives.hideKeyboardOnTouchOutside']);

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

angular.module("app.resources", ["resources.plan", "resources.contact", "resources.eventModel", "resources.report"]);

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

angular.module("services.mdDialog", []).factory("mdDialog", ["$mdDialog", function($mdDialog) {
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
              return Math.min(this._items.length + 2, this._query.total);
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

angular.module('shared.helper', []).run([
  '$rootScope', function($rootScope) {
    return $rootScope.$$on = function(events, fn) {
      var e, i, len, ref, results;
      ref = events.split(/[ ,]+/);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        e = ref[i];
        results.push($rootScope.$on(e, fn));
      }
      return results;
    };
  }
]);

angular.module('app.shared', ['shared.helper']);

angular.module("templates", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/login.html", "<div layout=\"row\" layout-align=\"center center\" id=\"login-page\" ng-controller=\"AuthCtrl\">\r\n    <md-card md-whiteframe=\"24\">\r\n        <md-card-header class=\"md-primary\">\r\n            <md-card-avatar>\r\n                <img src=\"../images/logo.png\" />\r\n            </md-card-avatar>\r\n            <md-card-header-text>\r\n                <span class=\"md-headline\">Powerful Trainer</span>\r\n            </md-card-header-text>\r\n            <md-button class=\"md-fab md-mini md-accent\" aria-label=\"Register\" ui-sref=\"register\">\r\n                <md-tooltip md-direction=\"right\" ng-hide=\"hideTooltipOnXS\">\r\n                    Register\r\n                </md-tooltip>\r\n                <md-icon md-font-icon=\"fa fa-plus fa-15x\"></md-icon>\r\n            </md-button>\r\n        </md-card-header>\r\n        <md-progress-linear ng-show=\"progressing\" md-mode=\"indeterminate\"></md-progress-linear>\r\n        <md-card-content layout=\"col\" layout-align=\"center center\">\r\n            <form name=\"loginForm\" ng-submit=\"login(loginForm)\">\r\n                <md-input-container class=\"md-block\">\r\n                    <md-icon md-font-icon=\"fa fa-user\"></md-icon>\r\n                    <input name=\"username\" ng-model=\"user.username\" type=\"text\" placeholder=\"Username\" required />\r\n                </md-input-container>\r\n                <md-input-container class=\"md-block\">\r\n                    <md-icon md-font-icon=\"fa fa-key\"></md-icon>\r\n                    <input name=\"password\" ng-model=\"user.password\" type=\"password\" placeholder=\"Password\" required />\r\n                </md-input-container>\r\n                <div layout=\"row\" layout-align=\"center center\">\r\n                    <md-button type=\"submit\" class=\"md-fab md-primary\" ng-disabled=\"!isValidForm(loginForm) || progressing\" title=\"Login\" aria-label=\"Login\" ng-click=\"login(loginForm)\">\r\n                        <md-icon md-font-icon=\"fa fa-arrow-right fa-15x\"></md-icon>\r\n                    </md-button>\r\n                </div>\r\n            </form>\r\n        </md-card-content>\r\n    </md-card>\r\n</div>");
  $templateCache.put("auth/register.html", "<div layout=\"column\" layout-align=\"center center\" layout-fill id=\"register-page\" ng-controller=\"AuthCtrl\">\r\n    <md-card md-whiteframe=\"24\">\r\n        <md-card-header>\r\n            <md-button title=\"Login\" aria-label=\"Login\" class=\"md-icon-button\" ui-sref=\"login\">\r\n                <md-icon md-font-icon=\"fa fa-arrow-left fa-inverse fa-15x\"></md-icon>\r\n            </md-button>\r\n            <md-card-avatar>\r\n                <img src=\"../images/logo.png\" />\r\n            </md-card-avatar>\r\n            <md-card-header-text>\r\n                <span class=\"md-headline\">Powerful Trainer</span>\r\n            </md-card-header-text>\r\n        </md-card-header>\r\n        <md-progress-linear ng-show=\"progressing\" md-mode=\"indeterminate\"></md-progress-linear>\r\n        <md-card-content style=\"min-width:312px\">\r\n            <form layout=\"column\" layout-gt-sm=\"row\" name=\"registerForm\" ng-submit=\"register(reigsterForm)\">\r\n                <div flex layout-padding layout=\"column\">\r\n                    <md-input-container layout-align=\"center center\" layout=\"row\">\r\n                        <img src=\"../images/avatar-default.png\" data-ng-src=\"data:{{userAvatar.filetype}};base64,{{userAvatar.base64}}\"\r\n                             class=\"md-avatar\" width=\"160\" height=\"160\"/>\r\n                    </md-input-container>\r\n                    <md-input-container class=\"md-block\">\r\n                        <md-icon md-font-icon=\"fa fa-picture-o\"></md-icon>\r\n                        <div layout=\"row\" style=\"height:20px\">\r\n                            <md-button class=\"md-primary md-mini md-raised\" ng-click=\"showUserAvatarPicker(registerForm)\"\r\n                                       style=\"margin-top:-4px\" aria-label=\"Choose a avatar image\">Choose</md-button>\r\n                            <md-input-container class=\"md-block\" style=\"margin:0\">\r\n                                <label>Avatar</label>\r\n                                <input type=\"text\" ng-model=\"userAvatar.filename\" ng-disabled=\"true\" />\r\n                                <div ng-messages=\"registerForm.userAvatar.$error\" md-auto-hide=\"false\">\r\n                                    <div ng-message=\"maxsize\">The size maximun is 1025KB</div>\r\n                                    <div ng-message=\"accept\">Not a valid image</div>\r\n                                </div>\r\n                            </md-input-container>\r\n                        </div>\r\n                        <input id=\"userAvatarPicker\" aria-label=\"Image picker\" name=\"userAvatar\" ng-hide=\"true\" ng-model=\"userAvatar\" type=\"file\"\r\n                               maxsize=\"1024\" accept=\"image/*\" base-sixty-four-input on-after-validate=\"setUserAvatar\" />\r\n                    </md-input-container>\r\n                    <md-input-container class=\"md-block\">\r\n                        <md-icon md-font-icon=\"fa fa-user-md\"></md-icon>\r\n                        <input name=\"name\" ng-model=\"user.name\" type=\"text\" placeholder=\"Full name\" maxlength=\"15\" />\r\n                        <div ng-messages=\"registerForm.name.$error\">\r\n                            <div ng-message=\"maxlength\">The name is too long! (max: 15).</div>\r\n                        </div>\r\n                    </md-input-container>\r\n                    <div layout-gt-xs=\"row\">\r\n                        <md-input-container class=\"md-block\" style=\"margin-top: 0\">\r\n                            <label>Gender</label>\r\n                            <md-icon md-font-icon=\"fa fa-venus-mars\"></md-icon>\r\n                            <md-select ng-model=\"user.gender\">\r\n                                <md-option ng-repeat=\"gender in [\'Male\', \'Female\', \'Other\'] track by $index\" value=\"{{$index}}\">{{gender}}</md-option>\r\n                            </md-select>\r\n                        </md-input-container>\r\n                        <div flex></div>\r\n                        <div layout=\"column\">\r\n                            <md-datepicker ng-model=\"user.birthday\" md-placeholder=\"Birthday\"></md-datepicker>\r\n                            <div class=\"input-advanced hint\" style=\"position: inherit;margin-left: 35px;\">mm/dd/yyyy</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div flex layout-padding layout=\"column\">\r\n                    <md-input-container class=\"md-block\">\r\n                        <md-icon md-font-icon=\"fa fa-user\"></md-icon>\r\n                        <input name=\"username\" ng-model=\"user.username\" type=\"text\" placeholder=\"Username\" required minlength=\"3\" maxlength=\"10\" />\r\n                        <div ng-messages=\"registerForm.username.$error\">\r\n                            <div ng-message-exp=\"[\'required\', \'minlength\', \'maxlength\']\">The username must be between 3 and 10 characters.</div>\r\n                        </div>\r\n                    </md-input-container>\r\n                    <md-input-container class=\"md-block\">\r\n                        <md-icon md-font-icon=\"fa fa-key\"></md-icon>\r\n                        <input name=\"password\" ng-model=\"user.password\" type=\"password\" placeholder=\"Password\" required minlength=\"8\" maxlength=\"50\" />\r\n                        <div ng-messages=\"registerForm.password.$error\">\r\n                            <div ng-message-exp=\"[\'required\', \'minlength\', \'maxlength\']\">The password must be between 8 and 50 characters.</div>\r\n                        </div>\r\n                    </md-input-container>\r\n                    <md-input-container class=\"md-block\">\r\n                        <md-icon md-font-icon=\"fa fa-key\"></md-icon>\r\n                        <input name=\"password_confirmation\" ng-model=\"user.password_confirmation\" type=\"password\" placeholder=\"Confirm password\" required match=\"user.password\" />\r\n                        <div ng-messages=\"registerForm.password_confirmation.$error\">\r\n                            <div ng-message=\"match\">The password confirmation do not match.</div>\r\n                        </div>\r\n                    </md-input-container>\r\n                    <md-input-container class=\"md-block\">\r\n                        <md-checkbox ng-model=\"user.type\">\r\n                            Become a trainer.\r\n                        </md-checkbox>\r\n                    </md-input-container>\r\n                    <md-input-container class=\"md-block\">\r\n                        <md-checkbox ng-model=\"user.checkbox\">\r\n                            Agree to our Terms and Data Policy.\r\n                        </md-checkbox>\r\n                    </md-input-container>\r\n                    <div layout=\"row\" layout-align=\"center center\">\r\n                        <md-button type=\"submit\" class=\"md-fab md-primary\" ng-disabled=\"!user.checkbox || !isValidForm(registerForm) || progressing\" title=\"Register\" aria-label=\"Register\" ng-click=\"register(registerForm)\">\r\n                            <md-icon md-font-icon=\"fa fa-check fa-15x\"></md-icon>\r\n                        </md-button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </md-card-content>\r\n    </md-card>\r\n</div>");
  $templateCache.put("contact/add.html", "<div layout=\"column\">\r\n    <form name=\"searchForm\" layout-fill ng-submit=\"search(searchForm)\">\r\n        <div layout=\"row\" layout-align=\"center center\" style=\"margin-bottom:-32px\">\r\n            <md-input-container class=\"md-block\" flex flex-gt-xs=\"60\">\r\n                <label>Search...</label>\r\n                <input ng-model=\"searchStr\" ng-change=\"search(searchForm)\" required minlength=\"1\" md-autofocus=\"autofocus\"/>\r\n            </md-input-container>\r\n        </div>\r\n        <div layout=\"row\" layout-align=\"center center\" ng-hide=\"true\">\r\n            <md-button type=\"submit\" class=\"md-fab\" aria-label=\"Search\" ng-disabled=\"!searchForm.$valid\">\r\n                <md-tooltip md-direction=\"right\" ng-hide=\"hideTooltipOnXS\">\r\n                    Search\r\n                </md-tooltip>\r\n                <md-icon md-font-icon=\"fa fa-search fa-15x\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n    </form>\r\n    <md-card class=\"white\" ng-show=\"showResults && searchStr.length\">\r\n        <md-card-content>\r\n            <div layout=\"row\" layout-align=\"center center\" ng-show=\"results.length==0\">\r\n                <h3>Oops...Cannot find any contact with key \"{{showResults}}\".</h3>\r\n            </div>\r\n            <md-list ng-hide=\"results && results.length==0\">\r\n                <md-subheader class=\"md-no-sticky\">Results for \"{{showResults}}\"</md-subheader>\r\n                <md-list-item md-ink-ripple class=\"md-2-line\" ng-repeat=\"contact in results\">\r\n                    <img src=\"../images/avatar-default.png\" data-ng-src=\"{{contact.Avatar}}\" class=\"md-avatar\">\r\n                    <div class=\"md-list-item-text\">\r\n                        <h3><b>{{contact.Name || contact.Username}}</b></h3>\r\n                        <p>\r\n                            {{contact.Username}}\r\n                            <span ng-show=\"contact.Type\"> (Trainer)</span>\r\n                        </p>\r\n                    </div>\r\n                    <div class=\"md-secondary\" layout=\"row\">\r\n                        <md-chips>\r\n                            <md-chip ng-show=\"contact.IsWaitingResponse\">Request sent</md-chip>\r\n                            <md-chip class=\"pointer\" ng-show=\"contact.IsWaitingAccept\" ng-click=\"accept(contact)\">\r\n                                <i class=\"fa fa-check\"></i>\r\n                                Accept\r\n                            </md-chip>\r\n                            <md-chip class=\"pointer\" ng-show=\"contact.IsWaitingAccept\" ng-click=\"decline(contact)\">\r\n                                <i class=\"fa fa-trash\"></i>\r\n                                Decline\r\n                            </md-chip>\r\n                            <md-chip ng-show=\"contact.IsFriend\">Friend</md-chip>\r\n                            <md-chip class=\"pointer\" ng-show=\"!contact.IsWaitingResponse&&!contact.IsWaitingAccept&&!contact.IsFriend\"\r\n                                     ng-click=\"add($event, contact)\">\r\n                                <i class=\"fa fa-plus\"></i>\r\n                                Add\r\n                            </md-chip>\r\n                        </md-chips>\r\n                    </div>\r\n                    <md-divider ng-if=\"!$last\"></md-divider>\r\n                </md-list-item>\r\n            </md-list>\r\n            <md-table-pagination ng-hide=\"query.total<=query.limit\" md-limit=\"query.limit\" md-limit-options=\"query.limitOptions\" md-page=\"query.page\" md-label=\"{page: \'Page:\', rowsPerPage: \'Per page:\', of: \'of\'}\"\r\n                                 md-total=\"{{query.total}}\" md-on-paginate=\"queryResults\" md-page-select></md-table-pagination>\r\n        </md-card-content>\r\n    </md-card>\r\n</div>");
  $templateCache.put("contact/index.html", "<div layout=\"column\" layout-align=\"center none\" flex>\r\n    <md-toolbar md-scroll-shrink ng-if=\"true\" md-whiteframe=\"2\" flex>\r\n        <div class=\"md-toolbar-tools\">\r\n            <h3>Contacts ({{contacts.length || 0}})</h3>\r\n            <md-button class=\"md-icon-button\" aria-label=\"Search\" ng-click=\"toggleSearchBox()\" ng-class=\"{\'md-accent\': toggleSearch}\">\r\n                <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                    Search\r\n                </md-tooltip>\r\n                <md-icon md-font-icon=\"fa fa-search fa-15x\"></md-icon>\r\n            </md-button>\r\n            <span flex></span>\r\n            <md-chips style=\"display:inline-table\">\r\n                <md-chip ng-click=\"showWaiting($event, waitingResponses)\" class=\"pointer grey\" ng-class=\"{\'lighten-5\': waitingResponses.length}\">\r\n                    <i class=\"fa fa-signing\"></i>\r\n                    {{waitingResponses.length}}\r\n                    <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS&&waitingResponses.length\">\r\n                        <span ng-hide=\"waitingResponses.length\">You don\'t have any waiting response</span>\r\n                        <span ng-show=\"waitingResponses.length\">You have {{waitingResponses.length}} waiting response{{waitingResponses.length==1?\'\':\'s\'}}</span>\r\n                    </md-tooltip>\r\n                </md-chip>\r\n                <md-chip ng-click=\"showRequests($event, requests)\" class=\"pointer grey\" ng-class=\"{\'lighten-5\': requests.length}\">\r\n                    <i class=\"fa fa-user-plus\"></i>\r\n                    {{requests.length}}\r\n                    <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS&&requests.length\">\r\n                        <span ng-hide=\"requests.length\">You don\'t have any request</span>\r\n                        <span ng-show=\"requests.length\">You have {{requests.length}} new request{{requests.length==1?\'\':\'s\'}}</span>\r\n                    </md-tooltip>\r\n                </md-chip>\r\n            </md-chips>\r\n            <md-button ng-if=\"false\" class=\"md-fab md-mini\" aria-label=\"Add\" ui-sref=\"cpanel.contact.add\">\r\n                <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                    Add contact\r\n                </md-tooltip>\r\n                <md-icon md-font-icon=\"fa fa-plus fa-15x\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-content flex>\r\n        <form name=\"searchForm\" class=\"grey lighten-3 animate-search\" layout-fill ng-submit=\"search(searchForm)\" ng-show=\"toggleSearch\">\r\n            <div layout=\"row\" layout-align=\"center center\" style=\"margin-bottom:-32px\">\r\n                <md-input-container class=\"md-block\" flex flex-gt-xs=\"60\">\r\n                    <label>Search...</label>\r\n                    <input ng-model=\"searchStr\" ng-change=\"search(searchStr)\" md-autofocus=\"autofocus\" />\r\n                </md-input-container>\r\n            </div>\r\n            <div layout=\"row\" layout-align=\"center center\" ng-if=\"false\">\r\n                <md-button type=\"submit\" class=\"md-fab\" aria-label=\"Search\" ng-disabled=\"!searchForm.$valid\">\r\n                    <md-tooltip md-direction=\"right\" ng-hide=\"hideTooltipOnXS\">\r\n                        Search\r\n                    </md-tooltip>\r\n                    <md-icon md-font-icon=\"fa fa-search fa-15x\"></md-icon>\r\n                </md-button>\r\n            </div>\r\n        </form>\r\n        <div layout=\"row\" layout-align=\"center center\" ng-show=\"contacts.length==0\">\r\n            <h3>Oops...You don\'t have any contacts.</h3>\r\n        </div>\r\n        <md-list ng-hide=\"searchStr.length\">\r\n            <md-list-item md-ink-ripple class=\"md-2-line\" ng-repeat=\"contact in contacts\" ng-click=\"false\"\r\n                          ng-mouseenter=\"showMenuBtn=true\" ng-mouseleave=\"showMenuBtn=false\">\r\n                <img src=\"../images/avatar-default.png\" data-ng-src=\"{{contact.Avatar}}\" class=\"md-avatar\">\r\n                <div class=\"md-list-item-text\">\r\n                    <h3><b>{{contact.Name || contact.Username}}</b></h3>\r\n                    <p>\r\n                        {{contact.Username}}\r\n                        <span ng-show=\"contact.Type\"> (Trainer)</span>\r\n                    </p>\r\n                </div>\r\n                <div class=\"md-secondary\" ng-show=\"showMenuBtn\">\r\n                    <md-button class=\"md-fab md-raised md-mini md-accent\" aria-label=\"Unfriend\" ng-click=\"delete($event, contact)\">\r\n                        <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                            Unfriend\r\n                        </md-tooltip>\r\n                        <md-icon md-font-icon=\"fa fa-trash fa-15x\"></md-icon>\r\n                    </md-button>\r\n                </div>\r\n                <md-divider ng-if=\"!$last\"></md-divider>\r\n            </md-list-item>\r\n        </md-list>\r\n        <md-list ng-show=\"searchStr.length\">\r\n            <md-subheader class=\"md-no-sticky\">Search for \"{{showResults}}\": {{query.total}} result{{query.total<=1?\'\':\'s\'}}</md-subheader>\r\n            <md-list-item md-ink-ripple class=\"md-2-line\" ng-repeat=\"contact in contacts\">\r\n                <img src=\"../images/avatar-default.png\" data-ng-src=\"{{contact.Avatar}}\" class=\"md-avatar\">\r\n                <div class=\"md-list-item-text\">\r\n                    <h3>\r\n                        <b>{{contact.Name || contact.Username}}</b>\r\n                        <small ng-show=\"contact.IsWaitingResponse\">\r\n                            you have sent add friend request\r\n                        </small>\r\n                        <small ng-show=\"contact.IsWaitingAccept\">\r\n                            ask you to be friend\r\n                        </small>\r\n                    </h3>\r\n                    <p>\r\n                        {{contact.Username}}\r\n                        <span ng-show=\"contact.Type\"> (Trainer)</span>\r\n                    </p>\r\n                </div>\r\n                <div class=\"md-secondary\" layout=\"row\">\r\n                    <md-chips>\r\n                        <md-chip class=\"pointer\" ng-show=\"contact.IsWaitingResponse\" ng-click=\"cancel($event, contact)\">\r\n                            Cancel request\r\n                        </md-chip>\r\n                        <md-chip class=\"pointer\" ng-show=\"contact.IsWaitingAccept\" ng-click=\"accept(contact)\">\r\n                            Accept\r\n                        </md-chip>\r\n                        <md-chip class=\"pointer\" ng-show=\"contact.IsWaitingAccept\" ng-click=\"decline(contact)\">\r\n                            Decline\r\n                        </md-chip>\r\n                        <md-chip class=\"pointer\" ng-show=\"contact.IsFriend\" ng-click=\"delete($event, contact)\">\r\n                            Unfriend\r\n                        </md-chip>\r\n                        <md-chip class=\"pointer teal white-text\" ng-show=\"!contact.IsWaitingResponse&&!contact.IsWaitingAccept&&!contact.IsFriend\"\r\n                                 ng-click=\"add($event, contact)\">\r\n                            Add friend\r\n                        </md-chip>\r\n                    </md-chips>\r\n                </div>\r\n                <md-divider ng-if=\"!$last\"></md-divider>\r\n            </md-list-item>\r\n        </md-list>\r\n        <md-table-pagination ng-hide=\"query.total<=query.limit\" md-limit=\"query.limit\" md-limit-options=\"query.limitOptions\" md-page=\"query.page\" md-label=\"{page: \'Page:\', rowsPerPage: \'Per page:\', of: \'of\'}\"\r\n                             md-total=\"{{query.total}}\" md-on-paginate=\"queryResults\" md-page-select></md-table-pagination>\r\n    </md-content>\r\n</div>");
  $templateCache.put("dashboard/index.html", "<h1>Dashboard</h1>");
  $templateCache.put("dialog/confirm.html", "<md-dialog>\r\n    <md-toolbar class=\"md-{{type}}\">\r\n        <div class=\"md-toolbar-tools\">\r\n            <h2>{{title}}</h2>\r\n            <span flex></span>\r\n            <md-button class=\"md-icon-button\" aria-label=\"{{title}}\" ng-click=\"cancel()\">\r\n                <md-icon md-font-icon=\"fa fa-times fa-15x\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-dialog-content>\r\n        <div class=\"md-dialog-content\" layout=\"column\" layout-align=\"center center\">\r\n            {{content}}\r\n        </div>\r\n    </md-dialog-content>\r\n    <md-dialog-actions layout=\"row\">\r\n        <span flex></span>\r\n        <md-button  md-autofocus class=\"md-accent\" aria-label=\"Cancel\" ng-click=\"cancel()\">\r\n            Cancel\r\n        </md-button>\r\n        <md-button class=\"md-primary\" aria-label=\"Ok\" ng-click=\"close()\">\r\n            Confirm\r\n        </md-button>\r\n    </md-dialog-actions>\r\n</md-dialog>");
  $templateCache.put("dialog/event-model.html", "<md-dialog>\r\n    <md-toolbar>\r\n        <div class=\"md-toolbar-tools\">\r\n            <h2>{{title}}</h2>\r\n            <span flex></span>\r\n            <md-button class=\"md-icon-button\" aria-label=\"Close dialog\" ng-click=\"cancel()\">\r\n                <md-icon md-font-icon=\"fa fa-times fa-15x\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-dialog-content>\r\n        <div class=\"md-dialog-content\" layout=\"column\">\r\n            <md-input-container>\r\n                <label>{{type.capitalizeFirstLetter()}}</label>\r\n                <md-select ng-model=\"currentModelIdx\">\r\n                    <md-option ng-repeat=\"schema in schemas track by $index\" value=\"{{$index}}\">\r\n                        {{schema.Name}}\r\n                    </md-option>\r\n                </md-select>\r\n            </md-input-container>\r\n            <div ng-show=\"currentModelIdx != -1\">\r\n                <event-model type=\"{{type}}\" model=\"model\" schema=\"schemas[currentModelIdx]\"></event-model>\r\n            </div>\r\n        </div>\r\n    </md-dialog-content>\r\n    <md-dialog-actions layout=\"row\">\r\n        <span flex></span>\r\n        <md-button class=\"md-accent\" aria-label=\"Cancel\" ng-click=\"cancel()\">\r\n            Cancel\r\n        </md-button>\r\n        <md-button class=\"md-primary\" aria-label=\"Ok\" ng-click=\"close()\">\r\n            Ok\r\n        </md-button>\r\n    </md-dialog-actions>\r\n</md-dialog>");
  $templateCache.put("dialog/friend-requests.html", "<md-dialog style=\"min-width:30%\">\r\n    <md-toolbar>\r\n        <div class=\"md-toolbar-tools\">\r\n            <h2>{{isWaitingResponse?\'Waiting responses\':\'Friend requests\'}}</h2>\r\n            <div flex></div>\r\n            <md-button class=\"md-icon-button\" aria-label=\"Close dialog\" ng-click=\"cancel()\">\r\n                <md-icon md-font-icon=\"fa fa-times fa-15x\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-dialog-content>\r\n        <div class=\"md-dialog-content\" layout=\"column\">\r\n            <div layout=\"row\" layout-align=\"center center\" ng-show=\"contacts.length==0\">\r\n                <h3>You don\'t have any request.</h3>\r\n            </div>\r\n            <md-list>\r\n                <md-list-item md-ink-ripple class=\"md-2-line\" ng-repeat=\"contact in contacts\">\r\n                    <img src=\"../images/avatar-default.png\" data-ng-src=\"{{contact.Avatar}}\" class=\"md-avatar\">\r\n                    <div class=\"md-list-item-text\">\r\n                        <h3><b>{{contact.Name || contact.Username}}</b></h3>\r\n                        <p>\r\n                            {{contact.Username}}\r\n                            <span ng-show=\"contact.Type\"> (Trainer)</span>\r\n                        </p>\r\n                    </div>\r\n                    <div class=\"md-secondary\" layout=\"row\">\r\n                        <md-button ng-if=\"!isWaitingResponse\" class=\"md-fab md-raised md-mini md-primary\" aria-label=\"Accept\" ng-click=\"accept(contact)\">\r\n                            <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                                Accept\r\n                            </md-tooltip>\r\n                            <md-icon md-font-icon=\"fa fa-check fa-15x\"></md-icon>\r\n                        </md-button>\r\n                        <md-button class=\"md-fab md-raised md-mini md-accent\" aria-label=\"Decline\" ng-click=\"decline(contact)\">\r\n                            <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                                {{isWaitingResponse?\'Cancel request\':\'Decline\'}}\r\n                            </md-tooltip>\r\n                            <md-icon md-font-icon=\"fa fa-times fa-15x\"></md-icon>\r\n                        </md-button>\r\n                    </div>\r\n                    <md-divider ng-if=\"!$last\"></md-divider>\r\n                </md-list-item>\r\n            </md-list>\r\n        </div>\r\n    </md-dialog-content>\r\n    <md-dialog-actions layout=\"row\">\r\n        <span flex></span>\r\n        <md-button class=\"md-accent\" aria-label=\"Cancel\" ng-click=\"cancel()\">\r\n            Close\r\n        </md-button>\r\n    </md-dialog-actions>\r\n</md-dialog>");
  $templateCache.put("dialog/share-plan.html", "<md-dialog style=\"min-width:30%\">\r\n    <md-toolbar>\r\n        <div class=\"md-toolbar-tools\">\r\n            <h2>Share plan</h2>\r\n            <div flex></div>\r\n            <md-button class=\"md-icon-button\" aria-label=\"Close dialog\" ng-click=\"cancel()\">\r\n                <md-icon md-font-icon=\"fa fa-times fa-15x\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-dialog-content>\r\n        <div class=\"md-dialog-content\" layout=\"column\">\r\n            <div layout=\"row\" layout-align=\"center center\" ng-show=\"contacts.items.length==0\">\r\n                <h3>You don\'t have any request.</h3>\r\n            </div>\r\n            <md-virtual-repeat-container class=\"virtual-repeat-infinite-scroll vertical-container\">\r\n                <div md-virtual-repeat=\"contact in contacts\" md-on-demand class=\"repeated-item\" flex>\r\n                    <md-checkbox ng-checked=\"exists(contact, selected)\" ng-click=\"toggle(contact, selected)\">\r\n                        {{contact.Name || contact.Username}}\r\n                    </md-checkbox>\r\n                </div>\r\n            </md-virtual-repeat-container>\r\n        </div>\r\n    </md-dialog-content>\r\n    <md-dialog-actions layout=\"row\">\r\n        <span flex></span>\r\n        <md-button class=\"md-accent\" aria-label=\"Cancel\" ng-click=\"cancel()\">\r\n            Close\r\n        </md-button>\r\n        <md-button class=\"md-primary\" aria-label=\"Share\" ng-click=\"share(selected)\">\r\n            Share\r\n        </md-button>\r\n    </md-dialog-actions>\r\n</md-dialog>");
  $templateCache.put("directives/event-model.html", "<input-control model=\"model.Frequency\" disabled=\"type!=\'action\'\"\r\n                name=\"Frequency\" type=\"Int\"></input-control>\r\n<input-control ng-repeat=\"property in schema.Properties\" model=\"eventModel[property.Name]\"\r\n               name=\"{{property.Name}}\" type=\"{{property.Type}}\" ng-if=\"property.Name!=\'Name\'\" required=\"true\"></input-control>");
  $templateCache.put("layout/dashboard.html", "<div layout=\"column\" id=\"dashboard\" ng-controller=\"DashboardCtrl\">\r\n    <section layout=\"column\" flex>\r\n        <ng-include src=\"\'layout/toolbar.html\'\"></ng-include>\r\n        <div layout=\"row\" flex>\r\n            <ng-include src=\"\'layout/sidenav.html\'\" layout=\"vertical\"></ng-include>\r\n            <md-content layout-padding layout=\"column\" flex>\r\n                <ui-view></ui-view>\r\n            </md-content>\r\n        </div>\r\n    </section>\r\n</div>");
  $templateCache.put("layout/footer.html", "");
  $templateCache.put("layout/header.html", "");
  $templateCache.put("layout/sidenav.html", "<md-sidenav class=\"md-sidenav-left\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia(\'gt-sm\')\" flex layout=\"column\">\r\n    <md-menu-sidenav flex>\r\n        <md-menu-sidenav-item ng-class=\"{\'toggle-active\': (\'cpanel.index\' | includedByState)||(\'cpanel.report\' | includedByState)}\">\r\n            <md-menu-sidenav-title>\r\n                <md-toogle-menu layout=\"row\" flex>\r\n                    <h1 class=\"md-body-2\" flex>Dashboard</h1>\r\n                </md-toogle-menu>\r\n                <md-icon md-font-icon=\"fa fa-caret-down\"></md-icon>\r\n            </md-menu-sidenav-title>\r\n            <md-menu-sidenav-content>\r\n                <md-menu-sidenav-subitem ui-sref=\"cpanel.index\" ui-sref-active=\"active\">Dashboard</md-menu-sidenav-subitem>\r\n                <md-menu-sidenav-subitem ui-sref=\"cpanel.report.health\" ui-sref-active=\"active\">Health summary</md-menu-sidenav-subitem>\r\n                <md-menu-sidenav-subitem ui-sref=\"cpanel.report.workout\" ui-sref-active=\"active\">Workout summary</md-menu-sidenav-subitem>\r\n            </md-menu-sidenav-content>\r\n        </md-menu-sidenav-item>\r\n        <md-menu-sidenav-item ng-class=\"{active: (\'cpanel.plan\' | includedByState)}\" ui-sref=\"cpanel.plan.index\"  ng-click=\"toggleNavLeft()\">\r\n            <md-menu-sidenav-title>\r\n                <h1 class=\"md-body-2\" flex>Workout plans</h1>\r\n            </md-menu-sidenav-title>\r\n        </md-menu-sidenav-item>\r\n        <md-menu-sidenav-item ng-class=\"{active: (\'cpanel.contact\' | includedByState)}\" ui-sref=\"cpanel.contact.index\"  ng-click=\"toggleNavLeft()\">\r\n            <md-menu-sidenav-title>\r\n                <h1 class=\"md-body-2\" flex>My contacts</h1>\r\n            </md-menu-sidenav-title>\r\n        </md-menu-sidenav-item>\r\n    </md-menu-sidenav>\r\n\r\n    <md-list>\r\n        <md-divider></md-divider>\r\n        <md-list-item ui-sref=\"!#\"  ng-click=\"toggleNavLeft()\">\r\n            <p>Settings</p>\r\n        </md-list-item>\r\n        <md-divider></md-divider>\r\n        <md-list-item class=\"md-2-line md-small-line\">\r\n            <img src=\"../images/avatar-default.png\" class=\"md-avatar\" alt=\"John Jean\" />\r\n            <div class=\"md-list-item-text\">\r\n                <h3>{{User.Name || User.Username}}</h3>\r\n                <small><a href=\"!#\" ng-click=\"logout()\" ng-controller=\"AuthCtrl\">Sign out</a></small>\r\n            </div>\r\n        </md-list-item>\r\n    </md-list>\r\n</md-sidenav>");
  $templateCache.put("layout/toolbar.html", "<md-toolbar>\r\n    <div class=\"md-toolbar-tools\">\r\n        <md-button hide-gt-sm class=\"md-icon-button\" aria-label=\"Left navigation toggle\" ng-click=\"toggleNavLeft()\">\r\n            <md-icon md-font-icon=\"fa fa-bars fa-15x\"></md-icon>\r\n        </md-button>\r\n        <img src=\"../images/logo.png\" width=\"50\" height=\"50\" />\r\n        <h2>\r\n            <b>Powerful Trainer</b>\r\n        </h2>\r\n    </div>\r\n</md-toolbar>");
  $templateCache.put("plan/build.html", "<div layout=\"column\" layout-align=\"center none\" flex>\r\n    <md-toolbar md-scroll-shrink ng-if=\"true\" md-whiteframe=\"2\" flex>\r\n        <div class=\"md-toolbar-tools\">\r\n            <div layout-fill layout-align=\"start center\">\r\n                <div style=\"display:inline-flex\">\r\n                    <span style=\"height:52px\">\r\n                        <image src=\"../images/plan-avatar-default.png\" data-ng-src=\"{{plan.Image}}\"class=\"md-avatar\"\r\n                               width=\"40\" height=\"40\" ng-click=\"showPlanImagePicker()\" style=\"margin:12px 5px 0 0\" />\r\n                        <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                            Click to change\r\n                        </md-tooltip>\r\n                    </span>\r\n                    <input type=\"file\" id=\"planImagePicker\" ng-model=\"planImage\" maxsize=\"1024\"\r\n                           base-sixty-four-input ng-hide=\"true\" accept=\"image/*\" on-after-validate=\"setPlanImage\"/>\r\n                    <md-input-container md-no-float class=\"md-icon-right\" md-theme=\"default-yellow-dark\" style=\"padding-left:0\">\r\n                        <input name=\"plan_name\" ng-model=\"plan.Name\" placeholder=\"Plan name\" required minlegth=\"3\" />\r\n                        <md-icon md-font-icon=\"fa fa-pencil\"></md-icon>\r\n                    </md-input-container>\r\n                </div>\r\n            </div>\r\n            <span flex></span>\r\n            <md-button class=\"md-icon-button md-mini\" aria-label=\"Add event\" ng-click=\"plan.PlanData.push({Name: \'New Event\', Bundles: [], Actions: []})\">\r\n                <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                    Add event\r\n                </md-tooltip>\r\n                <md-icon md-font-icon=\"fa fa-plus fa-15x\"></md-icon>\r\n            </md-button>\r\n            <md-button ng-if=\"false\" md-theme=\"default-dark\" class=\"md-fab md-mini md-primary\" aria-label=\"Save\" ng-disabled=\"plan.PlanData.length==0 || isSaving\" ng-click=\"save()\">\r\n                <md-tooltip md-theme=\"default\" md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                    Save\r\n                </md-tooltip>\r\n                <md-icon md-font-icon=\"fa fa-floppy-o fa-15x\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-content flex>\r\n        <md-card class=\"event-model\" ng-mouseenter=\"showEDelBtn=true\" ng-mouseleave=\"showEDelBtn=false\" md-whiteframe=\"2\"\r\n                 ng-repeat=\"event in plan.PlanData\">\r\n            <md-card-header>\r\n                <md-card-header-text layout=\"row\">\r\n                    <div ng-click=\"hideCardContent=!hideCardContent\">\r\n                        <md-button class=\"md-icon-button\" ng-show=\"hideCardContent\" aria-label=\"Expend\">\r\n                            <md-icon md-font-icon=\"fa fa-angle-down fa-2x\"></md-icon>\r\n                        </md-button>\r\n                        <md-button class=\"md-icon-button\" ng-hide=\"hideCardContent\" aria-label=\"Collapse\">\r\n                            <md-icon md-font-icon=\"fa fa-angle-up fa-2x\"></md-icon>\r\n                        </md-button>\r\n                    </div>\r\n                    <div flex layout=\"column\">\r\n                        <span class=\"md-title\" inline-edit=\"event.Name\" inline-edit-on-blur=\"cancel\" inline-edit-validation=\"!!newValue\" inline-edit-on-click\r\n                              inline-edit-btn-edit=\"<md-icon md-font-icon=\'fa fa-pencil\'></md-icon\"></span>\r\n                        <span class=\"md-subhead\">Add some conditions and actions for this event</span>\r\n                    </div>\r\n                    <md-button class=\"md-icon-button md-mini md-accent\" aria-label=\"Remove event\" ng-show=\"showEDelBtn\"\r\n                               ng-click=\"plan.PlanData.remove(event)\">\r\n                        <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                            Remove event\r\n                        </md-tooltip>\r\n                        <md-icon md-font-icon=\"fa fa-trash fa-15x\"></md-icon>\r\n                    </md-button>\r\n                </md-card-header-text>\r\n            </md-card-header>\r\n            <md-divider></md-divider>\r\n            <md-card-content ng-hide=\"hideCardContent\">\r\n                <md-list>\r\n                    <md-subheader layout=\"row\">\r\n                        <md-button class=\"md-icon-button\" ng-show=\"hideConditionContent\" aria-label=\"Expend\" ng-click=\"hideConditionContent=!hideConditionContent\">\r\n                            <md-icon md-font-icon=\"fa fa-angle-down fa-15x\"></md-icon>\r\n                        </md-button>\r\n                        <md-button class=\"md-icon-button\" ng-hide=\"hideConditionContent\" aria-label=\"Collapse\" ng-click=\"hideConditionContent=!hideConditionContent\">\r\n                            <md-icon md-font-icon=\"fa fa-angle-up fa-15x\"></md-icon>\r\n                        </md-button>\r\n                        <span ng-click=\"hideConditionContent=!hideConditionContent\"><b>CONDITIONS</b></span>\r\n                        <md-button class=\"md-icon-button md-mini md-primary\" aria-label=\"Add condition bundle\"\r\n                                   ng-click=\"event.Bundles.push({Name: \'New Bundle Condition\', Conditions: []});hideConditionContent=false\">\r\n                            <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                                Add condition bundle\r\n                            </md-tooltip>\r\n                            <md-icon md-font-icon=\"fa fa-plus fa-15x\"></md-icon>\r\n                        </md-button>\r\n                    </md-subheader>\r\n                    <div class=\"layout-padding-left\" ng-hide=\"hideConditionContent\">\r\n                        <md-list-item class=\"md-3-line layout-padding-left\" ng-repeat=\"bundle in event.Bundles\"\r\n                                      ng-mouseenter=\"showBDelBtn=true\" ng-mouseleave=\"showBDelBtn=false\">\r\n                            <div class=\"md-list-item-text\" layout=\"column\">\r\n                                <div layout=\"row\">\r\n                                    <h3 inline-edit=\"bundle.Name\" inline-edit-validation=\"!!newValue\" inline-edit-on-blur=\"cancel\" inline-edit-on-click\r\n                                        inline-edit-btn-edit=\"<md-icon md-font-icon=\'fa fa-pencil\'></md-icon\"></h3>\r\n                                    <md-button class=\"md-icon-button md-mini md-primary\" aria-label=\"Add condition\" ng-click=\"addCondition($event, bundle)\">\r\n                                        <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                                            Add condition\r\n                                        </md-tooltip>\r\n                                        <md-icon md-font-icon=\"fa fa-plus\"></md-icon>\r\n                                    </md-button>\r\n                                    <md-button class=\"md-icon-button md-mini md-accent\" aria-label=\"Remove condition bundle\"\r\n                                               ng-show=\"showBDelBtn\" ng-click=\"event.Bundles.remove(bundle)\">\r\n                                        <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                                            Remove condition bundle\r\n                                        </md-tooltip>\r\n                                        <md-icon md-font-icon=\"fa fa-trash\"></md-icon>\r\n                                    </md-button>\r\n                                </div>\r\n                                <md-list class=\"layout-padding-left\">\r\n                                    <md-list-item class=\"md-2-line\" ng-repeat=\"condition in bundle.Conditions\" ng-mouseenter=\"showCDelBtn=true\" ng-mouseleave=\"showCDelBtn=false\">\r\n                                        <div class=\"md-list-item-text\" layout=\"column\">\r\n                                            <div layout=\"row\">\r\n                                                <span>{{condition.Name}}</span>\r\n                                                <md-button class=\"md-icon-button md-mini md-accent\" aria-label=\"Remove condition\"\r\n                                                           ng-show=\"showCDelBtn\" ng-click=\"bundle.Conditions.remove(condition)\">\r\n                                                    <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                                                        Remove condition\r\n                                                    </md-tooltip>\r\n                                                    <md-icon md-font-icon=\"fa fa-trash\"></md-icon>\r\n                                                </md-button>\r\n                                            </div>\r\n                                            <p>\r\n                                                {{condition | json}}\r\n                                            </p>\r\n                                        </div>\r\n                                    </md-list-item>\r\n                                </md-list>\r\n                            </div>\r\n                        </md-list-item>\r\n                    </div>\r\n                    <md-divider></md-divider>\r\n                    <md-subheader layout=\"row\">\r\n                        <md-button class=\"md-icon-button\" ng-show=\"hideActionContent\" aria-label=\"Expend\" ng-click=\"hideActionContent=!hideActionContent\">\r\n                            <md-icon md-font-icon=\"fa fa-angle-down fa-15x\"></md-icon>\r\n                        </md-button>\r\n                        <md-button class=\"md-icon-button\" ng-hide=\"hideActionContent\" aria-label=\"Collapse\" ng-click=\"hideActionContent=!hideActionContent\">\r\n                            <md-icon md-font-icon=\"fa fa-angle-up fa-15x\"></md-icon>\r\n                        </md-button>\r\n                        <span ng-click=\"hideActionContent=!hideActionContent\"><b>ACTIONS</b></span>\r\n                        <span flex></span>\r\n                        <md-button class=\"md-icon-button md-mini md-primary\" aria-label=\"Add action\" ng-click=\"addAction($event, event); hideActionContent=false\">\r\n                            <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                                Add action\r\n                            </md-tooltip>\r\n                            <md-icon md-font-icon=\"fa fa-plus fa-15x\"></md-icon>\r\n                        </md-button>\r\n                    </md-subheader>\r\n                    <div class=\"layout-padding-left\" ng-hide=\"hideActionContent\">\r\n                        <div class=\"layout-padding-left\" layout-fill>\r\n                            <md-list-item class=\"md-3-line layout-padding-left\" ng-repeat=\"action in event.Actions\" ng-mouseenter=\"showADelBtn=true\" ng-mouseleave=\"showADelBtn=false\">\r\n                                <div class=\"md-list-item-text\" layout=\"column\">\r\n                                    <div layout=\"row\">\r\n                                        <h3>{{action.Action.Name}}</h3>\r\n                                        <md-button class=\"md-icon-button md-mini md-accent\" aria-label=\"Remove action\"\r\n                                                   ng-show=\"showADelBtn\" ng-click=\"event.Actions.remove(action)\">\r\n                                            <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                                                Remove action\r\n                                            </md-tooltip>\r\n                                            <md-icon md-font-icon=\"fa fa-trash\"></md-icon>\r\n                                        </md-button>\r\n                                    </div>\r\n                                    <p>\r\n                                        {{action | json}}\r\n                                    </p>\r\n                                </div>\r\n                            </md-list-item>\r\n                        </div>\r\n                    </div>\r\n                </md-list>\r\n            </md-card-content>\r\n        </md-card>\r\n    </md-content>\r\n    <md-button class=\"md-fab md-mini md-primary md-fab-bottom-right\" aria-label=\"Save\" ng-disabled=\"plan.PlanData.length==0 || isSaving\" ng-click=\"save()\">\r\n        <md-tooltip md-theme=\"default\" md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n            Save\r\n        </md-tooltip>\r\n        <md-icon md-font-icon=\"fa fa-floppy-o fa-15x\"></md-icon>\r\n    </md-button>\r\n</div>");
  $templateCache.put("plan/index.html", "<div layout=\"column\" layout-align=\"center none\" flex>\r\n    <md-toolbar md-scroll-shrink ng-if=\"true\" md-whiteframe=\"2\" flex>\r\n        <div class=\"md-toolbar-tools\">\r\n            <h3>\r\n                <span>Workout Plans</span>\r\n            </h3>\r\n            <span flex></span>\r\n            <md-button class=\"md-fab md-mini\" aria-label=\"Add\" ui-sref=\"cpanel.plan.create\">\r\n                <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                    Add workout plan\r\n                </md-tooltip>\r\n                <md-icon md-font-icon=\"fa fa-plus fa-15x\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-content flex>\r\n        <div layout=\"row\" layout-align=\"center center\" ng-show=\"plans.length==0\">\r\n            <h3>Oops...You don\'t have any workout plans.</h3>\r\n        </div>\r\n        <md-list>\r\n            <md-list-item md-ink-ripple class=\"md-3-line plan-list-item\" ng-repeat=\"plan in plans\" ng-click=\"false\"\r\n                          ng-mouseenter=\"showMenuBtn=true\" ng-mouseleave=\"showMenuBtn=false\">\r\n                <img src=\"../images/plan-avatar-default.png\" data-ng-src=\"{{plan.Image}}\" class=\"md-avatar\">\r\n                <div class=\"md-list-item-text\">\r\n                    <h3><b>{{plan.Name}}</b></h3>\r\n                    <h4>{{plan.OwnerName}}</h4>\r\n                    <p>\r\n                        {{plan.UpdateDate | date: \'medium\'}}\r\n                    </p>\r\n                </div>\r\n                <div class=\"md-secondary\" ng-show=\"showMenuBtn\">\r\n                    <md-button class=\"md-fab md-raised md-mini md-primary\" aria-label=\"Edit\" ui-sref=\"cpanel.plan.edit({id: plan.ID})\">\r\n                        <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                            Edit\r\n                        </md-tooltip>\r\n                        <md-icon md-font-icon=\"fa fa-pencil fa-15x\"></md-icon>\r\n                    </md-button>\r\n                    <md-menu>\r\n                        <md-button class=\"md-fab md-raised md-mini md-accent\" aria-label=\"More\" ng-click=\"$mdOpenMenu($event)\">\r\n                            <md-tooltip md-direction=\"bottom\" ng-hide=\"hideTooltipOnXS\">\r\n                                More\r\n                            </md-tooltip>\r\n                            <md-icon md-font-icon=\"fa fa-chevron-down fa-15x\"></md-icon>\r\n                        </md-button>\r\n                        <md-menu-content width=\"4\">\r\n                            <md-menu-item ng-show=\"inApp\">\r\n                                <md-button ng-click=\"startWorkout(plan)\" aria-label=\"Edit\">\r\n                                    <md-icon md-font-icon=\"fa fa-play fa-15x\"></md-icon>\r\n                                    Start\r\n                                </md-button>\r\n                            </md-menu-item>\r\n                            <md-menu-item>\r\n                                <md-button ui-sref=\"cpanel.plan.edit({id: plan.ID})\" aria-label=\"Edit\">\r\n                                    <md-icon md-font-icon=\"fa fa-pencil fa-15x\"></md-icon>\r\n                                    Edit\r\n                                </md-button>\r\n                            </md-menu-item>\r\n                            <md-menu-item>\r\n                                <md-button ng-click=\"share($event, plan)\" aria-label=\"Share\">\r\n                                    <md-icon md-font-icon=\"fa fa-share fa-15x\"></md-icon>\r\n                                    Share\r\n                                </md-button>\r\n                            </md-menu-item>\r\n                            <md-menu-divider></md-menu-divider>\r\n                            <md-menu-item>\r\n                                <md-button class=\"red-text\" ng-click=\"delete($event, plan)\" aria-label=\"Delete\">\r\n                                    <md-icon md-font-icon=\"fa fa-trash fa-15x\"></md-icon>\r\n                                    Delete\r\n                                </md-button>\r\n                            </md-menu-item>\r\n                        </md-menu-content>\r\n                    </md-menu>\r\n                </div>\r\n                <md-divider ng-if=\"!$last\"></md-divider>\r\n            </md-list-item>\r\n        </md-list>\r\n        <md-table-pagination ng-hide=\"query.total<=query.limit\" md-limit=\"query.limit\" md-limit-options=\"query.limitOptions\" md-page=\"query.page\" md-label=\"{page: \'Page:\', rowsPerPage: \'Per page:\', of: \'of\'}\"\r\n                             md-total=\"{{query.total}}\" md-on-paginate=\"getPlans\" md-page-select></md-table-pagination>\r\n    </md-content>\r\n</div>");
  $templateCache.put("report/health.html", "<div layout=\"column\" layout-gt-xs=\"row\" layout-align-gt-xs=\"center start\">\r\n    <input-control model=\"sensor\" name=\"sensor-type\" type=\"BandSensorType\"></input-control>\r\n    <md-input-container class=\"md-block\" ng-show=\"sensor\">\r\n        <label>Group</label>\r\n        <md-select ng-model=\"group\" ng-change=\"options.toTime=options.fromTime\">\r\n            <md-option ng-repeat=\"type in [\'hourly\', \'daily\']\" value=\"{{type}}\">\r\n                {{type.capitalizeFirstLetter()}}\r\n            </md-option>\r\n        </md-select>\r\n    </md-input-container>\r\n    <md-input-container class=\"md-block\" ng-show=\"group\">\r\n        <label>Type</label>\r\n        <md-select ng-model=\"options.func\">\r\n            <md-option ng-repeat=\"t in [\'sum\', \'avg\']\" value=\"{{t}}\" ng-selected=\"$first\">\r\n                {{t.capitalizeFirstLetter()}}\r\n            </md-option>\r\n        </md-select>\r\n    </md-input-container>\r\n    <div ng-show=\"group==\'daily\'\" layout-gt-xs=\"row\">\r\n        <mdp-date-picker mdp-open-on-click required name=\"fromDate\" mdp-placeholder=\"From date (dd/mm/yyyy)\"\r\n                         mdp-format=\"DD/MM/YYYY\" ng-model=\"options.fromTime\" ng-change=\"updateToTime()\"></mdp-date-picker>\r\n        <mdp-date-picker mdp-open-on-click required name=\"toDate\" mdp-placeholder=\"To date (dd/mm/yyyy)\"\r\n                         mdp-format=\"DD/MM/YYYY\" ng-model=\"options.toTime\" mdp-date-filter=\"filterToTime\"></mdp-date-picker>\r\n    </div>\r\n    <div ng-show=\"group==\'hourly\'\" layout-gt-xs=\"row\">\r\n        <mdp-date-picker mdp-open-on-click required name=\"onDate\" mdp-placeholder=\"Date (dd/mm/yyyy)\"\r\n                         mdp-format=\"DD/MM/YYYY\" ng-model=\"options.fromTime\" ng-change=\"options.toTime=options.fromTime\"></mdp-date-picker>\r\n        <mdp-time-picker mdp-open-on-click required name=\"fromTime\" mdp-placeholder=\"From time (HH:mm A)\"\r\n                         mdp-format=\"HH:mm A\" ng-model=\"options.fromTime\" ng-change=\"updateToTime()\"></mdp-time-picker>\r\n        <mdp-time-picker mdp-open-on-click required name=\"toTime\" mdp-placeholder=\"To time (HH:mm A)\"\r\n                         mdp-format=\"HH:mm A\" ng-model=\"options.toTime\" mdp-date-filter=\"filterToTime\"></mdp-time-picker>\r\n    </div>\r\n</div>\r\n<highchart ng-show=\"showChart\" config=\"chartConfig\"></highchart>");
  $templateCache.put("report/workout.html", "<h1>Workout report</h1>");
  $templateCache.put("directives/input-control/band-sensor-type.html", "<md-input-container class=\"md-block\" ng-hide=\"hide||disabled\">\r\n    <label>Sensor type</label>\r\n    <md-select ng-model=\"model\">\r\n        <md-option ng-repeat=\"type in sensorTypes\" value=\"{{type}}\" ng-disabled=\"readonly\" ng-selected=\"required&&$first\">\r\n            {{type}}\r\n        </md-option>\r\n    </md-select>\r\n</md-input-container>");
  $templateCache.put("directives/input-control/number.html", "<md-input-container class=\"md-block\" ng-hide=\"hide||disabled\">\r\n    <label>{{name}} ({{type}})</label>\r\n    <input type=\"number\" step=\"any\" ng-model=\"model\" ng-disabled=\"readonly\">\r\n</md-input-container>");
  $templateCache.put("directives/input-control/string.html", "<md-input-container class=\"md-block\" ng-hide=\"hide||disabled\">\r\n    <label>{{name}} ({{type}})</label>\r\n    <input type=\"text\" step=\"any\" ng-model=\"model\" ng-disabled=\"readonly\">\r\n</md-input-container>");
  return $templateCache.put("directives/input-control/text.html", "<md-input-container class=\"md-block\" ng-hide=\"hide||disabled\">\r\n    <label>{{name}} ({{type}})</label>\r\n    <textarea ng-model=\"model\" rows=\"3\" ng-disabled=\"readonly\"></textarea>\r\n</md-input-container>");
}]);
