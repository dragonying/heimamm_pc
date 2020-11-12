<template>
    <div>我是首页</div>
</template>

<script>

import token from '@/utils/token'

export default {
    name: 'index',
    data() {
        return {
            
        }
    },
    methods: {
       
    },
    created() {
        if(!token.getToken()){
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less">
</style>
