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
        <li class="pure">
          <div class="dt">
            <span>{{ dataStatic.followerDataLength }}条</span>
            <span>{{ dataStatic.followerDataSize | formatFileSize }}</span>
          </div>
          <p class="title">粉丝数据</p>
        </li>
        <li class="pure">
          <div class="dt">
            <span>{{ dataStatic.followingDataLength }}条</span>
            <span>{{ dataStatic.followingDataSize | formatFileSize }}</span>
          </div>
          <p class="title">关注数据</p>
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
            <el-tag :color="color()">{{ group.name }}</el-tag>
            <div class="st">
              <p>总数：{{ group.length }}条</p>
              <p>大小：{{ group.size | formatFileSize }}</p>
            </div>
          </div>

        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'


export default {
  name: 'chart',
  components: {
  },
  data() {
    return {}
  },
  methods: {
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
  }
}
</script>

<style lang="less">
.chart-container {
  .dt {
    cursor: pointer;
  }

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

      &.pure {

        color: #5128a3;

        .dt {
          border-color: #5128a3;
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

