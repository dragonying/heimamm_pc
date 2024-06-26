<template>
    <el-container class='index-container' v-loading.fullscreen.lock="!user.username">
        <el-header class='header'>
            <div class='left-box'>
                <span :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
                    @click="isCollapse = !isCollapse"></span>
                <img src="@/assets/images/bklogo.png">
                <h4>抖音询盘系统</h4>
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
                    <el-menu-item index="/index/search">
                        <i class="el-icon-search"></i>
                        <span slot="title">分类搜索</span>
                    </el-menu-item>
                    <el-menu-item index="/index/users">
                        <i class="el-icon-user"></i>
                        <span slot="title">用户列表</span>
                    </el-menu-item>
                    <el-menu-item index="/index/aweme">
                        <i class="el-icon-video-camera"></i>
                        <span slot="title">作品列表</span>
                    </el-menu-item>
                    <el-menu-item index="/index/group">
                        <i class="el-icon-folder-opened"></i>
                        <span slot="title">分组管理</span>
                    </el-menu-item>
                    <el-menu-item index="/index/download">
                        <i class="el-icon-download"></i>
                        <span slot="title">下载管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class='main'>
                <router-view></router-view>
            </el-main>
        </el-container>
        <el-dialog title="执行日志" :visible.sync="dialogVisible" center width="60%" :before-close="handleClose">
            <div class="operator">
                <el-button type="success" size="mini" @click="clearLog">清空日志</el-button>
                <el-progress type="circle" :percentage="percentage" :color="colors"></el-progress>
                <el-button type="danger" size="mini" @click="stopTask">终止任务</el-button>
            </div>
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
            messageListener: null,
            percentage: 0,
            colors: [
                { color: '#4758bf', percentage: 10 },
                { color: '#5555b2', percentage: 20 },
                { color: '#6351a4', percentage: 30 },
                { color: '#734e95', percentage: 40 },
                { color: '#8e477a', percentage: 50 },
                { color: '#a44266', percentage: 60 },
                { color: '#b63e55', percentage: 70 },
                { color: '#cb3a40', percentage: 80 },
                { color: '#dd362f', percentage: 90 },
                { color: '#e83325', percentage: 100 }
            ]
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
        },
        clearLog() {
            this.logs = [];
        },
        stopTask() {
            WebSocketClientManager.getInstance().sendMessage({ cmd: 'stopTask' });
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
            this.$store.dispatch('dataStatic');
        })
        this.$store.dispatch('getGroupOptions');
        this.$store.dispatch('dataStatic');
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
                        const { cmd, msg, type, isProgress } = data;
                        if (isProgress) {
                            this.percentage = msg;
                        } else {
                            this.logs.push(data);
                            this.$refs.console.scrollBy(0, this.$refs.console.scrollHeight);
                        }
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

        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 145px;
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

    .el-dialog {
        .el-dialog__header {
            height: 53px;
            background: linear-gradient(to right, #01c4fa, #07b4fa, #0fa0fa, #1394fa);
            padding: 18px 0;

            .el-dialog__title,
            .el-dialog__close {
                color: white;
                font-size: 14px;
            }
        }
    }

    .el-dialog--center .el-dialog__body {
        padding-top: 0;

        .operator {
            margin: 10px 0;
            display: flex;
            justify-content: space-between;
            position: relative;

            .el-progress {
                position: absolute;
                top: -190px;
                left: 43%;

                .el-progress-circle {
                    background-color: #fff;
                    border-radius: 50%;
                }
            }
        }
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
