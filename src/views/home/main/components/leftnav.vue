<template>
  <div class="left-nav">
    <el-card>
      <div class="bar">
        <div class="bar-item">
          <span @click="setComp('usual')" :class="comp == 'usual' && 'active'">
            <i class="el-icon-star-on"></i>常用
          </span>
          <span
            @click="setComp('category')"
            :class="comp == 'category' && 'active'"
          >
            <i class="el-icon-folder"></i>更多分类
          </span>
          <el-tooltip effect="dark" placement="top">
            <div slot="content" class="cate-tip">
              <i class="el-icon-magic-stick"></i>
              更多分类可以放什么？常用区域分类有数量限制。放不下的分类或不想放在首页的分类可以放入到更多分类中。
            </div>
            <span><i class="el-icon-question"></i></span>
          </el-tooltip>
        </div>
        <div class="bar-item">
          <span @click="setComp('life')" :class="comp == 'life' && 'active'">
            <i class="el-icon-hot-water"></i>生活</span
          >
          <span
            @click="setComp('leisure')"
            :class="comp == 'leisure' && 'active'"
            ><i class="el-icon-picture-outline-round"></i>休闲</span
          >
          <span @click="setComp('tool')" :class="comp == 'tool' && 'active'"
            ><i class="el-icon-suitcase"></i>工具</span
          >
          <span @click="setComp('news')" :class="comp == 'news' && 'active'"
            ><i class="el-icon-document"></i>新闻</span
          >
        </div>
      </div>
    </el-card>
      <component :is="comp"></component>
  </div>
</template>
<script>
import usual from "./usual";
import category from "./category";
import life from "./life";
import leisure from "./leisure";
import tool from "./tool";
import news from "./news";

export default {
  name: "left-nav",
  components: {
    usual,
    category,
    life,
    leisure,
    tool,
    news,
  },
  data() {
    return {
      comp: "usual",
    };
  },
  methods: {
    setComp(comp) {
      this.comp = comp;
    },
  },
};
</script>
<style lang="less">
.left-nav {
  .bar {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    color: #a1a7b7;
    .bar-item {
      i {
        margin-right: 5px;
        font-size: 16px;
      }
      span {
        cursor: pointer;
        border-bottom: 2px solid transparent;
        padding-bottom: 10px;
        &:hover {
          color: #666;
          font-weight: 700;
        }
        &.active {
          color: #666;
          font-weight: 700;
          border-bottom-color: #0084ff;
        }
      }
      &:nth-child(1) span {
        margin-right: 20px;
        &:nth-child(2) {
          margin-right: 10px;
        }
      }
      &:nth-child(2) span {
        margin-left: 20px;
      }
    }
  }
}
.cate-tip {
  font-size: 14px;
  width: 210px;
  letter-spacing: 1px;
}
</style>