## 相比较于官网 在这里我做了一下优化  传入数组参数 这样更加清晰明了 同时可以重复利用代码
## 用法 下面的代码是从项目中积累下来的 在那测试通过  如果要使用  还需要根据自己的情况调整

<script src="/static/js/highcharts.js"></script>
<div id="crash_pv_id" style="min-width:300px;height:360px"></div>
<script type="text/javascript">
    $(function () {
        var tmp = [];
        var created_time = [];
        var crash_pv_ratio = [];
        var crash_pv = [];
        var crash_pv_ratio_config = [];
        var crash_pv_config = [];
        // 崩溃率图表
        {%foreach from=$crash_ratio key=i item=values %}
            created_time.push('{%$values.created_time|truncate:10:""%}');
            crash_pv_ratio.push(parseFloat('{%round($values.crash_pv_ratio,4)%}'));
            crash_pv.push(parseFloat('{%$values.crash_pv%}'));
        {%/foreach %}
        crash_pv_ratio_config = {
            "chart_id":"crash_pv_ratio_id",
            "xAxis_data":created_time,
            "yAxis_data":crash_pv_ratio,
            "title":{
                "text":"近2个月线上崩溃率",
            },
            "xAxis":{
                "title":{
                    "text":"日期",
                },
            },
            "yAxis":{
                "labels":{
                    "format": '{value:,.4f}',
                },
                "title":{
                    "text": "崩溃率",
                },
            },
            "tooltip": {
                "formatter": function() {
                    return '<b>'+'时间:'+ this.x +  '</b><br/>' +"崩溃率:"+ this.y + " %";
                }
            },
            "series":{
                "name":"崩溃率",
            } 
                
        };
        crash_pv_config = {
            "chart_id":"crash_pv_id",
            "xAxis_data":created_time,
            "yAxis_data":crash_pv,
            "title":{
                "text":"近2个月线上崩溃次数",
            },
            "xAxis":{
                "title":{
                    "text":"日期",
                },
            },
            "yAxis":{
                "labels":{
                    "format": '{value}',
                },
                "title":{
                    "text": "崩溃次数",
                },
            },
            "tooltip": {
                "formatter": function() {
                    return '<b>'+'时间:'+ this.x +  '</b><br/>' +"崩溃次数:"+ this.y;
                }
            },
            "series":{
                "name":"崩溃次数",
            } 
        };
        show_line(crash_pv_ratio_config);
        show_line(crash_pv_config);

    // 绘制图表
    function show_line(config) {
        // Build the chart
        $('#' + config.chart_id).highcharts({
            credits: false,
            exporting: false,
            chart: {
                type: 'line'
            },
            title: {
                text: config.title.text
            },
            xAxis: {
                title: {
                    text:config.xAxis.title.text,
                },
                categories: config.xAxis_data,
                labels: {
                    rotation: 30,
                    align: 'left',
                    // x: -30,
                    // y: 23
                },
                tickInterval: (config.xAxis_data.length / 30).toFixed(0),
                tickmarkPlacement: 'on'
            },
            yAxis: {
                title: {
                    text: config.yAxis.title.text,
                    y: 0,
                    rotation: 90,
                },
                min: 0,
                labels: {
                    format: config.yAxis.labels.format,
                }
            },
            tooltip: {
                // crosshairs: true,
                // shared: true,
                // valueSuffix: '',
                formatter: config.tooltip.formatter,
            },
            legend: {
                enabled: true,
                align: 'right',
                layout: 'vertical',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            plotOptions: {
                line: {
                    lineWidth: 2,
                    states: {
                        hover: {
                            lineWidth: 5
                        }
                    },
                    marker: {
                        enabled: true
                    }
                }
            },
            // series: series_ar
            series: [{
                name: config.series.name,
                data: config.yAxis_data,
            }]
        });
    }
 
</script>

