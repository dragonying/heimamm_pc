<template>
  <div class="content-item">
    <img
      src="https://img.bidianer.com/engine/202102/22/603373e942becWfFQhkmaxn8i0srY.svg"
    />
    {{ item.title }}
    <span class="setting">
      <el-dropdown trigger="click" placement="bottom">
        <i class="el-icon-more"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-paperclip">复制链接</el-dropdown-item>
          <el-dropdown-item icon="el-icon-edit">编辑</el-dropdown-item>
          <el-dropdown-item icon="el-icon-right">移动到...</el-dropdown-item>
          <el-dropdown-item icon="el-icon-document-copy"
            >复制到...</el-dropdown-item
          >

          <el-dropdown-item icon="el-icon-sort">排序</el-dropdown-item>
          <el-dropdown-item icon="el-icon-brush">批处理</el-dropdown-item>

          <el-dropdown-item icon="el-icon-plus">添加子网址</el-dropdown-item>
          <el-dropdown-item icon="el-icon-delete" class="del"
            >删除</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </span>
  </div>
</template>
<script>
export default {
  name: "webItem",
  props: {
    item: {
      type: Object,
      require: true,
    },
  },
};
</script>
<style lang="less">
.content-item {
  width: 155px;
  padding: 10px;
  display: flex;
  align-items: center;
  margin: 10px 0 0;
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
</style>