<template>
<!-- 新增或编辑学科 -->
<el-dialog :title="dialogItem.id > 0 ? '编辑企业':'新增企业'" :width='width' center :visible.sync="dialogItem.show" @closed="closeHandler">
    <el-form :model="editForm" :rules="rules" ref='editForm' :label-width='labelWidth'>
        <el-form-item label="企业编号" prop="eid">
            <el-input v-model.trim="editForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
            <el-input v-model.trim="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="short_name">
            <el-input v-model="editForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" prop="intro" >
            <el-input class='intro' type='textarea' v-model="editForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" prop="remark" >
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
import {addCompany,getInfo,editCompany} from '@/api/company'

export default {
    name:'company-dialog',
    //父组件传参
    props:{
        dialogItem:{
            type:Object,
            required:true,
        }
    },
    data(){
        return {
            labelWidth:'85px',
            width:'600px',
            editForm:{
                id:'',//企业id
                eid:'',//企业编号
                name:'',//企业名称
                short_name:'',//企业简称
                intro:'',//企业简介
                remark:'',//备注
            },
            rules:{
                eid:[
                    { required: true, message: '请上输入编号',trigger: 'blur'},
                ],
                name:[
                    { required: true, message: '请上输入名称',trigger: 'blur'},
                ],
                short_name:[
                    { required: true, message: '请上输入简称',trigger: 'blur'},
                ],
                intro:[
                    { required: true, message: '请上输入简介',trigger: 'blur'},
                ]
            }
        };
    },
    methods:{
      onSubmit(){
          this.$refs.editForm.validate(valid=>{
                if(valid){
                  if(this.editForm.id > 0){
                      editCompany(this.editForm,()=>{
                       this.$message.success('编辑成功');
                       this.close();
                       this.$parent.getListData();
                   })
                  }else{
                      addCompany(this.editForm,()=>{
                       this.$message.success('添加成功');
                       this.close();
                       this.$parent.getListData();
                     })
                  }
                   
                }else{
                    this.$message.warning('请输入正确的信息！');
                }
                
            });
      },
      close(){
          this.dialogItem.show = false;
      },
        //关闭弹窗时候触发，清空表单数据
      closeHandler(){
            this.dialogItem.id = '';
            this.editForm.id = '';
            this.$refs.editForm.resetFields();//只能清空含有prop属性的表单
      },
      //获取详情
      info(id){
          getInfo({id:id},res=>{
              for(let i in res){
                  if(i in this.editForm){this.editForm[i] = res[i]}  
              }
          })
      }
    },
    watch: {
        dialogItem:{
            handler (newV) {
               if(newV.show && newV.id > 0){
                   this.info(newV.id);
               }
            },
            deep:true //深度侦听,用于对象和数组
         }
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