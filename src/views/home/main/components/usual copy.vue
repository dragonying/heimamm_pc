<template>
  <div class="usual">
    <div class="item" v-for="(item, index) in listData" :key="index">
      <div class="l">
        <i class="tg" :class="item.icon"></i>
        <span class="title">{{ item.title }}</span>
        <i class="el-icon-plus add"></i>
        <i class="el-icon-more more"></i>
      </div>
      <div class="r">
        <div class="content">
          <div
            class="content-item"
            v-for="(webItem, webIndex) in item.list"
            :key="webIndex"
          >
            <img
              src="https://img.bidianer.com/engine/202102/22/603373e942becWfFQhkmaxn8i0srY.svg"
            />
            {{ webItem.title }}
            <span class="setting">
              <el-dropdown trigger="click">
                <i class="el-icon-more"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-paperclip"
                    >复制链接</el-dropdown-item
                  >
                  <el-dropdown-item icon="el-icon-edit">编辑</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-right"
                    >移动到...</el-dropdown-item
                  >
                  <el-dropdown-item icon="el-icon-document-copy"
                    >复制到...</el-dropdown-item
                  >

                  <el-dropdown-item icon="el-icon-sort">排序</el-dropdown-item>
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "usual",
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
      ],
    };
  },
};
</script>
<style lang="less">
.usual {
  .item {
    display: flex;
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
    }
    .more {
      top: 40px;
      display: none;
    }
    &:hover {
      .l {
        cursor: move;
      }
      .more {
        display: block;
      }
    }
    .l {
      position: relative;
      flex: 4;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      border-right: 1px solid rgba(0, 0, 0, 0.08);
      color: #6b7386;
      padding: 20px;
      .tg {
        font-size: 40px;
        color: #ddd;
        margin-bottom: 5px;
      }
      .title {
        font-size: 13px;
      }
    }
    .r {
      padding: 10px;
      flex: 37;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }

    .content {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .content-item {
        width: 23%;
        display: flex;
        align-items: center;
        padding: 10px;
        margin: 0 5px 5px;
        border: 1px solid transparent;
        position: relative;
        cursor: pointer;
        border-radius: 5px;

        img {
          width: 24px;
          height: 24px;
          margin-right: 8px;
          transition: all 0.4s;
        }
        .setting {
          position: absolute;
          right: 10px;
          bottom: 5px;
          display: none;
          color: #6b7386;
        }

        &:hover {
          border-color: #eee;
          box-shadow: rgba(0, 0, 0, 0.17) 0px 5px 15px;
          img {
            transform: translateX(3px);
          }
          .setting {
            display: block;
          }
        }
      }
    }
  }
}
</style>