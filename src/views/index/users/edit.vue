<template>
<!-- 新增或编辑用户 -->
<el-dialog :title="editForm.id > 0 ? '编辑用户':'新增用户'" :width='width' center :visible.sync="showDialog" @closed="closeHandler">
    <el-form :model="editForm" :rules="rules" ref='editForm' :label-width='labelWidth'>
        <el-form-item label="用户名" prop="username">
            <el-input v-model.trim="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model.trim="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
            <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
            <el-select  v-model="editForm.role_id">
                <el-option v-for="rl in rolesLable" :label="rl.title" :value="rl.value" :key="rl.value"></el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="状态" prop="status">
            <el-select  v-model="editForm.status">
                <el-option v-for="rl in statusLable" :label="rl.title" :value="rl.value" :key="rl.value"></el-option>
            </el-select>
         </el-form-item>
        <el-form-item label="用户备注" prop="remark" >
            <el-input v-model="editForm.remark"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
</el-dialog>
</template>

<script>
import {editorUser,getRoles,addUser} from '@/api/user'

export default {
    name:'user-dialog',
    data(){
        return {
            showDialog:false,
            labelWidth:'85px',
            width:'600px',
            editForm:{
                id:'',//用户id
                username:'',//用户名
                email:'',//用户邮箱
                phone:'',//电话
                role_id:'',//角色
                status:'',//状态
                remark:'',//备注
            },
            rules:{
                username:[
                    { required: true, message: '请上输入用户名',trigger: 'blur'},
                ],
                email:[
                    { required: true, type:'email', message: '请上输入邮箱',trigger: 'blur'},
                ],
                 phone:[
                    { required: true, message: '请上输入手机号',trigger: 'blur'},
                    { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号码格式错误',trigger: ['blur']}
                ],
                role_id:[
                    { required: true, message: '请选择角色',trigger: 'blur'},
                ],
            },
             statusLable:[
                {title:'启用',value:1},
                {title:'禁用',value:0},
             ],
            rolesLable:[]
            };
    },
    methods:{
      onSubmit(){
          this.$refs.editForm.validate(valid=>{
                if(valid){
                  if(this.editForm.id > 0){
                      editorUser(this.editForm,()=>{
                       this.$message.success('编辑成功');
                       this.close();
                       this.$parent.getUserList();
                   })
                  }else{
                      addUser(this.editForm,()=>{
                       this.$message.success('添加成功');
                       this.close();
                       this.$parent.getUserList();
                     })
                  }
                   
                }else{
                    this.$message.warning('请输入正确的信息！');
                }
                
            });
      },
      close(){
          this.showDialog = false;
      },
        //关闭弹窗时候触发，清空表单数据
      closeHandler(){
            this.editForm.id = '';
            //如果首次点开编辑，再执行该方法无法清空，数据会还原为第一次显示的内容
            this.$refs.editForm.resetFields();//只能清空含有prop属性的表单
      },
    },
    mounted() {
        getRoles(res=>{this.rolesLable = res});//角色
    },
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
    .intro .el-input__inner{
        height:53px;
    }
    .dialog-footer{
        margin-top:-30px;
        margin-bottom:18px;
    }
}

</style>