<template>
        <div class='chart' ref="map">
        </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'; 
import {randomColor} from '@/utils/tool'

export default {
    name:"chart-map",
    props:['chartData'],
    data(){
        return {};
    },
    watch: {
        //由于chartData是父组件通过ajax请求获得的数据，存在异步延时，第一次通过create或者mouted是无法获取该数据，得通过侦听器获取
        chartData(){
            this.chartData.data &&  this.createMap();
        }
    },
    methods:{
      createPieces(arr){    
        let pieces = [];
        let limit = 12;
        let values = arr.map(v => v.value);
        let max = Math.max(...values);
        let min = 0;
        let dis = Math.floor((max - min) / limit);

        for(let i=0;i< limit;i++){
            let item = {};
            let gte =  dis*i;
            let lt =  dis*i+dis;
            if (i ==0) {
                item = {
                    value: gte,
                };
            } else if (i ==  limit - 1) {
                item = {
                    gt: gte,
                    label: `> ${gte} 人`,
                }
            } else {
                item = {
                    gte:gte,
                    lt: lt,
                    label: `${gte} - ${lt} 人`,
                }
            }
            item.color = randomColor();

            pieces.unshift(item)
        }
        return pieces;
      },
      createMap(){
           let title = this.chartData.title;
           let seriesName = this.chartData.seriesName;
           let dataData = this.chartData.data;
           let pieces = this.createPieces(dataData);
           echarts.init(this.$refs.map).setOption({
               title:{
                    text:title,
                    left: 'left',
                    textStyle:{
                        fontSize:24,
                        fontWeight:'normal',
                        color:'#666666'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} 人'
                },
                visualMap: {
                    min: 0,
                    max: 1000,
                    left: 10,
                    bottom: 20,
                    showLabel: !0,
                    text: ["多", "少"],
                    pieces:pieces,
                    show: 0
                },
                geo: {
                    map: "china",
                    roam: !1,
                    scaleLimit: {
                        min: 1,
                        max: 2
                    },
                    zoom: 1.23,
                    top: 60,
                    left:"center",
                    label: {
                        normal: {
                            show: !0,
                            fontSize: "14",
                            color: "rgba(0,0,0,0.7)"
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 50,
                            shadowColor: 'rgba(0, 0, 0, 0.2)',
                            borderColor: "rgba(0, 0, 0, 0.2)"
                        },
                        emphasis: {
                            areaColor: "#f2d5ad",
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            borderWidth: 0
                        }
                    }
                },
                series: [{
                    name: seriesName,
                    type: "map",
                    geoIndex: 0,
                    data: dataData
                }]
            });
        }
    }
}
</script>


<style lang="less">
    
</style>