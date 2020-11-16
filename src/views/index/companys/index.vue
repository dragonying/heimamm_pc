<template>
    <div class='company-container'>
        <el-card class="box-card search-box">
            <el-form :inline="true" :model="searchItem" ref="search" class="demo-form-inline">
                <el-form-item label="企业编号" prop='eid' >
                    <el-input class='min-input' v-model.trim="searchItem.eid"></el-input>
                </el-form-item>
                <el-form-item label="企业名称" prop='name'>
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
                    <el-button type="primary" icon="el-icon-plus" @click="addDialog">新增企业</el-button>
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
                prop="eid"
                label="企业编号">
            </el-table-column>
            <el-table-column
                prop="name"
                label="企业名称">
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
import {getCompanyList,setStatus,delCompany} from '@/api/company'
import diaLogComponent from '@/views/index/companys/edit'
import moment from 'moment'

export default {
    name:'companys-list',
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
          eid: '',
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
    methods: {
      //处理分页bug
      dealPageBug(){
        if(this.tableData.length == 1 && this.page.currentPage > 1){
            this.page.currentPage--;
        }
      },
      addDialog(){
        this.dialogItem.show = true;
      },
      editDialog(id){
        this.dialogItem.show = true;
        this.dialogItem.id = id;
      },  
      onSubmit() {
        this.page.currentPage = 1;
        this.getListData();
      },
      clear(){
          this.page.currentPage = 1;
          this.$refs.search.resetFields();
          this.getListData();
      },
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.getListData();
      },
      handleCurrentChange(val) {
        this.page.currentPage = val;
        this.getListData();
      },
      //搜索列表数据
      getListData(){
        getCompanyList({
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
        this.$confirm(`是否确认${row.status ? '启用':'禁用'}?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
           setStatus({id:row.id},()=>{
               this.$message({
                    message: '操作成功',
                    type: 'success',
                    onClose:()=>{
                        !Object.is(this.searchItem.status,'')  && this.dealPageBug();
                        this.getListData();
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
           delCompany({id:row.id},()=>{
               this.$message({
                    message: '操作成功',
                    type: 'success',
                    onClose:()=>{
                         this.dealPageBug();
                        this.getListData();
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
        this.getListData()
    },
  }
</script>

<style lang="less">
    .company-container{
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