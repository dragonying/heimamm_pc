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
        <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="phone">
                <el-input v-model.number.trim="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="form.password" placeholder="请输入密码" show-password prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-row>
                    <el-col :span="16">
                        <el-input v-model.number.trim="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <img class='pin-code' :src="codePic" @click="refreshCode">
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="agree">
                <el-checkbox v-model="form.agree">
                </el-checkbox>
                &nbsp;
                <el-link href='javascript:viod(0)'  type="info">我已阅读并同意</el-link>
                <el-link href='#' type="primary">用户协议</el-link>
                <el-link href='javascript:viod(0)' type="info">和</el-link>
                <el-link href='#' type="primary">隐私条款</el-link>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class='login-btn' @click.stop.prevent="onLogin">登录</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class='register-btn' @click="onRegister">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class='right'>
        <img src="@/assets/images/login_banner_ele.png" />
    </div>
</div>
</template>

<script>
import {userLogin,pinCode} from '@/api/login'
import token from '@/utils/token'

export default {
    name: 'login',
    data() {
        //自定义验证
       let checkIsAgree=(rule,value,callback)=>{
                if(!value){
                     return callback(new Error(rule.message));
                }
                return callback();
            };
        return {
            codePic:pinCode(),
            form: {
                phone: process.env.VUE_APP_TEST_ACCOUNT,
                password: process.env.VUE_APP_TEST_PASSWORD,
                code: '',
                agree: false,
            },
            //验证数据
            rules:{
                phone:[
                     { required: true, message: '手机号码不能为空',trigger: 'blur'},
                     { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号码格式错误',trigger: ['blur']}
                ],
                password:[
                     { required: true, message: '密码不能为空',trigger: 'blur'},
                     { min: 6, message: '长度至少6个字符',trigger: 'blur'},
                ],
                code:[
                     { required: true, message: '验证码不能为空',trigger: 'blur'},
                     { pattern: /^\d{4}$/, message: '长度必须为4个数字',trigger: 'blur'},
                     { type: 'number', message: '验证码长度或格式有误',trigger: ['blur','change']},

                ],
                agree:[
                    { validator: checkIsAgree, message: '请勾选协议',trigger: 'change'},
                ]
            }
        }
    },
    methods: {
        onLogin() {
            this.$refs.form.validate(valid=>{
                if(valid){
                   userLogin(this.form,res=>{
                    if(res.code == 200){
                        this.$message.success('登录成功');
                        token.setToken(res.data.token)
                        this.$router.push('/index')
                    }else{
                        this.$message.error(res.message);
                    }
                   })
                }else{
                    this.$message.warning('请输入正确的信息！');
                }
                
            });
        },
        onRegister() {
            console.log('注册!');
        },
        //刷新验证码
        refreshCode(){
            this.codePic = pinCode();
        }
    },
    beforeCreate() {
        //  if(token.getToken()){
        //     this.$router.push('/index')
        // }
    },
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
        border:1px dashed #666666;
    }

}
</style>
