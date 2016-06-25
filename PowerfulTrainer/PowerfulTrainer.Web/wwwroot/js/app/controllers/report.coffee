angular.module "controllers.report", []
.controller "ReportHealthCtrl", ($scope, $state, $timeout, $location, $stateParams, $mdpDatePicker, $sessionStorage, MSHealth) ->
    $scope.chartTypes = ['calories', 'steps', 'heartrates', 'sleeps']
    
    params = $location.search()
    unless $sessionStorage.startTime
        $sessionStorage.startTime = new Date()
    unless $sessionStorage.endTime
        $sessionStorage.endTime = new Date()
    unless $sessionStorage.chartType
        $sessionStorage.chartType = $scope.chartTypes[0]

    $scope.startTime = new Date($sessionStorage.startTime)
    $scope.endTime = new Date($sessionStorage.endTime)
    $scope.period = params.period || 'hourly'
    $scope.chartType = $stateParams.chartType || $sessionStorage.chartType
    $scope.summaryState = null
    $scope.chartStates = []

    updateTempParams = ->
        $sessionStorage.startTime = $scope.startTime
        $sessionStorage.endTime = $scope.endTime
        $sessionStorage.chartType = $scope.chartType

        $location.search('period', $scope.period)
        $location.search('start', moment($scope.startTime).format('YYYY-MM-DD'))
        if $scope.period is 'daily'
            $location.search('end', moment($scope.endTime).format('YYYY-MM-DD'))
        else $location.search('end', null)

    $scope.updatePeriod = (period) ->
        $scope.period = period
        updateChart()

    isDaily = ->
        return $scope.period is 'daily'

    $scope.updateChartType = (type) ->
        $scope.chartType = type
        $scope.period = 'hourly' if type is 'sleeps'
        updateTempParams()
        $state.go('cpanel.report.health', {
            chartType: type
        })

    $scope.showDatePicker = (evt) ->
        maxDate = moment()
        if isDaily()
            maxDate = maxDate.subtract(1, 'd')
        $mdpDatePicker $scope.startTime,
            targetEvent: evt
            maxDate: maxDate
        .then (startTime) ->
            if $scope.period is 'daily'
                maxDate = moment(startTime).add(31, 'day')
                if maxDate.unix() > moment().unix()
                    maxDate = moment()
                $mdpDatePicker $scope.endTime,
                    targetEvent: evt
                    minDate: startTime
                    maxDate: maxDate
                .then (endTime) ->
                    $scope.startTime = startTime
                    $scope.endTime = endTime
                    updateChart()
            else
                $scope.startTime = startTime
                updateChart()

    updateChart = ->
        startTime = moment($scope.startTime).startOf('day') #.subtract(1, 'h')
        if $scope.period is 'hourly'
            endTime = moment($scope.startTime).endOf('day')
        else
            maxDate = moment($scope.startTime).add(31, 'd')
            if maxDate.unix() > moment().unix()
                maxDate = moment()
            endTime = moment($scope.endTime).startOf('day')
            if maxDate.unix() < endTime.unix()
                endTime = maxDate
                $scope.endTime = endTime.toISOString()
            else if endTime.unix() <= startTime.unix()
                endTime = startTime.add(1, 'h')
                $scope.endTime = endTime.toISOString()
        updateTempParams()

        $scope.summaryState = null
        $scope.chartStates = []

        switch $scope.chartType
            when 'steps', 'calories', 'heartrates'
                MSHealth.getSummaries
                    period: $scope.period
                    startTime: startTime.toISOString()
                    endTime: endTime.toISOString()
                .then (resp) ->
                    series = []
                    switch $scope.chartType
                        when 'steps'
                            chartData = parseStepData(resp.data)
                        when 'calories'
                            chartData = parseCaloriesData(resp.data)
                        when 'heartrates'
                            chartData = parseHeartrateData(resp.data)

                    series = series.concat(chartData.series)
                    $scope.summaryState = chartData.summary
                    $scope.chartStates = $scope.chartStates.concat(chartData.states) 

                    updateChartConfig(series)
            when 'sleeps'
                MSHealth.getActivities
                    activityTypes: 'Sleep'
                    activityIncludes: 'Details'
                    startTime: startTime.toISOString()
                    endTime: endTime.toISOString()
                .then (resp) ->
                    console.log resp.data
                    series = []
                    chartData = parseSleepData(resp.data)

                    series = series.concat(chartData.series)
                    $scope.summaryState = chartData.summary
                    $scope.chartStates = $scope.chartStates.concat(chartData.states) 

                    updateChartConfig(series)

    updateChartConfig = (series) ->
        $scope.chartConfig.series = series
        f = moment($scope.startTime).startOf('day')
        switch $scope.period
            when 'hourly'
                series.pointInterval = 3600 * 1000
                series.pointStart = f.valueOf()
                $scope.chartConfig.options.tooltip = 
                    xDateFormat: '%A, %b %e, %I:%M%P'
                    shared: true
                $scope.chartConfig.xAxis.tickInterval = 3600 * 1000 * 2
                $scope.chartConfig.xAxis.dateTimeLabelFormats = 
                    hour: '%I%P'
            when 'daily'
                series.pointInterval = 3600 * 1000 * 24
                series.pointStart = f.valueOf()
                $scope.chartConfig.options.tooltip = 
                    xDateFormat: '%A, %b %e'
                    shared: true
                $scope.chartConfig.xAxis.tickInterval = 3600 * 1000 * 24
                $scope.chartConfig.xAxis.dateTimeLabelFormats = 
                    day: '%e. %b'

        switch $scope.chartType
            when 'sleeps'
                $scope.chartConfig.options.chart =
                    zoomType: undefined
                    type: 'bar'
                $scope.chartConfig.options.tooltip.enabled = false
                $scope.chartConfig.yAxis = 
                    type: 'datetime'
                    minRange: 3600 * 1000
                    tickInterval: 3600 * 1000
                    dateTimeLabelFormats:
                        hour: '%I%P'
                    labels:
                        enabled: false
                        formatter: ->
                            console.log this.value
                            Highcharts.dateFormat('%I%P', this.value);
                    title:
                        text: ''
                $scope.chartConfig.xAxis =
                    title:
                        text: ''
                    labels:
                        enabled: false
        $scope.$broadcast('highchartsng.reflow')

    $scope.chartConfig =
        options:
            exporting:
                enabled: false
            chart:
                zoomType: 'x'
            credits:
                enabled: false
            tooltip:
                crosshairs: true
        series:[]
        title:
            text: ""
        loading: false
        tooltip:
            crosshairs: true
        yAxis:
            title:
                text: ''
            min: 0
        xAxis:
            type: 'datetime'
            minRange: 3600 * 1000
            tickInterval: 3600 * 1000
            dateTimeLabelFormats: {}
            title:
                text: ''
        useHighStocks: false
        panel:
            size: 100
        size:
            width: null
            height: null
        func: (chart) -> $timeout -> chart.reflow()

    Highcharts.setOptions
        global:
            useUTC: false

    parseStepData = (data) ->
        states = [
            {title: 'Steps', unit: 'steps'}
        ]
        if isDaily()
            states = states.concat([
                {title: 'Most steps', unit: 'steps'}
                {title: 'Fewest steps', unit: 'steps'}
                {title: 'Average daily steps', unit: 'steps'}    
            ])
        states = states.concat([
            {title: 'Distance', unit: 'km'}
            {title: 'Floor climbed'}
            {title: 'peakHR', unit: 'bpm'}
        ])
        series =
                name: 'Steps'
                type: 'column'
                showInLegend: false
                color: Highcharts.getOptions().colors[0]
                data: []

        if data.itemCount
            for summary in data.summaries
                if summary.stepsTaken
                        states[0].value = (states[0].value||0) + summary.stepsTaken
                        states[0].count = (states[0].count||0) + 1
                if summary.distanceSummary.totalDistance
                    idx = 1
                    if isDaily()
                        idx = 4
                    states[idx].value = (states[idx].value||0) + summary.distanceSummary.totalDistance
                if summary.floorsClimbed
                    idx = 2
                    if isDaily()
                        idx = 5
                    states[idx].value = (states[idx].value||0) + summary.floorsClimbed
                if summary.heartRateSummary.peakHeartRate
                    idx = 3
                    if isDaily()
                        idx = 6
                    if !states[idx].value || states[idx].value < summary.heartRateSummary.peakHeartRate
                        states[idx].value = summary.heartRateSummary.peakHeartRate
                        states[idx].info = moment(summary.endTime).format if isDaily() then 'dddd, MMMM DD, YYYY' else 'MMMM DD, hh:mma'
                if isDaily()
                    if summary.stepsTaken
                        if !states[1].value || states[1].value < summary.stepsTaken
                            states[1].value = summary.stepsTaken
                            states[1].info = moment(summary.endTime).format if isDaily() then 'dddd, MMMM DD, YYYY' else 'MMMM DD, hh:mma'
                        if summary.stepsTaken && (!states[2].value || states[2].value > summary.stepsTaken)
                            states[2].value = summary.stepsTaken
                            states[2].info = moment(summary.endTime).format if isDaily() then 'dddd, MMMM DD, YYYY' else 'MMMM DD, hh:mma'
                    series.data.push [moment(summary.endTime).startOf('day').valueOf(), summary.stepsTaken]
                else
                    series.data.push [moment(summary.endTime).valueOf(), summary.stepsTaken]
            if isDaily() && states[0].value
                states[3].value = Math.round(states[0].value / states[0].count)
             idx = 1
            if isDaily()
                idx = 4
            if states[idx].value
                states[idx].value = Math.round(states[idx].value / 1000) / 100
            series.data.reverse()
    
        $scope.chartStates = []
        
        return {states: states, series: [series], summary: states[0]}

    parseHeartrateData = (data) ->
        states = [
            {title: 'Peak HR', unit: 'bpm'}
            {title: 'Lowest HR', unit: 'bpm'}
            {title: 'Average HR', unit: 'bpm'}
        ]
        series = []
        currentSeri = null
        if data.itemCount
            for summary in data.summaries
                hr = summary.heartRateSummary
                if hr.peakHeartRate
                    if !states[0].value || states[0].value < hr.peakHeartRate
                        states[0].value = hr.peakHeartRate
                        states[0].info = moment(summary.endTime).format if isDaily() then 'dddd, MMMM DD, YYYY' else 'MMMM DD, hh:mma'
                    if !states[1].value || states[1].value > hr.lowestHeartRate
                        states[1].value = hr.lowestHeartRate
                        states[1].info = moment(summary.endTime).format if isDaily() then 'dddd, MMMM DD, YYYY' else 'MMMM DD, hh:mma'
                    states[2].value = (states[2].value||0) + hr.averageHeartRate
                    states[2].count = (states[2].count||0) + 1
                    unless currentSeri
                        currentSeri =
                            type: 'arearange'
                            color: Highcharts.getOptions().colors[0]
                            linkedTo: ':previous'
                            showInLegend: false
                            maker:
                                symbol: 'circle'
                            data: []
                        unless named then named = true
                    if isDaily()
                        currentSeri.data.push [moment(summary.endTime).startOf('day').valueOf(), hr.lowestHeartRate, hr.peakHeartRate]
                    else
                        currentSeri.data.push [moment(summary.endTime).valueOf(), hr.lowestHeartRate, hr.peakHeartRate]
                else if currentSeri
                    currentSeri.data.reverse()
                    series.push(currentSeri)
                    currentSeri = null
            if states[2].value
                states[2].value = Math.round(states[2].value / states[2].count)
            series.reverse()
            if series.length
                series[0].name = "HR"
                series[0].linkedTo = undefined
        return {states:states, series:series, summary:states[0]}

    parseCaloriesData = (data) ->
        states = [
            {title: 'Calories', unit: 'cals'}
            {title: 'Highest burned', unit: 'cals'}
            {title: 'Lowest burned', unit: 'cals'}
            {title: 'Average burned', unit: 'cals'}
            {title: 'peak HR', unit: 'bpm'}
        ]
        series =
            name: 'Cals'
            type: 'column'
            showInLegend: false
            color: Highcharts.getOptions().colors[0]
            data: []
    
        if data.itemCount
            for summary in data.summaries
                cals = summary.caloriesBurnedSummary.totalCalories
                if cals
                    states[0].value = (states[0].value||0) + cals
                    states[0].count = (states[0].count||0) + 1
                    if !states[1].value || states[1].value < cals
                        states[1].value = cals
                        states[1].info = moment(summary.endTime).format if isDaily() then 'dddd, MMMM DD, YYYY' else 'MMMM DD, hh:mma'
                    if cals && (!states[2].value || states[2].value > cals)
                        states[2].value = cals
                        states[2].info = moment(summary.endTime).format if isDaily() then 'dddd, MMMM DD, YYYY' else 'MMMM DD, hh:mma'
                if summary.heartRateSummary.peakHeartRate
                    if !states[4].value || states[4].value < summary.heartRateSummary.peakHeartRate
                        states[4].value = summary.heartRateSummary.peakHeartRate
                        states[4].info = moment(summary.endTime).format if isDaily() then 'dddd, MMMM DD, YYYY' else 'MMMM DD, hh:mma'
                if isDaily()
                    series.data.push [moment(summary.endTime).startOf('day').valueOf(), cals]
                else
                    series.data.push [moment(summary.endTime).valueOf(), cals]
            if states[0].value
                states[3].value = Math.round(states[0].value / states[0].count)
            series.data.reverse()

        return {states: states, series: series, summary: states[0]}

    parseSleepData = (data) ->
        states = [
            {title: 'Time asleep', units: ['h', 'm'], showTitle: true}
            {title: 'Restful sleep', units: ['h', 'm']}
            {title: 'Light sleep', units: ['h', 'm']}
            {title: 'Time to fall asleep', units: ['m', 's']}
            {title: 'Duraing', units: ['h', 'm']}
            {title: 'Sleep efficency', unit: '%'}
            {title: 'Resting HR', unit: 'bpm'}
            {title: 'Calories burned', unit: 'cals'}
            {title: 'Woke up', unit: 'times'}
        ]
        series = []
        if data.itemCount
            data = data.sleepActivities[data.itemCount-1]
            states[0].values = parseTimeToArray(data.sleepDuration)
            states[1].values = parseTimeToArray(data.totalRestfulSleepDuration)
            states[2].values = parseTimeToArray(data.totalRestlessSleepDuration)
            states[3].values = parseTimeToArray(data.fallAsleepDuration, 'm:s')
            states[4].values = parseTimeToArray(data.duration)
            states[5].value = data.sleepEfficiencyPercentage
            states[6].value = data.restingHeartRate
            states[7].value = data.caloriesBurnedSummary.totalCalories
            states[8].value = data.numberOfWakeups
            series.pointStart = moment(data.startTime).valueOf()
            for seg in data.activitySegments
                t = parseTimeToArray(seg.duration, 'H:m:s')
                color = if seg.segmentType is 'Sleep' then Highcharts.getOptions().colors[0] else '#FFC107'
                ts = (t[0]*60 + t[1]*60 + t[2]) * 1000
                series.push
                    type: 'bar'
                    showInLegend: false
                    stacking: 'normal'
                    color: color
                    data: [ts]
            #series.reverse()
            #series[0].pointStart = moment(data.activitySegments[0].startTime).valueOf()
        return {states: states, series: series, summary: states[0]} 

    updateChart()
    
