<template>
  <div class="chart-container">
    <el-card class="box-card" header="资源概况">
      <ul class="chart-data">
        <li class="blue">
          <div class="dt">{{ dataStatic.spiderDataSize | formatFileSize }}</div>
          <p class="title">采集数据</p>
        </li>
        <li class="red">
          <div class="dt">
            <span>{{ dataStatic.userDataLength }}条</span>
            <span>{{ dataStatic.userDataSize | formatFileSize }}</span>
          </div>
          <p class="title">用户数据</p>
        </li>
        <li class="red">
          <div class="dt">
            <span>{{ dataStatic.awemeDataLength }}条</span>
            <span>{{ dataStatic.awemeDataSize | formatFileSize }}</span>
          </div>
          <p class="title">作品数据</p>
        </li>
        <li class="red">
          <div class="dt">
            <span>{{ dataStatic.commentDataLength }}条</span>
            <span>{{ dataStatic.commentDataSize | formatFileSize }}</span>
          </div>
          <p class="title">评论数据</p>
        </li>
        <li class="green">
          <div class="dt">
            <span>{{ dataStatic.downDataLength }}条</span>
            <span>{{ dataStatic.downLoadDataSize | formatFileSize }}</span>
          </div>
          <p class="title">下载数据</p>
        </li>
      </ul>
    </el-card>
    <el-card class="box-card" header="分组信息">
      <div class="group-data">
        <div class="left">
          <div class="dt">{{ dataStatic.groupDataSize | formatFileSize }}</div>
          <p class="title">分组数据</p>
        </div>
        <div class="right">
          <div class="tags" v-for="(group, index) in dataStatic.groups" :key="index">
            <el-tag  :color="color()">{{ group.name }}</el-tag>
            <div class="st">
              <p>总数：{{ group.length }}条</p>
              <p>大小：{{ group.size | formatFileSize }}</p>
            </div>
          </div>

        </div>
      </div>
    </el-card>
    <!--年度月数据统计-->
    <el-card class="box-card chart-box">
      <yearMonth :yearMonthData="yearMonthData"></yearMonth>
    </el-card>

    <!--饼状图统计-->
    <el-card class="box-card chart-box">
      <div class="chart" ref="redchart"></div>
      <div class="chart" ref="rolechart"></div>
    </el-card>
    <!--日统计数据-->
    <el-card class="box-card chart-box">
      <dateTable :tableData="dateData"></dateTable>
    </el-card>
    <!--用户地区分布图-->
    <el-card class="box-card chart-box">
      <chartMap :chartData="mapData"></chartMap>
    </el-card>
  </div>
</template>
<script>
import echarts from 'echarts'
import { mapState } from 'vuex'

import {
  getTitleData,
  getredStatistics,
  getRoleStatistics,
  getProvince,
  getUserDateData,
  getUserYearMonthData
} from '@/api/chartView'
import chartMap from '@/components/charts/map'
import dateTable from '@/components/charts/table'
import yearMonth from '@/components/charts/yearMonth'

