angular.module 'directives.classRoute', []
.directive 'classRoute', ($rootScope, $route) ->
    (scope, elem, attr) ->
      previous = ''
      if $route.current
        r = $route.current.$$route
        if attr['classRoute'] isnt '' and r and r['classRoute'] and r['classRoute'][attr['classRoute']]
          previous = r['classRoute'][attr['classRoute']]
          attr.$addClass(previous)

      $rootScope.$on '$routeChangeSuccess', (event, currentRoute) ->
        route = currentRoute.$$route;
        if attr['classRoute'] isnt '' and route and route['classRoute'] and route['classRoute'][attr['classRoute']]
          cls = route['classRoute'][attr['classRoute']];

        if previous
          attr.$removeClass(previous)

        if cls
          previous = cls
          attr.$addClass cls