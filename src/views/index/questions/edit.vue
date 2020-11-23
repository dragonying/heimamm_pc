<template>
<!-- 新增或编辑用户 -->
<el-dialog class="question-editor" :title="editForm.id > 0 ? '编辑试题':'新增试题'" center  :visible.sync="showDialog" @closed="closeHandler" :fullscreen="true">
   <div class='form-container'>
        <el-form :model="editForm" :rules="rules" ref='editForm' :label-width='labelWidth' label-position="left" >
            <el-form-item label="学科" prop="subject">
                <subjectSel v-model="editForm.subject"></subjectSel>
            </el-form-item>
            <el-form-item label="阶段" prop="step">
                <stepSel v-model="editForm.step"></stepSel>
            </el-form-item>
            <el-form-item label="企业" prop="enterprise">
                <enterpriseSel v-model="editForm.enterprise"></enterpriseSel>
            </el-form-item>
            <el-form-item label="城市" prop="city">
                <cityCascader v-model="editForm.city"></cityCascader>
            </el-form-item>
            <el-form-item label="题型" prop="type">
                <el-radio-group v-model="editForm.type">
                    <el-radio v-for="(item,index) in typeLabels" :label="item.value" :key="index">{{item.title}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="难度" prop="type">
                <el-radio-group v-model="editForm.difficulty">
                    <el-radio v-for="(item,index) in difficultyLabels" :label="item.value" :key="index">{{item.title}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="试题标题" prop="title" >
                <quillEditor v-model="editForm.title"></quillEditor>
            </el-form-item>
            <!--单选选项-->
            <el-form-item v-if="editForm.type == 1" label="单选" prop="single_select_answer">
                <el-radio-group class='group_select' v-model="editForm.single_select_answer">
                   <el-row  v-for="(item,index) in select_options" :key="index">
                        <el-radio :label="item.label" >
                         </el-radio>
                         <el-input v-model.trim="item.text"></el-input>
                        <imgUploader v-model="item.image"></imgUploader>
                    </el-row>
                </el-radio-group>
            </el-form-item>
            <!--多选选项-->
            <el-form-item v-if="editForm.type == 2" label="多选" prop="multiple_select_answer">
                <el-checkbox-group class='group_select' v-model="editForm.multiple_select_answer">
                   <el-row  v-for="(item,index) in select_options" :key="index">
                        <el-checkbox :label="item.label" >
                         </el-checkbox>
                         <el-input v-model.trim="item.text"></el-input>
                        <imgUploader v-model="item.image"></imgUploader>
                    </el-row>
                </el-checkbox-group>
            </el-form-item>
             <!--简答-->
            <el-form-item v-if="editForm.type == 3" label="简答" prop="short_answer" >
                <el-input type="textarea" v-model="editForm.short_answer"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <!--视频-->
            <el-form-item label="视频解析" prop="video" >
                <videoUploader v-model="editForm.video"></videoUploader>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="答案解析" prop="answer_analyze" >
                <quillEditor v-model="editForm.answer_analyze"></quillEditor>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="试题备注" prop="remark" >
                <el-input v-model.trim="editForm.remark"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size='medium' @click="close">取 消</el-button>
            <el-button size='medium' type="primary" @click="onSubmit">确 定</el-button>
        </div>
    </div>
</el-dialog>
</template>

<script>
import {add,edit} from '@/api/question'
import subjectSel from '@/components/selectOptions/subjectSel'
import stepSel from '@/components/selectOptions/stepSel'
import enterpriseSel from '@/components/selectOptions/enterpriseSel'
import cityCascader from '@/components/selectOptions/cityCascader'
import quillEditor from '@/components/selectOptions/quillEditor'
import imgUploader from '@/components/selectOptions/imgUploader'
import videoUploader from '@/components/selectOptions/videoUploader'

import {getSelectOption} from '@/api/common'

export default {
    name:'question-dialog',
    components:{
        subjectSel,
        stepSel,
        enterpriseSel,
        cityCascader,
        quillEditor,
        imgUploader,
        videoUploader
    },
    data(){
        return {
            showDialog:false,
            labelWidth:'85px',
            editForm:{
                id:'',//用户id
                title:'',//标题
                subject:'',//学科id
                step:'',//阶段
                enterprise:'',//企业id
                city:'',//省市区
                type:1,//提型
                difficulty:1,//困难度
                single_select_answer:'',//单选题答案
                multiple_select_answer:[],//多选答案
                short_answer:'',//简单题答案
                video:'',//解析视频地址
                answer_analyze:'',//答案解析
                remark:'',//答案备注
                select_options:[],
            },
            select_options: [ //选项介绍图片
                {
                    label: 'A',
                    text: '',
                    image: ''
                },
                {
                    label: 'B',
                    text: '',
                    image: ''
                },
                {
                    label: 'C',
                    text: '',
                    image: ''
                },
                {
                    label: 'D',
                    text: '',
                    image: ''
                }
            ],
            rules:{
                subject:[
                    { required: true, message: '请选择学科',trigger: 'change'},
                ],
                step:[
                    { required: true, message: '请选择阶段',trigger: 'change'},
                ],
                enterprise:[
                    { required: true, message: '请选择企业',trigger: 'change'},
                ],
                city:[
                    { required: true, message: '请选择城市',trigger: 'change'},
                ],
                type:[
                    { required: true, message: '请选择题型',trigger: 'change'},
                ],
                difficulty:[
                    { required: true, message: '请选择难度',trigger: 'change'},
                ],
                title:[
                    { required: true, message: '请输入标题',trigger: 'blur'},
                ],
                single_select_answer:[
                    { required: true, message: '请选择正确选项',trigger: 'blur'},
                ],
                 multiple_select_answer:[
                    { required: true, message: '请选择正确选项',trigger: 'blur'},
                ],
                short_answer:[
                    { required: true, message: '请选择正确答案',trigger: 'blur'},
                ],
                answer_analyze:[
                    { required: true, message: '请选输入答案解析',trigger: 'blur'},
                ],
                remark:[
                    { required: true, message: '请输入备注',trigger: 'blur'},
                ],
              
            },
            typeLabels:[],//题型选择
            difficultyLabels:[],//难度选择
        }
    },
    watch: {
        select_options:{
            handler (newV) {
               this.editForm.select_options = newV;
            },
            deep:true //深度侦听,用于对象和数组
         }
    },
    methods:{
        //重置表单，清除多余字段的内容
      resetForm(){
            [
                'single_select_answer',
                'multiple_select_answer',
                'short_answer'
            ].forEach((v,index)=>{
                if(index != (this.editForm.type-1)){
                   this.editForm[v] = (typeof(this.editForm[v]) == 'object') ?[]:'';
                }
            });
      },  
      onSubmit(){
          this.$refs.editForm.validate(valid=>{
                if(valid){
                  this.resetForm();
                  if(this.editForm.id > 0){
                      edit(this.editForm,()=>{
                       this.$message.success('编辑成功');
                       this.close();
                       this.$parent.getQuestionList();
                   })
                  }else{
                      add(this.editForm,()=>{
                       this.$message.success('添加成功');
                       this.close();
                       this.$parent.getQuestionList();
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
            this.$refs.editForm.resetFields();//只能清空含有prop属性的表单
            //再次重置，部分字段无法清空
            this.editForm = this.$options.data().editForm;
            this.select_options = this.$options.data().select_options;
      },
    },
    created() {
        getSelectOption(res=>{
            this.typeLabels = res.type || [];
            this.difficultyLabels = res.difficulty || [];
        });
    },
    
}
</script>
<style lang="less">
.question-editor{
    .el-divider{
        height:2px;
    }
    .form-container{
        width:832px;
        margin:0 auto;

        .el-select,.el-cascader{
            width:364px;
        }
       
        .group_select{
            .el-row{
                display:flex;
                justify-content: space-around;
                align-items: center;
                margin-bottom:45px;
                .el-input{
                 width:476px;
                 margin-right:20px;
                }
                .el-checkbox{
                    margin-right:25px;
                }
            }
            
        }
        
    }
    .el-dialog__header{
        height:53px;
        background:linear-gradient(to right,#01c4fa,#07b4fa,#0fa0fa,#1394fa);
        padding:18px 0;
        .el-dialog__title,.el-dialog__close{
            color:white;
            font-size:14px;
        }
    }
    .quill-editor{
        margin-top:70px;
        margin-left:-80px;
    }


    .intro .el-input__inner{
        height:53px;
    }
    .dialog-footer{
        margin-bottom:18px;
        text-align:center;
    }
}

</style>