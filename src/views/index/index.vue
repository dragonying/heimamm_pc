<template>
    <el-container class='index-container' v-loading.fullscreen.lock="show" element-loading-text="请先登录"
        element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-header class='header'>
            <div class='left-box'>
                <span :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
                    @click="isCollapse = !isCollapse"></span>
                <img src="@/assets/images/bklogo.png">
                <h4>抖音询盘系统</h4>
            </div>
            <div class='right-box'>
                <!-- <img v-if="user.avatar" :src="useravatar"> -->
                <span class='expireTime'>有效期至：{{ userInfo.expireTime }}</span>
                <el-button size="small" type="warning" icon="el-icon-s-platform"
                    @click="dialogVisible = !dialogVisible">任务日志</el-button>
                <el-button size="small" type="success" icon="el-icon-setting" @click="browserSet">浏览器设置</el-button>
                <el-button size="small" type="danger" icon="el-icon-delete-solid"
                    @click="clearBrowser">清空浏览器</el-button>
                <el-button size="small" type="primary" icon="el-icon-full-screen" @click="toggleFullScreen">全屏</el-button>
                <!-- <el-button size="small" type="primary" icon="el-icon-warning" @click="logOut">退出</el-button> -->
            </div>
        </el-header>
        <el-container>
            <el-aside class='aside' width="auto">
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" router>
                    <el-menu-item index="/index/charts">
                        <i class="el-icon-pie-chart"></i>
                        <span slot="title">数据概览</span>
                    </el-menu-item>
                    <!-- <el-menu-item index="/index/search">
                        <i class="el-icon-search"></i>
                        <span slot="title">分类搜索</span>
                    </el-menu-item> -->
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
        <el-dialog title="浏览器设置" :visible.sync="browserVisible" center width="40%" :before-close="handleCloseBrowser">
            <el-form class="browserForm" :model="browserForm" :rules="rules" ref='browserForm' label-width="100px">
                <el-form-item label="浏览器宽度" prop="width">
                    <el-input-number v-model="browserForm.width" :min="100" :step="1"></el-input-number>
                    <span>PX</span>
                </el-form-item>
                <el-form-item label="浏览器高度" prop="height">
                    <el-input-number v-model="browserForm.height" :min="100" :step="1"></el-input-number>
                    <span>PX</span>
                </el-form-item>
                <el-form-item label="超时时间" prop="timeout">
                    <el-input-number v-model="browserForm.timeout" :min="1000" :step="100"></el-input-number>
                    <span>毫秒</span>
                </el-form-item>
                <el-form-item label="等待时间" prop="defaultWait">
                    <el-input-number v-model="browserForm.defaultWait" :min="2000" :step="100"></el-input-number>
                    <span>毫秒</span>
                    <tip content="模拟人工操作的点击间隔时间，建议大于2000毫秒" />
                </el-form-item>
                <el-form-item label="无头模式" prop="headless">
                    <el-switch v-model="browserForm.headless"></el-switch>
                    <tip content="无头模式：不会唤起浏览器窗口。为了更好的体验，建议不开启" />
                </el-form-item>
                <el-form-item label="屏蔽媒体加载" prop="absorbMediaRequest">
                    <el-switch v-model="browserForm.absorbMediaRequest"></el-switch>
                    <tip content="可以减少图片，视频，音频的请求加载，节省带宽，提高运行效率，但会影响视觉体验" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmitConf">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="登录" :visible.sync="show" center width="40%" :close-on-click-modal="false" :show-close="false">
            <el-form class="loginForm" :model="loginForm" :rules="loginRules" ref='loginForm' label-width="60px">
                <el-form-item label="设备码" prop="deviceId" disabled>
                    <el-input :value="userInfo.deviceId">
                        <el-button slot="append" type="warning" @click="copy">复制</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="卡密" prop="code">
                    <el-input v-model="loginForm.code" placeholder="请输入卡密"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmitLogin">确定</el-button>
            </div>
            <el-alert title="请复制设备码给管理员获取卡密激活" type="warning" show-icon :closable="false">
            </el-alert>
        </el-dialog>
    </el-container>
</template>

<script>

