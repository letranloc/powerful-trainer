angular.module 'filters.restTimeFilter', []
.filter "RestTimeFilter", ->
    return (input) ->
        if input.Sets > 1
            if input.RestTime is 'AsNeed'
                return "As need"
            else
                min = Math.floor(input.RestTime / 60);
                sec = input.RestTime % 60;
                str = ""
                if min > 0
                    if sec > 0 then str = min + " min " + sec + " sec"
                    else str = min + " minute"
                else str = sec + " second" + (if sec > 1 then 's')
                return str
        else return ""