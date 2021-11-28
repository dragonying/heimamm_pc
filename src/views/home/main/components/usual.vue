<template>
  <div class="usual">
    <el-card>
      <lockTip />
      <!--使用draggable组件 v-model绑定数组-->
      <draggable
        v-model="listData"
        :disabled="!isLockSort"
        chosenClass="chosen-box"
        forceFallback="true"
        group="site"
        animation="600"
        @start="onStart"
        @end="onEnd"
      >
        <transition-group class="content">
          <div class="item" v-for="(item, index) in listData" :key="index">
            <div class="l" :class="isLockSort && 'move'">
              <i class="tg" :class="item.icon"></i>
              <span class="title">{{ item.title }}</span>
              <i class="el-icon-plus add"></i>
              <span class="more">
                <el-dropdown trigger="click" placement="bottom">
                  <i class="el-icon-more"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-paperclip"
                      >复制链接</el-dropdown-item
                    >
                    <el-dropdown-item icon="el-icon-edit"
                      >编辑</el-dropdown-item
                    >
                    <el-dropdown-item icon="el-icon-right"
                      >移动到...</el-dropdown-item
                    >
                    <el-dropdown-item icon="el-icon-document-copy"
                      >复制到...</el-dropdown-item
                    >

                    <el-dropdown-item icon="el-icon-sort"
                      >排序</el-dropdown-item
                    >
                    <el-dropdown-item icon="el-icon-brush"
                      >批处理</el-dropdown-item
                    >

                    <el-dropdown-item icon="el-icon-plus"
                      >添加子网址</el-dropdown-item
                    >
                    <el-dropdown-item icon="el-icon-delete" class="del"
                      >删除</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </div>
            <div class="r">
              <!--使用draggable组件 v-model绑定数组-->
              <draggable
                v-model="item.list"
                chosenClass="chosen-item"
                forceFallback="true"
                :disabled="!isLockSort"
                group="web"
                animation="600"
                @start="onStart"
                @end="onEnd"
              >
                <transition-group class="content">
                  <webItem
                    v-for="(val, vk) in item.list"
                    :key="vk"
                    :item="val"
                  />
                </transition-group>
              </draggable>
            </div>
          </div>
        </transition-group>
      </draggable>
    </el-card>
    <div class="bottom">
      <el-button size="medium" icon="el-icon-folder" round>添加分类</el-button>
      <el-button size="medium" icon="el-icon-paperclip" round>添加网址</el-button>
      <el-button size="medium" icon="el-icon-sort" round>排序</el-button>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import lockTip from "@/views/components/lockTip";
import webItem from "@/views/components/webItem";
import { mapState } from "vuex";

export default {
  name: "usual",
  components: {
    draggable,
    lockTip,
    webItem,
  },
  data() {
    return {
      listData: [
        {
          type: "shop",
          title: "购物",
          icon: "el-icon-guide",
          list: [
            {
              title: "购物旅游",
              val: "shop",
            },
            {
              title: "购物旅游",
              val: "shop",
            },
            {
              title: "购物旅游",
              val: "shop",
            },
            {
              title: "购物旅游",
              val: "shop",
            },
            {
              title: "购物旅游",
              val: "shop",
            },
            {
              title: "购物旅游",
              val: "shop",
            },
          ],
        },
        {
          type: "shop",
          title: "购物",
          icon: "el-icon-guide",
          list: [
            {
              title: "购物旅游",
              val: "shop",
            },
          ],
        },
        {
          type: "shop",
          title: "购8物",
          icon: "el-icon-guide",
          list: [
            {
              title: "购游",
              val: "shop",
            },
          ],
        },
      ],
    };
  },
  methods: {
    //开始拖拽事件
    onStart() {},
    //拖拽结束事件
    onEnd() {
      console.log(this.listData);
      this.$message({
        message: "排序已自动保存",
        type: "success",
      });
    },
  },
  computed: {
    ...mapState(["isLockSort"]),
  },
};
</script>
<style lang="less">
.usual {
  .chosen-box {
    background-color: #fffced;
    border-color: #0084ff !important;
  }
  .chosen-item {
    background-color: #fffced;
    border-color: #72cc57 !important;
  }

  .item {
    display: flex;
    border: 2px dashed transparent;

    .add,
    .more {
      position: absolute;
      font-size: 14px;
      right: -11px;
      top: 5px;
      padding: 3px;
      border: 1px solid #eee;
      border-radius: 50%;
      background-color: #fff;
      cursor: pointer;
    }
    .more {
      top: 40px;
      display: none;
    }
    &:hover {
      .l.move {
        cursor: move;
      }
      .more {
        display: block;
      }
      .tg,
      .title {
        color: #0084ff !important;
      }
    }
    .l {
      position: relative;
      flex: 4;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      border-right: 1px solid rgba(0, 0, 0, 0.05);
      color: #6b7386;
      padding: 20px;

      .tg {
        font-size: 35px;
        color: #ddd;
        margin-bottom: 5px;
      }
      .title {
        font-size: 13px;
      }
    }
    .r {
      padding: 10px 20px;
      flex: 37;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }

    .content {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  }
  .bottom {
    display: flex;
    justify-content: center;
    .el-button {
      margin: 10px;
    }
  }
}
</style>