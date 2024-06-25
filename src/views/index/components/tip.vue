<template>
    <el-tooltip :content="content" placement="top">
        <i class="el-icon-question"></i>
    </el-tooltip>
</template>
<script>
export default {
    name: 'tip',
    props: ["content"]
}
</script>
<style lang="less" scoped>
.el-icon-question {
    font-size: 20px;
    margin-left: 10px;
    cursor: pointer;
    color: #dd1616bf;
}
</style>