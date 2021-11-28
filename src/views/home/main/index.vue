<template>
  <div class="main-page">
    <!-- 搜索导航 -->
    <toolbar />
    <!-- 网址导航 -->
    <webnav />

    <!-- 分类类 -->
    <div class="toolbox">
      <div class="tool-item">
        <leftnav />
      </div>
      <div class="tool-item">
      </div>
    </div>
  </div>
</template>
<script>
import toolbar from "./components/toolbar";
import webnav from "./components/webnav";
import leftnav from "./components/leftnav";

export default {
  name: "main-page",
  components: {
    toolbar,
    webnav,
    leftnav,
  },
  data() {},
};
</script>
<style lang="less" scoped>
.main-page {
  min-height: 100%;
}
/deep/ .el-card {
  margin-bottom: 10px;
  // padding: 10px;
  .el-card__body{
    padding: 10px;
  }
}
.toolbox {
  display: flex;
  .tool-item {
    &:nth-child(1) {
      flex: 8;
      margin-right: 10px;
    }
    &:nth-child(2) {
      flex: 3;
    }
  }
}
</style>