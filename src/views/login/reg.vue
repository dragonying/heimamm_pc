<template>
<!-- 注册对话框 -->
<el-dialog title="用户注册" :width='width' center :visible.sync="regDialogShow">
    <el-form :model="regForm" :rules="rules" :label-width='labelWidth'>
        <el-form-item label="头像"  prop="avatar">
            <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
                <img v-if="regForm.avatar" :src="regForm.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input type="hidden" v-model="regForm.avatar"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="username">
            <el-input v-model="regForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="regForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
            <el-input v-model="regForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="regForm.password"></el-input>
        </el-form-item>
        <el-form-item label="图形码">
           <el-row>
                <el-col :span="17">
                    <el-input ></el-input>
                </el-col>
                <el-col :span="6" :offset="1">
                    <img class='pin-code' :src="codePic" @click="refleshCode">
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="验证码">
            <el-row>
                <el-col :span="17">
                    <el-input v-model="regForm.rcode"></el-input>
                </el-col>
                <el-col :span="6" :offset="1">
                      <el-button class='code-btn'>获取用户验证码</el-button>
                </el-col>
            </el-row>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="regDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="regDialogShow = false" @click="reg">确 定</el-button>
    </div>
</el-dialog>
</template>

<script>
import {smPinCode} from '@/api/reg'

export default {
    name:'register',
    data(){
        return {
            uploadUrl:'',
            labelWidth:'62px',
            width:'603px',
            regDialogShow:false,
            codePic:'',//验证码
            regForm:{
                avatar:'',
                username:'',
                email:'',
                phone:'',
                password:'',
                rcode:'',//手机验证码
            },
            rules:{
                avatar:[
                    { required: true, message: '请上传头像',trigger: 'change'},
                ],
                username:[
                    { required: true, message: '请上输入昵称',trigger: 'blur'},
                ],
                email:[
                    { required: true, message: '请上输入邮箱',trigger: 'blur'},
                    { type: 'email', message: '邮箱格式错误',trigger: 'blur'},
                ],
                phone:[
                    { required: true, message: '请上输入手机号',trigger: 'blur'},
                    { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号码格式错误',trigger: ['blur']}
                ],
                password:[
                    { required: true, message: '请上输入密码',trigger: 'blur'},
                    { min: 6, message: '长度至少6个字符',trigger: 'blur'},
                ],
            }
        };
    },
    methods:{
     handleAvatarSuccess(res, file) {
        this.regForm.avatar = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //验证码刷新
      refleshCode(){
           this.codePic = smPinCode();
      }
    }
}
</script>
<style lang="less">
.el-dialog{
    .el-dialog__header{
        height:53px;
        background:linear-gradient(to right,#01c4fa,#07b4fa,#0fa0fa,#1394fa);
        padding:18px 0;
        .el-dialog__title,.el-dialog__close{
            color:white;
            font-size:14px;
        }
    }
    .code-btn{
        width:100%;
        height:40px;
        font-size:11px;
        text-align:center;
    }
    .dialog-footer{
        margin-top:-30px;
        margin-bottom:18px;
    }

    //头像上传
    .avatar-uploader{
        text-align:center;
    }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}

</style>