angular.module 'filters.completionFilter', []
.filter "CompletionFilter", ->
    return (input) ->
        if input.Repetitions
            if input.Repetitions is -1
                return "Max reps"
            else return input.Repetitions + " reps"
        else if input.Duration
            min = Math.floor(input.Duration / 60);
            sec = input.Duration % 60;
            str = ""
            if min > 0
                if sec > 0 then str = min + " min " + sec + " sec"
                else str = min + " minute"
            else str = sec + " second" + (if sec > 1 then 's')
            return str
        else return "Select"