angular.module "directives.fabButton", []
.directive "fabButtonContent", ->
    return {
        restrict: 'A'
        link: (scope, element, attrs) ->
            content = angular.element(element[0])
            fab = content.parent().find('[fab-button]')
            last_position = 0
            onScroll = (ev) ->
                pos = ev.target.scrollTop
                console.log pos
                if pos is 1 then return
                if pos > last_position
                    fab.addClass('hide2')
                else
                    fab.removeClass('hide2')
                last_position = pos
                
                content.on '$destroy', ->
                    content.off('scroll', onScroll)
            
            content.bind 'scroll', onScroll
    }