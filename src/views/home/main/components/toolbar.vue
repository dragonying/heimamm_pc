<template>
    <el-card>
      <div class="toolbar">
        <el-row>
          <el-col :span="mainNavSpan" class="nav">
            <div
              v-for="(item, index) in mainNavData"
              :key="index"
              class="nav-item"
              :class="selectedIndex == index && 'active'"
              @click="selectMainNav(index)"
            >
              <img
                src="https://img.bidianer.com/engine/202102/22/603373e942becWfFQhkmaxn8i0srY.svg"
              />
              {{ item.title }}
            </div>
          </el-col>
          <el-col :span="levelNavSpan" class="other">
            <el-popover placement="bottom" trigger="click" width="350">
              <div class="nav nav-prove">
                <div
                  v-for="(item, index) in levelNavData"
                  :key="index"
                  class="nav-item"
                  :class="levelSelectedIndex == index && 'active'"
                  @click="selectLevelNav(index)"
                >
                  <img
                    src="https://img.bidianer.com/engine/202102/22/603373e942becWfFQhkmaxn8i0srY.svg"
                  />
                  {{ item.title }}
                </div>

                <el-button size="small" round icon="el-icon-setting"
                  >自定义搜索</el-button
                >
              </div>

              <div slot="reference">更多<i class="el-icon-arrow-down"></i></div>
            </el-popover>
            <i class="el-icon-s-tools"></i>
          </el-col>
        </el-row>
      </div>
      <div class="search">
        <el-input placeholder="请输入内容" clearable >
          <template slot="prepend"><img src="https://img.bidianer.com/engine/201904/14/5cb34ca75d587y5HCF01hkaYdV7cV.svg"/></template>
          <template slot="append"><div  class="search-btn">搜索</div></template>
        </el-input>
      </div>
    </el-card>
</template>
<script>
export default {
  name: "toolbar",
  data() {
    return {
      splitLength: 11,
      selectedIndex: 0,
      levelSelectedIndex: 999,
      mainNavData: [],
      levelNavData: [],
      navData: [
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
  created() {
    this.mainNavData = this.navData.slice(0, this.splitLength);
    this.levelNavData = this.navData.slice(this.splitLength);
  },
  computed: {
    mainNavSpan() {
      return this.mainNavData.length > this.splitLength ? 22 : 20;
    },
    levelNavSpan() {
      return this.mainNavData.length > this.splitLength ? 2 : 4;
    },
  },
  methods: {
    selectMainNav(index) {
      this.selectedIndex = index;
    },
    selectLevelNav(index) {
      let item = this.levelNavData[index];
      if (this.mainNavData.length > this.splitLength) {
        this.mainNavData.splice(this.splitLength, 1, item);
      } else {
        this.mainNavData.push(item);
      }
      this.selectedIndex = this.splitLength;
      this.levelSelectedIndex = index;
    },
  },
};
</script>
<style lang="less">
.nav {
  display: flex;
  flex-wrap: wrap;

  .nav-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-right: 18px;
    text-align: center;
    height: 26px;
    line-height: 26px;
    padding: 2px 5px;
    border-radius: 20px;
    cursor: pointer;
    // transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #cce6ff;
      color: #0084ff;
    }

    &.active {
      background-color: #0084ff;
      color: #fff;
    }
    img {
      background-color: #fff;
      margin-right: 3px;
      padding: 2px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }

  &.nav-prove {
    .nav-item {
      margin: 5px 20px;
    }
    .el-button {
      margin: 5px auto;
      color: #a1a7b7;
      font-size: 12px;
      padding: 5px 8px;
      &:hover {
        color: #0084ff;
        background-color: #fff;
      }
    }
  }
}

.other {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding: 4px;
  color: #a3a5ab;
  & > *:hover {
    cursor: pointer;
    color: #0084ff;
  }
}
.search {
  padding-top: 10px;
  img{
      width: 24px;
      height: 24px;
  }
  .search-btn{
      width: 80px;
      text-align: center;
      cursor: pointer;
  }
}
</style>