import { browserConf } from '@/api/index';
import { auth } from '@/api/user'
import { mapState } from 'vuex';
import WebSocketClientManager from '@/utils/WebSocketClientManager';
import tip from '@/views/index/components/tip';
import bus from '@/utils/bus';
import { copyText } from '@/utils/tool';
export default {
    name: 'index',
    components: {
        tip
    },
    data() {
        return {
            isCollapse: false,//折叠导航
            dialogVisible: false,
            browserVisible: false,
            logs: [],
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
            ],
            browserForm: {
                headless: false,
                absorbMediaRequest: false,
                width: 1000,
                height: 800,
                timeout: 60000,
                defaultWait: 3000
            },
            loginForm: {
                code: null
            },
            rules: {
                width: [
                    { required: false, message: '请输入', trigger: 'blur' },
                ],
                height: [
                    { required: false, message: '请输入', trigger: 'blur' },
                ],
                timeout: [
                    { required: false, message: '请输入', trigger: 'blur' },
                ],
            },
            loginRules: {
                code: [
                    { required: true, message: '请输入卡密', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        copy() {
            copyText(this.userInfo.deviceId);
            this.$message.success('复制成功');
        },
        browserSet() {

            browserConf({}, (data) => {
                this.browserForm = { ...this.browserForm, ...data };
            });
            this.browserVisible = true;
        },
        onSubmitConf() {
            this.$refs.browserForm.validate(valid => {
                if (valid) {
                    browserConf(this.browserForm, () => {
                        this.handleCloseBrowser();
                        this.$message.success('设置成功');
                    })
                } else {
                    this.$message.warning('请完善信息！');
                }

            });
        },
        onSubmitLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    const { code } = this.loginForm;
                    auth({ code }, data => {
                        window.location.reload(true);
                    })
                } else {
                    this.$message.warning('请输入卡密');
                }

            });
        },
        handleCloseBrowser() {
            this.browserVisible = false;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        clearLog() {
            this.logs = [];
        },
        stopTask() {
            WebSocketClientManager.getInstance().sendMessage({ cmd: 'stopTask' });
        },
        clearBrowser() {
            this.$confirm('清空浏览器，将会清除已登录的账号，需要重新登录', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.dialogVisible = true;
                WebSocketClientManager.getInstance().sendMessage({ cmd: 'clearBrowser' });
            })
        },
        toggleFullScreen() {
            if (!document.fullscreenElement) {
                this.enterFullScreen();
            } else {
                this.exitFullScreen();
            }
        },
        enterFullScreen() {
            let element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) { /* Firefox */
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) { /* IE/Edge */
                element.msRequestFullscreen();
            }
        },
        exitFullScreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        }
    },
    created() {
        bus.$on('openLog', value => {
            this.dialogVisible = true;
        });
        bus.$on('closeLog', value => {
            this.dialogVisible = false;
            this.$store.dispatch('dataStatic');
        });
        bus.$on('updateAuth', value => {
            this.$store.dispatch('auth');
        });
        this.$store.dispatch('auth');
        this.$store.dispatch('getGroupOptions');
        this.$store.dispatch('dataStatic');
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            show: state => !Boolean(state.userInfo.code)
        }),
    },
    watch: {
        dialogVisible(v) {
            if (v) {
                this.messageListener = res => {
                    const { success, type, data } = res;
                    if (!type) {
                        const { cmd, msg, type, isProgress } = data;
                        if (isProgress) {
                            this.percentage = msg * 1;
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
    mounted() {
    },
    destroyed() {
    }
}
</script>

<style lang="less">
.index-container {
    height: 100%;

    .el-container {
        overflow: auto;
    }

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

            .expireTime {
                font-size: 14px;
                color: #12ca78;
                margin: 0 38px 0 9px;
                font-weight: bold;
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
        padding: 10px;
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
                top: -6px;
                right: -170px;

                .el-progress-circle {
                    background-color: #fff;
                    border-radius: 50%;
                }
            }
        }
    }

    .console {
        height: 70vh;
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

    .browserForm,
    .loginForm {
        padding-top: 20px;

        .el-input-number {
            margin-right: 10px;
        }
    }

}

.el-loading-mask {
    z-index: 100 !important;
}
</style>
