<template>
    <div class='top page-component__scroll'>
        <el-backtop target=".page-component__scroll"></el-backtop>
        <!-- 该插槽用来填充所有的页面-->
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:'BarkTop',
}
</script>

<style lang="less">
    // 必须撑满整个屏幕
    .top{
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        overflow-x:hidden;
    }
</style>