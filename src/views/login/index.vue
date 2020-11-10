<template>
<div class='container'>
    <div class='left'>
        <div class='top'>
            <a href="#">
                <img class='logo' src="@/assets/images/logo.png" />
                <h1>黑马面面</h1>
            </a>
            <span class='title'>黑马面面</span>
            <i></i>
            <span class='sub-title'>用户登录</span>
        </div>
        <el-form ref="form" :model="form">
            <el-form-item>
                <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.password" placeholder="请输入密码" show-password prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item>
                <el-row>
                    <el-col :span="18">
                        <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <img class='pin-code' src="@/assets/images/logo.png">
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="form.agree">
                </el-checkbox>
                &nbsp;
                <el-link type="info">我已阅读并同意</el-link>
                <el-link href='#' type="primary">主要链接</el-link>
                <el-link type="info">和</el-link>
                <el-link href='#' type="primary">主要链接</el-link>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class='login-btn' @click="onLogin()">登录</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class='register-btn' @click="onRegister()">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class='right'>
        <img src="@/assets/images/login_banner_ele.png" />
    </div>
</div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            form: {
                phone: '',
                password: '',
                code: '',
                agree: false,
            }
        }
    },
    methods: {
        onLogin() {
            console.log('登录!');
        },
        onRegister() {
            console.log('注册!');
        }
    }
}
</script>

<style lang="less">
.container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 119px 73px;
    background: linear-gradient(#1493fa 28%, #01c6fa 96%);

    .left {
        width: 478px;
        height: 550px;
        background: #f5f5f5;

        padding: 48px 41px 48px 43px;

        .top {
            display: flex;
            align-items: center;

            line-height: 28px;
            heigth: 28px;
            font-size: 24px;
             margin-bottom: 25px;

            &>* {
                margin-right: 14px;
            }

            a {
                display: inline-block;
                font-size: 0;
                width: 25px;
                height: 18px;

                h1 {
                    width: 0;
                    height: 0;
                }

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .sub-title {
                font-size: 22px;
            }

            i {
                display: block;
                width: 1px;
                height: 28px;
                background: #c7c7c7;

            }
        }
    }

    .right {
        width: 633px;
        height: 435px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .login-btn,
    .register-btn {
        width: 100%
    }

    input {
        font-size: 13px;
    }


    .pin-code {
        width: 100%;
        height: 40px;
        vertical-align: middle;
    }

}
</style>
