//自定义路由模块，并暴露
import Vue from 'vue'
//引入路由
import VueRouter from 'vue-router'
//导入页面 index.vue可以省略
import login from '@/views/login'

//解决当前位置的冗余导航报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },//重定向
        { path: '/login', component: login }
    ]
});
export default router