angular.module "controllers.report", []
.controller "ReportHealthCtrl", ($scope, $timeout, Report) ->
    $scope.options = {}    
    $scope.$watch '[sensor,group,options]', ->
        $scope.updateChart()
    , true

    $scope.updateToTime = ->
        if !$scope.options.toTime || $scope.filterToTime($scope.options.toTime)
            $scope.options.toTime = $scope.options.fromTime

    $scope.filterFromTime = (date) ->
        if $scope.options.toTime
            return moment(date).valueOf() > moment($scope.options.toTime).valueOf()
        else return false
        
    $scope.filterToTime = (date) ->
        if $scope.options.fromTime
            return moment(date).valueOf() < moment($scope.options.fromTime).valueOf()
        else return false

    $scope.updateChart = ->
        if $scope.sensor && $scope.group && $scope.options.func && $scope.options.fromTime && $scope.options.toTime
            Report.get($scope.sensor, $scope.group, $scope.options).then (resp) ->
                $scope.showChart = true
                series =
                    name: $scope.sensor
                    data: []

                for val, k in resp.data.Data
                    series.data.push([moment(val.Time).valueOf(), val.Value])

                if $scope.sensor is 'HeartRate'
                    series.type = 'line'
                else series.type = 'column'

                $scope.updateChartConfig(series)

    $scope.updateChartConfig = (series) ->
        $scope.chartConfig.series = [series]
        f = moment($scope.fromTime)
        if $scope.type is 'avg'
            f = f.subtract(30, 'minutes')

        switch $scope.group
            when 'hourly'
                series.pointInterval = 3600 * 1000
                series.pointStart = f.valueOf()
                $scope.chartConfig.options.tooltip = 
                    xDateFormat: '%A, %b %e, %I:%M%P'
                    shared: true
                $scope.chartConfig.xAxis.tickInterval = 3600 * 1000
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

        $scope.$broadcast('highchartsng.reflow')

    $scope.chartConfig =
        options:
            exporting:
                enabled: false
            chart:
                zoomType: 'x'
        series:[]
        title:
            text: ""
        loading: false
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
    
.controller "ReportWorkoutCtrl", ($scope) ->
    $scope.title = ""