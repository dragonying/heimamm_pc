<template>
  <el-container class="index-container" v-loading.fullscreen.lock="false">
    <el-container>
      <div class="header">
        <el-header>
          <el-menu
            :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            active-text-color="#1493fa"
            router
          >
            <el-menu-item>标题</el-menu-item>
            <el-menu-item index="/home/main">首页</el-menu-item>
            <el-menu-item index="2">发现</el-menu-item>
            <el-menu-item index="3">我的</el-menu-item>
            <el-menu-item class="three">{{ time }}</el-menu-item>
            <el-menu-item class="three">天气</el-menu-item>
            <el-menu-item class="three"></el-menu-item>
            <el-menu-item index="9">
              <span class="icon iconfont">&#xeafe;</span>
              <span slot="title">搜索</span>
            </el-menu-item>
            <el-menu-item index="6">
              <span class="icon iconfont">&#xe8c3;</span>
              <span slot="title">帮助</span>
            </el-menu-item>
            <el-menu-item index="7">
              <span class="icon iconfont">&#xe62e;</span>
              <span slot="title">换肤</span>
            </el-menu-item>
            <el-menu-item index="8">
              <span class="icon iconfont">&#xe605;</span>
            </el-menu-item>
          </el-menu>
        </el-header>
      </div>
      <el-main>
        <div class="content">
          <router-view></router-view>
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>
<script>
import { getCurrentTime } from "@/utils/tool";
export default {
  name: "home",
  data() {
    return {
      time: "",
    };
  },
  created() {
    setInterval(() => {
      this.time = getCurrentTime();
    }, 1000);
  },
};
</script>
<style lang="less">
.index-container {
  background: url("https://img.bidianer.com/skin/007.jpg") no-repeat 0 0 / cover;
  height: 100%;
  .header{
      background-color: #fff;
  }
  .el-header {
    width: 1130px;
    margin: 0 auto;
    padding: 0;
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }
    .el-menu {
      display: flex;
      justify-content: space-between;
    }
    .el-menu-item{
        flex: 1;
        &.three{
            flex: 3;
        }
    }
  }
  .iconfont {
    margin-right: 5px;
  }

  .content {
    width: 1130px;
    margin: 0 auto;
  }
}
</style>