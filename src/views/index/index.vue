<template>
    <el-container class='index-container'  v-loading.fullscreen.lock="!user.username">
    <el-header class='header'>
    <div class='left-box'>
        <span :class="isCollapse ? 'el-icon-s-unfold':'el-icon-s-fold'" @click="isCollapse=!isCollapse"></span>
        <img src="@/assets/images/bklogo.png">
        <h4>黑马面面</h4>
    </div>
    <div class='right-box'>
      <img v-if="user.avatar" :src="useravatar">
      <span class='username'>{{user.username}}</span>
        <el-button size="small" type="primary" @click="logOut">退出</el-button>
    </div>
    </el-header>
    <el-container>
        <el-aside  class='aside' width="auto">
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" router>
                <el-menu-item index="/index/charts">
                    <i class="el-icon-pie-chart"></i>
                    <span slot="title">数据概览</span>
                </el-menu-item>
                <el-menu-item index="/index/users">
                    <i class="el-icon-user"></i>
                    <span slot="title">用户列表</span>
                </el-menu-item>
                <el-menu-item index="/index/questions">
                    <i class="el-icon-edit-outline"></i>
                    <span slot="title">题库列表</span>
                </el-menu-item>
                <el-menu-item index="/index/companys">
                    <i class="el-icon-office-building"></i>
                    <span slot="title">企业列表</span>
                </el-menu-item>
                <el-menu-item index="/index/subjects">
                    <i class="el-icon-notebook-2"></i>
                    <span slot="title">学科列表</span>
                </el-menu-item>
                <el-menu-item index="/index/role">
                    <i class="el-icon-notebook-2"></i>
                    <span slot="title">角色管理</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main class='main'>
              <router-view></router-view>
        </el-main>
    </el-container>
    </el-container>
</template>

<script>

import token from '@/utils/token'
import {userInfo,userLogout} from '@/api/index'


export default {
    name: 'index',
    data() {
        return {
            isCollapse: false,//折叠导航
            user:{},
        }
    },
    methods: {
        //退出
       logOut(){
            this.$confirm('是否确认退出?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                userLogout(()=>{
                    token.delToken();
                    // 删除Vuex中的数据
                    this.$store.state.userInfo = undefined;
                    this.$message({
                        type: 'success',
                        message: '退出成功!',
                        onClose:()=>{
                            this.$router.push('/login');
                        }
                    });
                });
                
            }).catch(() => {});
       }
    },
    created() {
        //获取用户信息
        userInfo(res=>{
            if(res.status === 0){
                this.$message.warning('你的号被封了,请联系管理员解封!!')
                this.$router.push('/login');
                return;
            }
            this.$store.state.userInfo = res.user;
            this.$store.state.power = res.power;

            this.user = res.user;
        });
    },
    computed: {
        useravatar(){
            return process.env.VUE_APP_BASEURL + this.user.avatar
        }
    },
}
</script>

<style lang="less">
.index-container{
    height:100%;
    //头部
    .header{
        height:60px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        &>div{
            display:flex;
            align-items: center;
        }
        .left-box{
           font-size:24px;
           img{
               width:33px;
               height:28px;
               margin:0 11px 0 22px;
           }
           h4{
               font-size:22px;
               color: #49a1ff;
           }
        }
        .right-box{
            img{
                width:43px;
                height:43px;
                border-radius: 50%;
            }
            .username{
                font-size:14px;
                color: #636363;
                margin:0 38px 0 9px;
            }
        }
        
    }
    //侧边栏
    .aside{
        width:200px;
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 200px;
            min-height: 400px;
        }
    }
    //主体
    .main{
        background-color:#e8e9ec;
       box-shadow:inset 1px 0px 5px 1px #cac6c6;
    }
}
</style>
