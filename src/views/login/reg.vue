<template>
<!-- 注册对话框 -->
<el-dialog title="用户注册" :width='width' center :visible.sync="regDialogShow">
    <el-form :model="regForm" :label-width='labelWidth'>
        <el-form-item label="昵称">
        <el-input v-model="regForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
        <el-input v-model="regForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
        <el-input v-model="regForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
        <el-input v-model="regForm.password"></el-input>
        </el-form-item>
        <el-form-item label="图形码">
           <el-row>
                <el-col :span="18">
                    <el-input v-model.number.trim=""></el-input>
                </el-col>
                <el-col :span="5" :offset="1">
                    <img class='' :src="" @click="">
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="验证码">
        <el-input v-model="regForm.rcode"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="regDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="regDialogShow = false">确 定</el-button>
    </div>
</el-dialog>
</template>

<script>
export default {
    name:'register',
    data(){
        return {
            labelWidth:'87px',
            width:'603px',
            regDialogShow:false,
            regForm:{
                avatar:'',
                username:'',
                email:'',
                phone:'',
                password:'',
                rcode:'',//手机验证码
            },
        };
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

}

</style>