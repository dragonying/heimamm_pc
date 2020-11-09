<template>
<div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>hello world</div>
    <router-link to="/"></router-link>
    <el-carousel :interval="interval" indicator-position=" outside">
        <el-carousel-item v-for="item in 100" :key="item">
            <img :src="item | picUrl" />
        </el-carousel-item>
    </el-carousel>
</div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            interval: 1000,
        }
    },
    filters: {
        picUrl: function (num) {
            return `https://game.gtimg.cn/images/lol/act/img/skin/big${1000+num}.jpg`;
        }
    },
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

    .el-carousel__item img {
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
