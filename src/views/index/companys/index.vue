<template>
    <div class='company-container'>
        <el-card class="box-card search-box">
            <el-form :inline="true" :model="searchItem" ref="search" class="demo-form-inline">
                <el-form-item label="企业编号" prop='eid'>
                    <el-input v-model.trim="searchItem.eid"></el-input>
                </el-form-item>
                <el-form-item label="企业名称" prop='name'>
                    <el-input v-model.trim="searchItem.name"></el-input>
                </el-form-item>
                <el-form-item label="创建者" prop="username">
                    <el-input v-model.trim="searchItem.username"></el-input>
                </el-form-item>
                <el-form-item label="请选择状态" prop="status">
                    <el-select v-model="searchItem.status">
                    <el-option v-for="itm in statusLable" :label="itm.title" :value="itm.value" :key="itm.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                    <el-button @click='clear'>清除</el-button>
                    <el-button type="primary" icon="el-icon-plus">新增企业</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-card table-box">
            <el-table :data="tableData" style="width: 100%">
            <el-table-column
                prop="id"
                label="序号">
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
                prop="create_time"
                label="创建日期">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <span :class="{red:!scope.row.status}" >{{scope.row.status | statusTitle(statusLable)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button
                    size="mini"
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
    </div>
</template>
<script>
import {getCompanyList,setStatus,delCompany} from '@/api/company'

export default {
    name:'companys-list',
    data() {
      return {
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
            pageSizes:[10, 20, 30, 40,50],//每页条数选择
            layout:"total, sizes, prev, pager, next, jumper"//组件布局
        },
        statusLable:[
            {title:'启用',value:1},
            {title:'禁用',value:0},
        ]
      }
    },
    methods: {
      onSubmit() {
        this.getListData();
      },
      clear(){
          this.$refs.search.resetFields();
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
        this.searchItem.limit =   this.page.pageSize;
        this.searchItem.page =   this.page.currentPage;
        getCompanyList(this.searchItem,res=>{
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