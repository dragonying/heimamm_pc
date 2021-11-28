<template>
  <div class="tip" :class="center && 'center'" v-show="isLockSort">
    <i class="el-icon-check"></i>
    [已打开排序]
    1、拖动网址即可排序；2、常用网址和导航区域网址可以互拖；3、支持跨分类拖动网址
    <span class="closeSort" @click="closeSort">关闭并锁定排序</span>
  </div>
</template>
<script>
import { mapState } from "vuex";
import store from "@/store";

export default {
  name: "lockTip",
  props: {
    center: {
      type: Boolean,
    },
  },
  computed: {
    ...mapState(["isLockSort"]),
  },
  methods: {
    closeSort() {
      store.commit("setLockSort");
    },
  },
};
</script>
<style lang="less" scoped>
.tip {
  font-size: 13px;
  background-color: #f0f9eb;
  padding: 7px 15px;
  color: #67c23a;
  text-align: left;
  position: relative;
  margin: 10px 0;
  &.center {
    text-align: center;
  }
  i {
    border-radius: 50%;
    padding: 1px;
    color: #fff;
    background-color: #67c23a;
    margin-right: 5px;
  }

  .closeSort {
    position: absolute;
    right: 15px;
    color: rgb(160, 153, 153);
    cursor: pointer;
  }
}
</style>