<template>
    <div class='chart-container'>
    <el-card class="box-card">
        <ul class='chart-data'>
            <li>
                <div class='dt user'>{{titleData.increment_users}}</div>
                <p class='title'>今日新增用户</p>
            </li>
             <li>
                <div class='dt user'>{{titleData.total_users}}</div>
                <p class='title'>总用户量</p>
            </li>
             <li>
                <div class='dt question'>{{titleData.increment_questions}}</div>
                <p class='title'>新增试题</p>
            </li>
             <li>
                <div class='dt question'>{{titleData.total_questions}}</div>
                <p class='title'>总试题量</p>
            </li>
             <li>
                <div class='dt check'>{{titleData.total_done_questions}}</div>
                <p class='title'>总刷题量</p>
            </li>
             <li>
                <div class='dt check'>{{titleData.personal_questions}}</div>
                <p class='title'>人均刷题量</p>
            </li>
        </ul>
    </el-card>
    <el-card class="box-card chart-box">
        <div class='chart' ref="chart">
        </div>
    </el-card>
    </div>
</template>
<script>
import echarts from 'echarts'
import {getTitleData,getQuestionStatistics} from '@/api/chartView'

export default {
    name:'chart',
    data(){
        return {
            titleData:{
                total_done_questions:0,//刷题总数
                personal_questions:0,//人均刷题总数
                total_users:0,//用户总数
                increment_users:0,//今日增长用户数量
                increment_questions:0,//今日增加题数
                total_questions:0,//题总数
            }
        }
    },
    methods:{
        createCharts(legendData=[],dataData=[]){
           echarts.init(this.$refs.chart).setOption({
                title:{
                    text:'整体数据',
                    textStyle:{
                        fontSize:24,
                        fontWeight:'normal',
                        color:'#666666'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                //生成指定数量的颜色选项
                color:(function () {
                    let numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
                    let colorArr = [];
                    legendData.forEach(()=>{
                        let s = '#'
                        for (let i = 0; i < 6; i++) {
                            s += new String(numArr[Math.floor(Math.random() * (numArr.length))]);
                        }
                        colorArr.push(s)
                    });
                    return colorArr;
                 }()),
                legend: {
                    orient: 'vertical',
                    right: 10,
                    data: legendData
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: dataData
                    }
                ]
            });
        },
    },
    mounted() {
        getTitleData(res=>{
            this.titleData = res;
        });
        getQuestionStatistics(res=>{
            this.createCharts(res.map(r=>r.name),res)
        });
    },
}
</script>

<style lang="less">
.chart-container{
    .chart-data{
        display:flex;
        justify-content: space-around;
        align-items: center;
        .dt{
            width: 99px;
            height: 99px;
            font-size: 35px;
            line-height: 99px;
            border-radius:50%;
            border: 2px solid #f76137;
            text-align:center;
            margin-bottom:10px;
            &.user{
                border-color:#0086fa;
                color:#0086fa;
            }
            &.question{
                border-color:#f76137;
                color:#f76137;
            }
            &.check{
                border-color:#55cd78;
                color:#55cd78;
            }

        }
        .title{
            font-size: 16px;
            font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
            font-weight: 400;
            text-align: center;
            color: #737373;
            letter-spacing: 0px;
        }
    }
    .chart-box{
        margin-top:13px;
        .chart{
             height:570px;
        }
    }
    
}
</style>