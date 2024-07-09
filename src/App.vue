<template>
<div class="app-container">
    <router-view></router-view>
</div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {}
    },
    filters: {

    },
    components: {}

}
</script>

<style lang="less">
.app-container {
    width: 100%;
    height: 100%;
}
.box-card .el-form .el-form-item{
    margin-bottom: 0;
}
.el-dialog {
    margin-top: 3vh !important;
}
</style>
