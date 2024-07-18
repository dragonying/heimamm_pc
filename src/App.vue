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

.box-card .el-form .el-form-item {
    margin-bottom: 0;
}

.el-dialog {
    margin-top: 3vh !important;
}

.el-drawer__wrapper {
    .el-drawer__header {
        align-items: center;
        color: #fff;
        display: flex;
        padding: 20px;
        margin-bottom: 10px;
        background: linear-gradient(90deg, #01c4fa, #07b4fa, #0fa0fa, #1394fa);
    }

    .el-drawer__body {
        overflow: auto;
    }
}
</style>