.controller "ReportWorkoutCtrl", ($scope, $stateParams, $state, $mdpDatePicker, Report) ->
    
    
    if $stateParams.date
        $scope.selectedDate = moment($stateParams.date, 'YYYY-MM-DD')
    else
        $scope.selectedDate = moment()
    $scope.reports = []
    
    if $scope.selectedDate.valueOf() <= moment().subtract(1, 'd').valueOf()
        $scope.hideMessageWorkout = true
    else $scope.hideMessageWorkout = false

    $scope.showDatePicker = (evt) ->
        $mdpDatePicker $scope.selectedDate.toDate(),
            targetEvent: evt
            maxDate: moment()
        .then (selectedDate) ->
            $state.go 'cpanel.report.workout',
                date: moment(selectedDate).format('YYYY-MM-DD')

    $scope.startWorkoutOrChangeDate = (evt) ->
        if $scope.hideMessageWorkout
            $scope.showDatePicker(evt)
        else
            $state.go('cpanel.plan.index')

    getArrayTimeFromSeconds = (seconds) ->
        min = Math.floor(seconds / 60);
        sec = seconds % 60;
        return [min, sec]

    $scope.getReport = ->
        selectedDate = moment($scope.selectedDate)
        Report.getReport($scope.selectedDate.startOf('day').toISOString(), $scope.selectedDate.endOf('day').toISOString())
        .then (resp) ->
            $scope.reports = resp.data.Data
            for report in $scope.reports
                report.DurationArr = getArrayTimeFromSeconds(report.Duration)

    $scope.getReport()
            