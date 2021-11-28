<template>
  <el-card class="webnav">
    <div class="bar">
      <div class="left">
        <div
          v-for="(item, index) in category"
          :key="index"
          class="bar-item"
          :class="selectedIndex == index && 'active'"
          :style="{
            'background-color': selectedIndex == index ? item.color : '#fff',
          }"
          @click="selectIndex(index)"
        >
          <span class="dot" :style="{ 'background-color': item.color }"></span>
          {{ item.title }}
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
      <div class="right">
        <el-tooltip
          class="item"
          effect="dark"
          content="打开网址排序"
          placement="top"
        >
          <i v-if="isLockSort" class="el-icon-lock" @click="sortLock"
            >锁定排序</i
          >
          <i v-else class="el-icon-unlock" @click="sortLock">排序</i>
        </el-tooltip>
        <el-dropdown trigger="click">
          <i class="el-icon-plus"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-paperclip"
              >添加网址</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-folder">添加分类</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click">
          <i class="el-icon-more-outline"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-folder">分类管理</el-dropdown-item>
            <el-dropdown-item icon="el-icon-sort">分类排序</el-dropdown-item>
            <el-dropdown-item icon="el-icon-share">分享</el-dropdown-item>
            <el-dropdown-item icon="el-icon-sort">网址排序</el-dropdown-item>
            <el-dropdown-item icon="el-icon-brush">批处理</el-dropdown-item>
            <el-dropdown-item icon="el-icon-edit">字体格式</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <lockTip center />
      <div class="content-box">
        <!--使用draggable组件 v-model绑定数组-->
        <draggable
          v-model="content"
          chosenClass="chosen-item"
          forceFallback="true"
          :disabled="!isLockSort"
          group="site"
          animation="600"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group class="content">
            <webItem
              v-for="(item, index) in content"
              :key="index"
              :item="item"
            />
          </transition-group>
        </draggable>
      </div>
    </div>
  </el-card>
</template>
<script>
import draggable from "vuedraggable";
import lockTip from "@/views/components/lockTip";
import webItem from "@/views/components/webItem";
import store from "@/store";
import { mapState } from "vuex";

export default {
  name: "webnav",
  components: {
    draggable,
    lockTip,
    webItem,
  },
  data() {
    return {
      selectedIndex: 0, //选中的分类
      category: [
        {
          title: "我的常用网址",
          val: "usually",
          color: "#589bff",
        },
        {
          title: "购物旅游",
          val: "shop",
          color: "#72cc57",
        },
        {
          title: "音乐视频",
          val: "usually",
          color: "#ff922b",
        },
        {
          title: "新闻资讯",
          val: "usually",
          color: "#d28ae3",
        },
        {
          title: "生活必备",
          val: "usually",
          color: "#22b8cf",
        },
      ],
      content: [
        {
          title: "百度",
          val: "baidu",
        },
        {
          title: "视频",
          val: "video",
        },
        {
          title: "音乐",
          val: "music",
        },
        {
          title: "图片",
          val: "image",
        },
        {
          title: "地图",
          val: "map",
        },
        {
          title: "翻译",
          val: "translation",
        },
        {
          title: "微博",
          val: "weibo",
        },
        {
          title: "知乎",
          val: "zhihu",
        },
        {
          title: "淘宝",
          val: "taobao",
        },
        {
          title: "京东",
          val: "jindong",
        },
        {
          title: "优惠券",
          val: "coupon",
        },
        {
          title: "菜谱",
          val: "caipu",
        },
        {
          title: "图标",
          val: "icon",
        },
        {
          title: "字体",
          val: "font",
        },
        {
          title: "表情",
          val: "emoji",
        },
        {
          title: "贴吧",
          val: "cube",
        },
        {
          title: "学术",
          val: "know",
        },
        {
          title: "微信",
          val: "wechat",
        },
        {
          title: "知道",
          val: "ok",
        },
        {
          title: "书阴影",
          val: "coupon",
        },
      ],
    };
  },
  created() {},
  computed: {
    ...mapState(["isLockSort"]),
  },
  methods: {
    selectIndex(index) {
      this.selectedIndex = index;
      console.log(index);
    },
    sortLock() {
      store.commit("setLockSort");
    },
    //开始拖拽事件
    onStart() {},
    //拖拽结束事件
    onEnd() {
      console.log(this.content);
      this.$message({
        message: "排序已自动保存",
        type: "success",
      });
    },
  },
};
</script>
<style lang="less">
.webnav {
  .bar {
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    color: #6b7386;

    .left {
      display: flex;
      .dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: #fff;
        margin-right: 5px;
      }
      .bar-item {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        padding: 3px 10px;
        border-radius: 14px;
        transition: background-color 0.3s, color 0.3s;

        &.active {
          color: #fff;
        }
        i {
          margin-left: 3px;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      i {
        margin-left: 20px;
        border-radius: 14px;
        padding: 5px;
        border: 2px solid #f0f0f0;
        cursor: pointer;
        &:hover {
          background: #0084ff;
          color: #fff;
        }
      }
    }
  }

  .content-box {
    .chosen-item {
      background-color: #fffced;
      border: 2px dashed #72cc57 !important;
    }
    .content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      // .content-item {
      //   width: 13%;
      //   padding: 10px 5px;
      //   display: flex;
      //   align-items: center;
      //   margin: 15px 15px 0 15px;
      //   border: 1px solid transparent;
      //   position: relative;
      //   cursor: pointer;
      //   border-radius: 5px;

      //   img {
      //     width: 24px;
      //     height: 24px;
      //     margin-right: 8px;
      //     transition: all 0.4s;
      //   }
      //   .setting {
      //     position: absolute;
      //     right: 10px;
      //     bottom: 5px;
      //     display: none;
      //     color: #6b7386;
      //   }

      //   &:hover {
      //     border-color: #eee;
      //     box-shadow: rgba(0, 0, 0, 0.17) 0px 5px 15px;
      //     img {
      //       transform: translateX(3px);
      //     }
      //     .setting {
      //       display: block;
      //     }
      //   }
      // }
    }
  }
}
.del {
  color: red;
}
</style>