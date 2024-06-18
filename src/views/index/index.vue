<template>
    <el-container class='index-container' v-loading.fullscreen.lock="!user.username">
        <el-header class='header'>
            <div class='left-box'>
                <span :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
                    @click="isCollapse = !isCollapse"></span>
                <img src="@/assets/images/bklogo.png">
                <h4>抖音助手</h4>
            </div>
            <div class='right-box'>
                <img v-if="user.avatar" :src="useravatar">
                <span class='username'>{{ user.username }}</span>
                <el-button size="small" type="warning" icon="el-icon-s-platform"
                    @click="dialogVisible = !dialogVisible">任务日志</el-button>
                <el-button size="small" type="primary" icon="el-icon-warning" @click="logOut">退出</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside class='aside' width="auto">
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" router>
                    <el-menu-item index="/index/charts">
                        <i class="el-icon-pie-chart"></i>
                        <span slot="title">数据概览</span>
                    </el-menu-item>
                    <el-menu-item index="/index/users">
                        <i class="el-icon-user"></i>
                        <span slot="title">用户列表</span>
                    </el-menu-item>
                    <el-menu-item index="/index/aweme">
                        <i class="el-icon-user"></i>
                        <span slot="title">作品列表</span>
                    </el-menu-item>
                    <el-menu-item index="/index/aweme">
                        <i class="el-icon-user"></i>
                        <span slot="title">分组管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class='main'>
                <router-view></router-view>
            </el-main>
        </el-container>
        <el-dialog title="执行日志" :visible.sync="dialogVisible" center width="60%" :before-close="handleClose">
            <div class="console" ref="console">
                <p v-for="(item, index) in logs" :key="index" :class="item.type">{{ item.msg }}</p>
            </div>
        </el-dialog>
    </el-container>
</template>

<script>

import token from '@/utils/token'
import { userInfo, userLogout } from '@/api/index'
import WebSocketClientManager from '@/utils/WebSocketClientManager';
import bus from '@/utils/bus';


export default {
    name: 'index',
    data() {
        return {
            isCollapse: false,//折叠导航
            dialogVisible: false,
            logs: [],
            user: { username: '龙英' },
            messageListener: null
        }
    },
    methods: {
        //退出
        logOut() {
            this.$confirm('是否确认退出?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                userLogout(() => {
                    token.delToken();
                    // 删除Vuex中的数据
                    this.$store.state.userInfo = undefined;
                    this.$message({
                        type: 'success',
                        message: '退出成功!',
                        onClose: () => {
                            this.$router.push('/login');
                        }
                    });
                });

            }).catch(() => { });
        },
        handleClose() {
            this.dialogVisible = false;
        }
    },
    created() {
        //获取用户信息
        userInfo(res => {
            if (res.status === 0) {
                this.$message.warning('你的号被封了,请联系管理员解封!!')
                this.$router.push('/login');
                return;
            }
            this.$store.state.userInfo = res.user;
            this.$store.state.power = res.power;

            this.user = res.user;
        });
        bus.$on('openLog', value => {
            this.dialogVisible = true;
        });
        bus.$on('closeLog', value => {
            this.dialogVisible = false;
        })
    },
    computed: {
        useravatar() {
            return process.env.VUE_APP_BASEURL + this.user.avatar
        }
    },
    watch: {
        dialogVisible(v) {
            if (v) {
                this.messageListener = res => {
                    const { success, type, data } = res;
                    if (!type) {
                        const { cmd, msg, type } = data;
                        this.logs.push(data);
                        this.$refs.console.scrollBy(0, this.$refs.console.scrollHeight);
                    }
                };
                WebSocketClientManager.getInstance().addMessageListener(this.messageListener);
            } else {
                WebSocketClientManager.getInstance().removeMessageListener(this.messageListener);
                // this.logs = [];
            }
        }
    },
    destroyed() {
    }
}
</script>

<style lang="less">
.index-container {
    height: 100%;

    //头部
    .header {
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &>div {
            display: flex;
            align-items: center;
        }

        .left-box {
            font-size: 24px;

            img {
                width: 33px;
                height: 28px;
                margin: 0 11px 0 22px;
            }

            h4 {
                font-size: 22px;
                color: #49a1ff;
            }
        }

        .right-box {
            img {
                width: 43px;
                height: 43px;
                border-radius: 50%;
            }

            .username {
                font-size: 14px;
                color: #636363;
                margin: 0 38px 0 9px;
            }
        }

    }

    //侧边栏
    .aside {
        width: 200px;

        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 200px;
            min-height: 400px;
        }
    }

    //主体
    .main {
        background-color: #e8e9ec;
        box-shadow: inset 1px 0px 5px 1px #cac6c6;
    }

    ::-webkit-scrollbar {
        width: 4px;
        height: 1px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.1);
        background: #4594f2;
    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
        border-radius: 10px;
        background: #020202;
    }


    .console {
        height: 50vh;
        overflow-y: auto;
        font-size: 12px;
        border: 1px solid #fff;
        background-color: #020202;
        padding: 10px;
        border-radius: 10px;
        padding-bottom: 20px;

        .info {
            color: rgb(70 207 43);
        }

        .warn {
            color: #5ab5d7;
        }

        .notice {
            color: #d0d041;
        }

        .error {
            color: #de3c33;
        }
    }

}
</style>
