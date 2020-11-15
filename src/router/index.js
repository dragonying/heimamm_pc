//自定义路由模块，并暴露
import Vue from 'vue'
//引入路由
import VueRouter from 'vue-router'
//导入页面 index.vue可以省略
// import login from '@/views/login'
// import index from '@/views/index'
// import charts from '@/views/index/charts'

//解决当前位置的冗余导航报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

// const router = new VueRouter({
//     routes: [
//         { path: '/', redirect: '/login' },//重定向
//         { path: '/login', component: login },//登录页
//         {
//             path: '/index', component: index,
//             children: [
//                 { path: 'charts', component: charts }
//             ]
//         },//首页
//     ]
// });
//写法二
const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },//重定向
        { path: '/login', component: resolve => require(['@/views/login'], resolve) },//登录页
        {
            path: '/index', component: resolve => require(['@/views/index'], resolve),//首页
            redirect: '/index/charts',
            children: [
                { path: 'charts', component: resolve => require(['@/views/index/charts'], resolve) },
                { path: 'users', component: resolve => require(['@/views/index/users'], resolve) },
                { path: 'companys', component: resolve => require(['@/views/index/companys'], resolve) },
                { path: 'subjects', component: resolve => require(['@/views/index/subjects'], resolve) },
                { path: 'questions', component: resolve => require(['@/views/index/questions'], resolve) },
            ]
        },
    ]
});

//全局前置守卫
router.beforeEach((to, from, next) => {
    console.log('from:', from)
    console.log('to:', to)
    console.log('********************************************\n')
    next();
})
export default router