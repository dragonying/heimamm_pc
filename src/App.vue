<template>
<div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>hello world</div>
    <router-link to="/"></router-link>

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

}
</style>
