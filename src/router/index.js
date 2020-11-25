//自定义路由模块，并暴露
import Vue from 'vue'
//引入路由
import VueRouter from 'vue-router'
//进度条导航插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//解决当前位置的冗余导航报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

//导入页面 index.vue可以省略
// import login from '@/views/login'
// import index from '@/views/index'
// import charts from '@/views/index/charts'

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
        {
            path: '/login', component: resolve => require(['@/views/login'], resolve),
            meta: {
                title: '用户登录'
            }
        },//登录页
        {
            path: '/index', component: resolve => require(['@/views/index'], resolve),//首页
            redirect: '/index/charts',
            //设置子路由
            children: [
                {
                    path: 'charts', component: resolve => require(['@/views/index/charts'], resolve),
                    //添加路由原信息，字段名自定义
                    meta: {
                        title: '数据概览',
                        zfy: 'fuck'
                    }
                },
                {
                    path: 'users', component: resolve => require(['@/views/index/users'], resolve),
                    meta: {
                        title: '用户列表',
                    }
                },
                {
                    path: 'companys', component: resolve => require(['@/views/index/companys'], resolve), meta: {
                        title: '企业列表'
                    }
                },
                {
                    path: 'subjects', component: resolve => require(['@/views/index/subjects'], resolve), meta: {
                        title: '学科列表'
                    }
                },
                {
                    path: 'questions', component: resolve => require(['@/views/index/questions'], resolve), meta: {
                        title: '题库列表'
                    }
                },
                {
                    path: 'role', component: resolve => require(['@/views/index/role'], resolve), meta: {
                        title: '角色管理'
                    }
                },
            ]
        },
    ]
});

//全局前置守卫
router.beforeEach((to, from, next) => {
    // console.log('from:', from)
    // console.log('to:', to)
    // console.log('********************************************\n')
    NProgress.start();
    next();//必须执行
})
//全局后置守卫
router.afterEach((to) => {
    //设置title
    window.document.title = to.meta.title || '';

    NProgress.done(true);
})
export default router