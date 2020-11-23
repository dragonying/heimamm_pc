<template>
    <div class='question-container'>
        <el-card class="box-card search-box">
            <el-form :inline="true" :model="searchItem" ref="search" class="demo-form-inline" label-width="90px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="学科" prop="subject">
                        <el-select class='middle-input'  v-model="searchItem.subject">
                        <el-option v-for="itm in searchOption.subject" :label="itm.title" :value="itm.value" :key="itm.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="阶段" prop="step">
                        <el-select class='middle-input'  v-model="searchItem.step">
                        <el-option v-for="itm in searchOption.step" :label="itm.title" :value="itm.value" :key="itm.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="企业" prop="enterprise">
                        <el-select class='middle-input'  v-model="searchItem.enterprise">
                        <el-option v-for="itm in searchOption.enterprise" :label="itm.title" :value="itm.value" :key="itm.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="题型" prop="type">
                        <el-select class='middle-input'  v-model="searchItem.type">
                        <el-option v-for="itm in searchOption.type" :label="itm.title" :value="itm.value" :key="itm.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="难度" prop="difficulty">
                    <el-select class='middle-input'  v-model="searchItem.difficulty">
                        <el-option v-for="itm in searchOption.difficulty" :label="itm.title" :value="itm.value" :key="itm.value"></el-option>
                    </el-select>
                    </el-form-item>
                <el-form-item label="作者" prop='username' >
                    <el-input class='middle-input'  v-model.trim="searchItem.username"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select class='middle-input'  v-model="searchItem.status">
                    <el-option v-for="itm in searchOption.status" :label="itm.title" :value="itm.value" :key="itm.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期" prop='create_date' >
                    <el-col class='middle-input' >
                        <el-date-picker type="date" placeholder="选择日期" v-model="searchItem.create_date" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                </el-col>
            </el-row>
                
                <el-form-item label="标题" prop='title' >
                    <el-input class='big-input' v-model.trim="searchItem.title"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                    <el-button @click='clear'>清除</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click="addDialog">新增试题</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-card table-box">
            <el-table :data="tableData" style="width: 100%" border>
            <el-table-column
                type="index"
                label="序号">
            </el-table-column>
            <el-table-column
                prop="id"
                label="ID">
            </el-table-column>
            <el-table-column
                label="题目">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.title | filterTag" placement="top-start">
                        <span class='intro' v-html="scope.row.title"></span>
                    </el-tooltip>
                </template>
            </el-table-column>
             <el-table-column label="学科.阶段">
                <template slot-scope="scope">
                    <span>{{scope.row.subject_name}}.{{scope.row.step|txtExchange(searchOption.step)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="题型">
                <template slot-scope="scope">
                    <span>{{scope.row.type|txtExchange(searchOption.type)}}</span>
                </template>
            </el-table-column>
             <el-table-column label="难度">
                <template slot-scope="scope">
                    <span>{{scope.row.difficulty|txtExchange(searchOption.difficulty)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="enterprise_name"
                label="企业">
            </el-table-column>
            <el-table-column
                prop="username"
                label="创建者">
            </el-table-column>
            <el-table-column label="状态">
                 <template slot-scope="scope">
                    <span :class="{red:!scope.row.status}" >{{scope.row.status | txtExchange(searchOption.status)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="reads"
                label="访问量">
            </el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button
                    size="mini" type="primary" @click="editDialog(scope.row)"
                    >编辑</el-button>
                    <el-button
                    size="mini"
                    :type="scope.row.status ? 'info' : 'success'"
                    @click="changeStatus(scope.row)"
                    >{{scope.row.status ? '禁用' :'启用'}}</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="del(scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.total">
    </el-pagination>
    </el-card>
    <diaLogComponent ref='dialog'></diaLogComponent>
    </div>
</template>
<script>
import {getQuestionList,getSelectOption,setStatus,del} from '@/api/question'
import diaLogComponent from '@/views/index/questions/edit'
import {deepClone} from '@/utils/tool'

export default {
    name:'question-list',
    //组件
    components:{
        diaLogComponent
    },
    data() {
      return {
        searchItem: {
          subject: '',//学科id
          step: '',//阶段id
          enterprise:'',//企业id
          type:'',//题型id
          difficulty:'',//难度
          username:'',//作者
          status:'',//状态
          create_date:'',//日期
          title:'',//标题
        },
        searchOption:{
          subject: [],//学科
          step: [],//阶段
          enterprise:[],//企业
          type:[],//题型
          difficulty:[],//难度
          status:[],//状态
        },
        tableData:  [],
        page:{
            currentPage:1,//当前页
            total:0,//数据总条数
            pageSize:10,//每页条数
            pageSizes:[10,1, 20, 30, 40,50],//每页条数选择
            layout:"total, sizes, prev, pager, next, jumper"//组件布局
        },
      }
    },
    watch: {
        //解决分页 删除或修改时当前页无数据 bug
        'page.total'(){
            if(this.page.total==(this.page.currentPage-1)*this.page.pageSize && this.page.total!=0){
                this.page.currentPage -= 1
                this.getQuestionList();
            }
        }
    },
    methods: {
      addDialog(){
        this.$refs.dialog.showDialog = true;
      },
      editDialog(question){
        //弹框子组件，数据格式转换
        this.$refs.dialog.showDialog = true;
        let val = deepClone(question);
        val.city = val.city.split(',');
        val.multiple_select_answer = val.multiple_select_answer.split(',').filter(v=>v.length>0);
        val.select_options.length && (this.$refs.dialog.select_options = val.select_options);
        this.$refs.dialog.editForm = val;
      },  
      onSubmit() {
        this.page.currentPage = 1;//页码还原
        this.getQuestionList();
      },
      //清除
      clear(){
          this.$refs.search.resetFields();
          this.page.currentPage = 1;//页码还原
          this.getQuestionList();
      },
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.getQuestionList();
      },
      handleCurrentChange(val) {
        this.page.currentPage = val;
        this.getQuestionList();
      },
      //搜索列表数据
      getQuestionList(){
        getQuestionList({
            limit: this.page.pageSize,
            page:this.page.currentPage,
            ...this.searchItem
        },res=>{
            this.tableData = res.items;
            this.page.total = res.pagination.total
        })
      },
      //更改状态
      changeStatus(row){
        this.$confirm(`是否确认${row.status ? '禁用':'启用'}?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
           setStatus({id:row.id},()=>{
               this.$message({
                    message: '操作成功',
                    type: 'success',
                    onClose:()=>{
                        this.getQuestionList();
                    }
               });
           });
            
        }).catch(() => {});
      },
      del(row){
        this.$confirm('是否确认删除', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
           del({id:row.id},()=>{
               this.$message({
                    message: '操作成功',
                    type: 'success',
                    onClose:()=>{
                        this.getQuestionList();
                    }
               });
           });
            
        }).catch(() => {});
      },
      preview(row){
          return row.pic ? row.pic.map(v=>{
              return process.env.VUE_APP_BASEURL+v;
          }) : [];
      }

    },
    filters:{
      userIntro(s){
          let keyArr = ['生日', '星座', '今年', '身高', '三围', '罩杯', '血型', '来自', '职业', '兴趣'];
          let format = keyArr.map((v, i, r) => {
                let start = s.indexOf(v) + v.length;
                let end = s.indexOf(r[i + 1]);
                let item = end < 0 ?s.substring(start):s.substring(start, end);
                return v+item;
            });
          return format.join(" ");
      },
    useravatar(url){
            return process.env.VUE_APP_BASEURL + url
     }
    },
    mounted() {
        this.getQuestionList();
        getSelectOption(res=>{
            this.searchOption = res;
        });//选项
    },
  }
</script>

<style lang="less">
    .question-container{
        .search-box{
            margin-bottom:19px;
            .el-form-item__label{
                text-align:center;
            }
            .min-input{
                width:100px;
            }
            .middle-input{
                width:150px;
            }
            .big-input{
                width:388px;
            }
        }

        .avatar{
            width:80px;
            height:80px;
            border-radius:50%;
        }

        .el-pagination{
            height:82px;
            padding-top:30px;
            margin-bottom:-10px;
            text-align:center;
        }
        .red{
            color:red;
        }
        .intro{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>