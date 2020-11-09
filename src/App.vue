<template>
<div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>hello world</div>
    <router-link to="/"></router-link>
    <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
        </el-carousel-item>
    </el-carousel>
</div>
</template>

<script>
export default {
    name: 'App',
    components: {}
}
</script>

<style lang="less">
//less的整合
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

    div {
        color: gold;
        font-weight: 700;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

}
</style>
