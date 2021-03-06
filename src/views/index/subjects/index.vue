<template>
    <div class='subject-container'>
        <el-card class="box-card search-box">
            <el-form :inline="true" :model="searchItem" ref="search" class="demo-form-inline">
                <el-form-item label="学科编号" prop='rid' >
                    <el-input class='min-input' v-model.trim="searchItem.eid"></el-input>
                </el-form-item>
                <el-form-item label="学科名称" prop='name'>
                    <el-input class='middle-input' v-model.trim="searchItem.name"></el-input>
                </el-form-item>
                <el-form-item label="创建者" prop="username">
                    <el-input class='min-input' v-model.trim="searchItem.username"></el-input>
                </el-form-item>
                <el-form-item label="请选择状态" prop="status">
                    <el-select class='middle-input'  v-model="searchItem.status">
                    <el-option v-for="itm in statusLable" :label="itm.title" :value="itm.value" :key="itm.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                    <el-button @click='clear'>清除</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click="addDialog">新增学科</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-card table-box">
            <el-table :data="tableData" style="width: 100%">
            <el-table-column
                type="index"
                label="序号">
            </el-table-column>
            <el-table-column
                prop="id"
                label="ID">
            </el-table-column>
            <el-table-column
                prop="rid"
                label="学科编号">
            </el-table-column>
            <el-table-column
                prop="name"
                label="学科名称">
            </el-table-column>
             <el-table-column
                prop="short_name"
                label="简称">
            </el-table-column>
            <el-table-column
                prop="username"
                label="创建者">
            </el-table-column>
            <el-table-column
                label="创建日期">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.create_time" placement="top-start">
                        <span>{{scope.row.create_time | formatDate}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <span :class="{red:!scope.row.status}" >{{scope.row.status | statusTitle(statusLable)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button
                    size="mini" type="primary" @click="editDialog(scope.row.id)"
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
    <diaLogComponent ref='dialog' :dialogItem="dialogItem"></diaLogComponent>
    </div>
</template>
<script>
import {getSubjectList,setStatus,delSubject} from '@/api/subject'
import diaLogComponent from '@/views/index/subjects/edit'
import moment from 'moment'

export default {
    name:'subject-list',
    //组件
    components:{
        diaLogComponent
    },
    data() {
      return {
        dialogItem:{
            show:false,
            id:'',//
        },//弹窗
        searchItem: {
          rid: '',
          name: '',
          username:'',
          status:''
        },
        tableData:  [],
        page:{
            currentPage:1,//当前页
            total:0,//数据总条数
            pageSize:10,//每页条数
            pageSizes:[10,1, 20, 30, 40,50],//每页条数选择
            layout:"total, sizes, prev, pager, next, jumper"//组件布局
        },
        statusLable:[
            {title:'启用',value:1},
            {title:'禁用',value:0},
        ]
      }
    },
    watch: {
        //解决分页 删除或修改时当前页无数据 bug
        'page.total'(){
            if(this.page.total==(this.page.currentPage-1)*this.page.pageSize && this.page.total!=0){
                this.page.currentPage -= 1
                this.getSubjectList();
            }
        }
    },
    methods: {
      addDialog(){
        this.dialogItem.show = true;
      },
      editDialog(id){
        this.dialogItem.show = true;
        this.dialogItem.id = id;
      },  
      onSubmit() {
        this.page.currentPage = 1;//页码还原
        this.getSubjectList();
      },
      //清除
      clear(){
          this.$refs.search.resetFields();
          this.page.currentPage = 1;//页码还原
          this.getSubjectList();
      },
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.getSubjectList();
      },
      handleCurrentChange(val) {
        this.page.currentPage = val;
        this.getSubjectList();
      },
      //搜索列表数据
      getSubjectList(){
        getSubjectList({
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
                        this.getSubjectList();
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
           delSubject({id:row.id},()=>{
               this.$message({
                    message: '操作成功',
                    type: 'success',
                    onClose:()=>{
                        this.getSubjectList();
                    }
               });
           });
            
        }).catch(() => {});
      }
    },
    filters:{
     //状态
      statusTitle(status,statusLable){
         return statusLable[statusLable.findIndex(r=>r.value == status)].title;
      },
      //日期格式化
      formatDate(val){
          return moment(val).format('YYYY年MM月DD日')
      }
    },
    mounted() {
        this.getSubjectList()
    },
  }
</script>

<style lang="less">
    .subject-container{
        .search-box{
            margin-bottom:19px;
            .min-input{
                width:100px;
            }
            .middle-input{
                width:150px;
            }
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
    }
</style>