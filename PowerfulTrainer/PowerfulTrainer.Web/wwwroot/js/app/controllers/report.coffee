angular.module "controllers.report", []
.controller "ReportHealthCtrl", ($rootScope, $scope, $state, $timeout, $location, $stateParams, $mdpDatePicker, $sessionStorage, MSHealth, mdToast) ->
    $scope.chartTypes = ['calories', 'steps', 'heartrates', 'sleeps', 'run']
    $scope.nodata =
        calories:
            title: "Every step counts! Don't forget to wear your Band to track your progress."
            image: "../images/calories_day_1.png"
        steps:
            title: "You don't have to climb Everest for your steps to count."
            image: "../images/steps_day_1.png"
        heartrates:
            title: "Every step counts! Don't forget to wear your Band to track your progress."
            image: "../images/calories_day_1.png"
        sleeps:
            title: "Just because the city never sleeps, doesn't mean you shouldn't."
            image: "../images/sleeps_day_1.png"
        run:
            title: "Fresh air + a good run = insta-mood-lift. Get on out there."
            image: "../images/run_day_1.png"

    $scope.charts = []

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
        updateCharts()

    isDaily = ->
        return $scope.period is 'daily'

    $scope.updateChartType = (type) ->
        $scope.chartType = type
        $scope.period = 'hourly' if type is 'sleeps' || type is 'run'
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
                    updateCharts()
            else
                $scope.startTime = startTime
                updateCharts()

    updateCharts = ->
        $rootScope.setLoadingState(true)

        timeRange = calcTimeRange()

        $scope.charts = []

        switch $scope.chartType
            when 'steps', 'calories', 'heartrates'
                MSHealth.getSummaries
                    period: $scope.period
                    #activityIncludes: 'Details,MinuteSummaries,MapPoints'
                    startTime: timeRange.startTime.toISOString()
                    endTime: timeRange.endTime.toISOString()
                .then (resp) ->
                    if resp.data.itemCount
                        switch $scope.chartType
                            when 'steps'
                                chartData = parseStepData(resp.data)
                            when 'calories'
                                chartData = parseCaloriesData(resp.data)
                            when 'heartrates'
                                chartData = parseHeartrateData(resp.data)

                        chart = initChartData()
                        chart.configs.series = chart.configs.series.concat(chartData.series)
                        chart.summary = chartData.summary
                        chart.states = chart.states.concat(chartData.states)
                        addChart(chart)
                    $rootScope.setLoadingState(false)
                , (resp) ->
                    #mdToast.showSimple resp.data.Message, "danger"
                    $rootScope.setLoadingState(false)
            when 'sleeps'
                MSHealth.getActivities
                    activityTypes: 'Sleep'
                    activityIncludes: 'Details'#,MinuteSummaries,MapPoints'
                    startTime: timeRange.startTime.toISOString()
                    endTime: timeRange.endTime.toISOString()
                .then (resp) ->
                    console.log resp.data
                    if resp.data.itemCount
                        for sleepActivity in resp.data.sleepActivities
                            chartData = parseSleepData(sleepActivity)
                            chart = initChartData()
                            chart.configs.series = chart.configs.series.concat(chartData.series)
                            chart.summary = chartData.summary
                            chart.states = chart.states.concat(chartData.states) 
                            addChart(chart)
                    $rootScope.setLoadingState(false)
                , (resp) ->
                    #mdToast.showSimple resp.data.Message, "danger"
                    $rootScope.setLoadingState(false)
            when 'run'
                MSHealth.getActivities
                    activityTypes: 'Run'
                    activityIncludes: 'Details,MapPoints'
                    startTime: timeRange.startTime.toISOString()
                    endTime: timeRange.endTime.toISOString()
                .then (resp) ->
                    console.log resp.data
                    if resp.data.itemCount
                        for runActivity in resp.data.runActivities
                            chartData = parseRunData(runActivity)
                            chart = initChartData()
                            chart.configs.series = chart.configs.series.concat(chartData.series)
                            chart.summary = chartData.summary
                            chart.map = chartData.map
                            chart.states = chart.states.concat(chartData.states)
                            addChart(chart)
                    $rootScope.setLoadingState(false)
                , (resp) ->
                    $rootScope.setLoadingState(false)

    calcTimeRange = ->
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
                endTime = startTime.endOf('day')
                $scope.endTime = endTime.toISOString()
        updateTempParams()

        return {startTime: startTime, endTime: endTime}

    addChart = (chart) ->
        f = moment($scope.startTime).startOf('day')
        switch $scope.period
            when 'hourly'
                chart.configs.series.pointInterval = 3600 * 1000
                chart.configs.series.pointStart = f.valueOf()
                chart.configs.options.tooltip = 
                    xDateFormat: '%A, %b %e, %I:%M%P'
                    shared: true
                chart.configs.xAxis.tickInterval = 3600 * 1000 * 2
                chart.configs.xAxis.dateTimeLabelFormats = 
                    hour: '%I%P'
            when 'daily'
                chart.configs.series.pointInterval = 3600 * 1000 * 24
                chart.configs.series.pointStart = f.valueOf()
                chart.configs.options.tooltip = 
                    xDateFormat: '%A, %b %e'
                    shared: true
                chart.configs.xAxis.tickInterval = 3600 * 1000 * 24
                chart.configs.xAxis.dateTimeLabelFormats = 
                    day: '%e. %b'

        switch $scope.chartType
            when 'sleeps'
                chart.configs.options.chart =
                    #zoomType: 'y'
                    type: 'bar'
                chart.configs.options.tooltip =
                    formatter: ->
                        dt = this.y - chart.configs.series[0].startAt
                        if dt > 0
                            return this.series.name + ": " + moment(dt).utc().format('H\\hm\\ms\\s')
                        return this.series.name + ": " + moment(this.y).utc().format('H\\hm\\ms\\s')
                chart.configs.yAxis = 
                    type: 'datetime'
                    #minRange: 3600 * 1000
                    #tickInterval: 3600 * 1000
                    dateTimeLabelFormats:
                        hour: '%H:%M'
                    min: chart.configs.series[0].startAt
                    title:
                        text: ''
                    #labels:
                        #enabled: false
                        #formatter: ->
                        #    Highcharts.dateFormat('%I:%M', this.value);
                chart.configs.options.plotOptions.series =
                    stacking: 'true'
                chart.configs.xAxis =
                    title:
                        text: ''
                    labels:
                        enabled: false
            when 'run'
                chart.configs.options.chart.type = 'line'
                chart.configs.yAxis.title.text = 'min/km'
                #chart.configs.yAxis.reversed = true
                chart.configs.yAxis.labels = 
                    formatter: ->
                        return Math.round(this.value / 6) / 10
                chart.configs.xAxis =
                    title:
                        text: 'km'
                    labels:
                        formatter: ->
                            return Math.round(this.value / 1000) / 100
                chart.configs.options.tooltip =
                    formatter: ->
                        return "km+" + Math.round(this.x / 1000) / 100 + ": " + Math.round(this.y / 6) / 10 + "min/km"
        $scope.charts.push(chart)
        $scope.$broadcast('highchartsng.reflow')

    initChartData = ->
        return {
            summary: null
            states: []
            configs:
                options:
                    exporting:
                        enabled: false
                    chart:
                        zoomType: 'x'
                    credits:
                        enabled: false
                    plotOptions:
                        bar:
                            events:
                                legendItemClick: -> false
                        line:
                            events:
                                legendItemClick: -> false
                        column:
                            events:
                                legendItemClick: -> false
                series:[]
                title:
                    text: ""
                loading: false
                #tooltip:
                    #crosshairs: true
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
        } 

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
        
        ids = 0
        last = [-1, -1, -1]
        linkto = null
        for seg in data.activitySegments
            t = parseTimeToArray(seg.duration, 'H:m:s')
            if seg.segmentType is 'Sleep'
                if seg.sleepType is 'RestfulSleep'
                    color = '#3F51B5'
                    name = 'Restful Sleep'
                    if last[0] isnt -1
                        linkto = last[0]
                    last[0] = ids
                else
                    name = 'Light'
                    color = Highcharts.getOptions().colors[0]
                    if last[1] isnt -1
                        linkto = last[1]
                    last[1] = ids
            else
                name = 'Awake'
                color = '#FFC107'
                if last[2] isnt -1
                    linkto = last[2]
                last[2] = ids
            ts = (t[0]*60 + t[1]*60 + t[2]) * 1000
            series.push
                id: ids++
                name: name
                #type: 'bar'
                #showInLegend: false
                #stacking: 'normal'
                linkedTo: linkto
                color: color
                data: [ts]
        series.reverse()
        startTime = moment(data.activitySegments[0].startTime)
        series[0].startAt = ((startTime.hours()*60 + startTime.minutes())*60 + startTime.seconds())*1000 + startTime.milliseconds()
        series[series.length-1].data[0] += series[0].startAt
        return {states: states, series: series, summary: states[0]} 

    parseRunData = (data) ->
        states = [
            {title: 'Duration', units: ['h', 'm', 's'], showTitle: true}
            {title: 'Calories burned', unit: 'cals'}
            {title: 'Average HR', unit: 'bpm'}
            {title: 'Distance', unit: 'km'}
        ]
        series = 
            name: 'run'
            type: 'line'
            showInLegend: false
            color: Highcharts.getOptions().colors[0]
            data: []
        map =
            path: []
            paused: []
            resumed: []

        states[0].values = parseTimeToArray(data.duration, 'H:m:s')
        states[0].info = "Start time: " + moment(data.startTime).format('h:ma')
        states[1].value = data.caloriesBurnedSummary.totalCalories
        states[2].value = data.heartRateSummary.averageHeartRate
        states[3].value = Math.round(data.distanceSummary.totalDistance / 1000) / 100
        
        for point in data.mapPoints
            if point.speed
                series.data.push([point.totalDistance, point.speed])
            if point.location
                latlng = [point.location.latitude/10000000, point.location.longitude/10000000]
                map.path.push(latlng)
                if point.isPaused
                    map.paused.push(latlng)
                
        return {states: states, series: [series], summary: states[0], map: map}

    updateCharts()
    
