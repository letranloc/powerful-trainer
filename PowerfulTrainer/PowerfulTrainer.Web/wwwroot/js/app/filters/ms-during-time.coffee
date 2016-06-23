angular.module 'filters.msDuringTime', []
.filter 'MSDuringTimeFilter', ->
    return (input) ->
        return input unless input
        time = moment(input.replace('H', ':').replace('M', ':'), 'PTH:m:sS')
        return [time.hours(), time.minutes()]