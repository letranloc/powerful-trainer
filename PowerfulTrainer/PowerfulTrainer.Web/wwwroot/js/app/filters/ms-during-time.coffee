angular.module 'filters.msDuringTime', []
.filter 'MSDuringTimeFilter', ->
    return (input) ->
        return input