export default {
  name: 'chart',
  components: {
    chartMap,
    dateTable,
    yearMonth
  },
  data() {
    return {
      titleData: {
        total_done_reds: 0, //刷题总数
        personal_reds: 0, //人均刷题总数
        total_users: 0, //用户总数
        increment_users: 0, //今日增长用户数量
        increment_reds: 0, //今日增加题数
        total_reds: 0 //题总数
      },
      mapData: {}, //地图分布数据
      dateData: [], //日统计数据
      yearMonthData: [] //年度月数据统计
    }
  },
  methods: {
    createPieCharts(target, res) {
      let title = res.title
      let seriesName = res.seriesName
      let dataData = res.data
      let legendData = dataData.map(r => r.name)
      echarts.init(target).setOption({
        title: {
          text: title,
          left: 'center',
          textStyle: {
            fontSize: 24,
            fontWeight: 'normal',
            color: '#666666'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        //生成指定数量的颜色选项
        color: (function () {
          let numArr = [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            'a',
            'b',
            'c',
            'd',
            'e',
            'f'
          ]
          let colorArr = []
          legendData.forEach(() => {
            let s = '#'
            for (let i = 0; i < 6; i++) {
              s += new String(numArr[Math.floor(Math.random() * numArr.length)])
            }
            colorArr.push(s)
          })
          return colorArr
        })(),
        legend: {
          orient: 'vertical',
          right: 10,
          data: legendData
        },
        series: [
          {
            name: seriesName,
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
      })
    },
    createPieNewCharts(target, res) {
      let title = res.title
      let seriesName = res.seriesName
      let dataData = res.data
      let legendData = dataData.map(r => r.name)
      echarts.init(target).setOption({
        title: {
          text: title,
          left: 'left',
          textStyle: {
            fontSize: 24,
            fontWeight: 'normal',
            color: '#666666'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        //生成指定数量的颜色选项
        color: (function () {
          let numArr = [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            'a',
            'b',
            'c',
            'd',
            'e',
            'f'
          ]
          let colorArr = []
          legendData.forEach(() => {
            let s = '#'
            for (let i = 0; i < 6; i++) {
              s += new String(numArr[Math.floor(Math.random() * numArr.length)])
            }
            colorArr.push(s)
          })
          return colorArr
        })(),
        legend: {
          left: 'center',
          bottom: '20px',
          data: legendData
        },
        series: [
          {
            name: seriesName,
            type: 'pie',
            radius: [0, '30%'],
            center: ['50%', '50%'],
            roseType: 'area',
            data: dataData
          }
        ]
      })
    }
  },
  computed: {
    ...mapState({
      dataStatic: state => state.dataStatic
    }),
    color() {
      return () => '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
  },
  mounted() {
    this.$store.dispatch('dataStatic');
    getTitleData(res => {
      this.titleData = res
    })
    getredStatistics(res => {
      this.createPieNewCharts(this.$refs.redchart, res)
    })
    getRoleStatistics(res => {
      this.createPieCharts(this.$refs.rolechart, res)
    })
    getProvince(res => {
      this.mapData = res
    })
    getUserDateData(res => {
      this.dateData = res
    })
    getUserYearMonthData(res => {
      this.yearMonthData = res
    })
  }
}
</script>

<style lang="less">
.chart-container {
  .group-data {
    display: flex;
    align-items: center;

    .right {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      margin-left: 10px;

      .tags {
        margin: 5px;
        padding: 5px;
        border: 2px solid #4933ef;
        border-radius: 5px;

        .el-tag {
          color: #fff;
        }

        .st {
          font-size: 14px;

          &>* {
            margin-right: 5px;
          }
        }
      }
    }

    .left {
      .dt {
        width: 100px;
        height: 100px;
        font-size: 16px;
        border-radius: 50%;
        border: 2px solid #4933ef;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #4933ef;
      }

      .title {
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        letter-spacing: 0px;
        color: #4933ef;
      }

      &>* {
        margin-bottom: 2px;
      }
    }
  }

  .chart-data {
    display: flex;
    justify-content: space-around;
    align-items: center;

    li {
      &.blue {

        color: #0086fa;

        .dt {
          border-color: #0086fa;
        }
      }

      &.red {
        .dt {
          border-color: #f76137;
        }

        color: #f76137;
      }

      &.green {
        .dt {
          border-color: #55cd78;
        }

        color: #55cd78;
      }

      &.pure {
        .dt {
          border-color: #4933ef;
        }

        color: #4933ef;
      }

      .dt {
        width: 120px;
        height: 120px;
        font-size: 16px;
        border-radius: 50%;
        border: 2px solid #f76137;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &>* {
          margin-bottom: 2px;
        }
      }
    }


    .title {
      font-size: 16px;
      font-weight: 400;
      text-align: center;
      letter-spacing: 0px;
    }
  }

  .chart-box {
    margin-top: 13px;

    .el-card__body {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;

      .chart {
        height: 570px;
        flex: 1;
      }
    }
  }

  .box-card {
    margin-bottom: 10px;
  }
}
</style>