.controller "ReportWorkoutCtrl", ($rootScope, $scope, $stateParams, $state, $mdpDatePicker, $sessionStorage, Report, Auth, mdToast) ->
    $scope.nodata =
        title: "No guided workout tracked this day."
        image: "../images/guided_day_1.png"

    if $stateParams.username
        $scope.username =  $stateParams.username
    else
        $scope.username =  Auth.isAuthenticated().Username
        $scope.isOwnReport = true
    
    if $stateParams.date
        $scope.selectedDate = moment($stateParams.date, 'YYYY-MM-DD')
    else
        if $scope.isOwnReport
            unless $sessionStorage.startTime
                $sessionStorage.startTime = new Date()
            $state.go 'cpanel.report.workout',
                    date: moment($sessionStorage.startTime).format('YYYY-MM-DD')
            return
        else $scope.selectedDate = moment()
    $scope.reports = []
    
    if $scope.selectedDate.valueOf() <= moment().subtract(1, 'd').valueOf()
        $scope.hideMessageWorkout = true
    else $scope.hideMessageWorkout = false

    $scope.showDatePicker = (evt) ->
        $mdpDatePicker $scope.selectedDate.toDate(),
            targetEvent: evt
            maxDate: moment().add(1, 'd')
        .then (selectedDate) ->
            $sessionStorage.startTime = selectedDate
            $state.go 'cpanel.report.workout',
                date: moment(selectedDate).format('YYYY-MM-DD')

    $scope.startWorkoutOrChangeDate = (evt) ->
        if $scope.hideMessageWorkout || !$scope.isOwnReport
            $scope.showDatePicker(evt)
        else
            $state.go('cpanel.plan.index')

    getArrayTimeFromSeconds = (seconds) ->
        min = Math.floor(seconds / 60);
        sec = seconds % 60;
        return [min, sec]

    updateReports = (reports) ->
        $scope.reports = reports
        for report in $scope.reports
                report.DurationArr = getArrayTimeFromSeconds(report.Duration)

    $scope.getReport = ->
        $rootScope.setLoadingState(true)
        if $scope.isOwnReport
            Report.getReport($scope.selectedDate.startOf('day').toISOString(), $scope.selectedDate.endOf('day').toISOString())
            .then (resp) ->
                updateReports(resp.data.Data)
                $rootScope.setLoadingState(false)
            , (resp) ->
                # mdToast.showSimple resp.data.Message, "danger"
                $rootScope.setLoadingState(false)
        else
            Report.get($scope.username, $scope.selectedDate.startOf('day').toISOString(), $scope.selectedDate.endOf('day').toISOString())
            .then (resp) ->
                updateReports(resp.data.Data)
                $rootScope.setLoadingState(false)
            , (resp) ->
                #mdToast.showSimple resp.data.Message, "danger"
                $rootScope.setLoadingState(false)

    $scope.getReport()
            