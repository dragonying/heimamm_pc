<template>
        <div class='chart' ref="yearMonth">
        </div>
</template>

<script>
import echarts from 'echarts'

export default {
    name:"yearMonth-map",
    props:['yearMonthData'],
    data(){
        return {};
    },
    watch: {
        yearMonthData(){
            this.yearMonthData.optionData &&  this.createChart();
        }
    },
    methods:{
      createChart(){
           let legendData = this.yearMonthData.legendData;
           let seriesData = this.yearMonthData.seriesData;
           let xAxisData = this.yearMonthData.xAxisData;
           let optionData = this.yearMonthData.optionData;
           let yearData = this.yearMonthData.yearData;
           echarts.init(this.$refs.yearMonth).setOption({
                baseOption: {
                    timeline: {
                        axisType: 'category',
                        // realtime: false,
                        // loop: false,
                        autoPlay: true,
                        // currentIndex: 2,
                        playInterval: 1000,
                        // controlStyle: {
                        //     position: 'left'
                        // },
                        data: yearData,
                        label: {
                            formatter : function(s) {
                                return (new Date(s)).getFullYear();
                            }
                        }
                    },
                    title: {
                        subtext: '数据来自系统'
                    },
                    tooltip: {
                    },
                    legend: {
                        left: 'right',
                        data: legendData
                    },
                    calculable : true,
                    grid: {
                        top: 80,
                        bottom: 100,
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                                label: {
                                    show: true,
                                    formatter: function (params) {
                                        return params.value.replace('\n', '');
                                    }
                                }
                            }
                        }
                    },
                    xAxis: [
                        {
                            'type':'category',
                            'axisLabel':{'interval':0},
                            'data':xAxisData,
                            splitLine: {show: false}
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: 'GDP（亿元）'
                        }
                    ],
                    series: seriesData
                },
                options:optionData
            });
        }
    }
}
</script>


<style lang="less">
    
</style>