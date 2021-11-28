<template>
  <div class="category">
    <div class="l">
      <el-card>
        <div class="tree-item un-cate">
          <div class="name">
            <img
              class="cate-img"
              src="https://img.bidianer.com/image/bookmark-default-icon-yellow.svg"
            />
            <span class="title">未分类</span>
          </div>
          <span class="num">1</span>
        </div>
        <div class="search">
          <el-input placeholder="搜索分类" prefix-icon="el-icon-search">
          </el-input>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
          ></el-button>
        </div>
        <el-tree
          :data="cateNode"
          :expand-on-click-node="false"
          node-key="id"
          highlight-current
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
        >
          <div slot-scope="{ node }" class="tree-item">
            <div class="name">
              <img
                class="cate-img"
                src="https://img.bidianer.com/image/bookmark-default-icon-yellow.svg"
              />
              <span class="title">{{ node.label }}</span>
            </div>
            <span class="num">1</span>
          </div>
        </el-tree>
      </el-card>
    </div>
    <div class="r">
      <el-card>
        <div class="search-box">
          <el-input
            placeholder="搜索分类"
            prefix-icon="el-icon-search"
            @focus="isFocus = true"
            @blur="isFocus = false"
          >
          </el-input>
          <el-button size="mini" type="text" :class="isFocus && 'ipt-focus'"
            >搜索全部</el-button
          >
          <el-button size="mini" icon="el-icon-share" circle></el-button>
          <el-button size="mini" type="primary" icon="el-icon-plus"
            >添加网址</el-button
          >
        </div>
      </el-card>
      <el-card>
        <div class="web-content">
          <div class="web-head" v-show="allOperator">
            <div>
              <el-checkbox></el-checkbox>
              <el-button size="mini" type="primary">批量移动</el-button>
              <el-button size="mini" type="primary">批量复制</el-button>
              <el-button size="mini" type="primary">批量删除</el-button>
            </div>
            <el-link icon="el-icon-edit" @click="allOperator=false" :underline="false">关闭批量操作</el-link>
          </div>
          <div class="web-head" v-show="!allOperator">
            <div class="cate-name">
              <img
                class="cate-img"
                src="https://img.bidianer.com/image/bookmark-default-icon-yellow.svg"
              />
              <span>777</span>
            </div>
            <div class="filer">
              <el-link icon="el-icon-edit" :underline="false" @click="allOperator=true">批量操作</el-link>
              <el-link :underline="false"
                >最近添加<i class="el-icon-d-caret"></i
              ></el-link>
            </div>
          </div>
          <div class="web-list">
            <div class="web-item" v-for="i in 10" :key="i">
              <el-checkbox v-show="allOperator"></el-checkbox>
              <div class="info">
                <div class="lb">
                  <div class="t">
                    <img
                      class="cate-img"
                      src="https://img.bidianer.com/image/bookmark-default-icon-yellow.svg"
                    />
                    <span class="title">新浪</span>
                  </div>
                  <i class="el-icon-more" v-show="!allOperator"></i>
                </div>
                <div class="rb">
                  <span>www.sina.com</span>
                  <span>四分钟前</span>
                  <span>1点击</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "category",
  data() {
    return {
      allOperator: false, //批量操作
      isFocus: false, //是否聚焦
      cateNode: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
              children: [
                {
                  id: 11,
                  label: "三级 3-2-1",
                },
                {
                  id: 12,
                  label: "三级 3-2-2",
                },
                {
                  id: 13,
                  label: "三级 3-2-3",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    handleDragStart(node, ev) {
      console.log("drag start", node);
      console.log(ev);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log(draggingNode);
      console.log(ev);
      console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log(draggingNode);
      console.log(ev);
      console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log(draggingNode);
      console.log(ev);
      console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log(draggingNode);
      console.log(ev);
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log(draggingNode);
      console.log(ev);
      console.log("tree drop: ", dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      console.log(draggingNode);
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },
  },
};
</script>
<style lang="less">
.category {
  display: flex;
  .cate-img {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }
  .l {
    flex: 5;
    margin-right: 10px;
    font-size: 15px;
    .search {
      margin: 10px auto;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      .el-button {
        margin-left: 5px;
        font-weight: bold;
      }
    }
    .el-card__body {
      padding: 10px 0px;
      .el-tree-node__content {
        height: 38px;
      }
      .is-current {
        & > .el-tree-node__content {
          border-left: 2px solid #0084ff;
          .name {
            color: #0084ff;
          }
        }
      }
    }
    .un-cate.tree-item {
      padding-left: 35px;
      height: 35px;
      line-height: 35px;
    }

    .tree-item {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0 10px;
      color: #6b7386;

      .name {
        display: flex;
        align-items: center;
      }

      .num {
        color: #cccfd7;
      }
    }
  }
  .r {
    flex: 11;
    .el-card:nth-child(1) {
      margin-bottom: 5px;
    }
    .search-box {
      width: 100%;
      display: flex;
      align-items: center;
      overflow: hidden;
      & > * {
        font-size: 12px;
      }
      .el-input {
        .el-input__inner,
        .el-input__icon {
          height: 32px;
          line-height: 32px;
        }
      }
      .el-button {
        &.el-button--text {
          margin-right: 50px;
          margin-left: 10px;
          transition: all 0.4s;
          &.ipt-focus {
            margin-right: -300px;
          }
        }
      }
    }
    .web-content {
      .el-checkbox {
        width: 33px;
        .el-checkbox__inner {
          width: 18px;
          height: 18px;
        }
      }
      .web-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;

        .cate-img {
          vertical-align: bottom;
        }
        .el-link {
          margin-left: 20px;
        }
      }
    }
    .web-list {
      padding-top: 10px;
      .web-item {
        display: flex;
        padding: 12px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);

        .info {
          flex: 1;
        }

        .lb {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
          font-size: 16px;
          .t {
            display: flex;
            align-items: center;
          }
          i {
            color: #a1a7b7;
          }
        }
        .rb {
          margin-left: 25px;
          font-size: 13px;
          color: #a1a7b7;
          & > * {
            margin-right: 40px;
          }
        }
      }
    }
  }
}
</style>