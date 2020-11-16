<template>
    <div class='user-container'>
        <el-card class="box-card search-box">
            <el-form :inline="true" :model="searchItem" ref="search" class="demo-form-inline">
                <el-form-item label="用户名称" prop='username' >
                    <el-input class='min-input' v-model.trim="searchItem.username"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱" prop='email'>
                    <el-input class='middle-input' v-model.trim="searchItem.email"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role_id">
                    <el-select class='middle-input'  v-model="searchItem.role_id">
                    <el-option v-for="rl in rolesLable" :label="rl.title" :value="rl.value" :key="rl.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户状态" prop="status">
                    <el-select class='middle-input'  v-model="searchItem.status">
                    <el-option v-for="itm in statusLable" :label="itm.title" :value="itm.value" :key="itm.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                    <el-button @click='clear'>清除</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click="addDialog">新增用户</el-button>
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
             <el-table-column label="头像">
                <template slot-scope="scope">
                    <el-image  v-if="scope.row.avatar"  class='avatar'
                        :src="scope.row.avatar | useravatar"
                        fit="cover"></el-image>
                </template>
            </el-table-column>
            <el-table-column
                prop="username"
                label="用户名">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="电话">
            </el-table-column>
             <el-table-column
                prop="email"
                label="邮箱">
            </el-table-column>
            <el-table-column
                prop="role"
                label="角色">
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <span :class="{red:!scope.row.status}" >{{scope.row.status | statusTitle(statusLable)}}</span>
                </template>
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
import {getUserList,setStatus,delUser,getRoles} from '@/api/user'
import diaLogComponent from '@/views/index/users/edit'
import {deepClone} from '@/utils/tool'

export default {
    name:'user-list',
    //组件
    components:{
        diaLogComponent
    },
    data() {
      return {
        searchItem: {
          username: '',
          email: '',
          role_id:'',
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
        ],
        rolesLable:[]
      }
    },
    watch: {
        //解决分页 删除或修改时当前页无数据 bug
        'page.total'(){
            if(this.page.total==(this.page.currentPage-1)*this.page.pageSize && this.page.total!=0){
                this.page.currentPage -= 1
                this.getUserList();
            }
        }
    },
    methods: {
      addDialog(){
        this.$refs.dialog.showDialog = true;
      },
      editDialog(user){
        this.$refs.dialog.showDialog = true;
        this.$refs.dialog.editForm = deepClone({
                id:user.id,//用户id
                username:user.username,//用户名
                email:user.email,//用户邮箱
                phone:user.phone,//电话
                role_id:user.role_id,//角色
                status:user.status,//状态
                remark:user.remark,//备注
        });
      },  
      onSubmit() {
        this.page.currentPage = 1;//页码还原
        this.getUserList();
      },
      //清除
      clear(){
          this.$refs.search.resetFields();
          this.page.currentPage = 1;//页码还原
          this.getUserList();
      },
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.getUserList();
      },
      handleCurrentChange(val) {
        this.page.currentPage = val;
        this.getUserList();
      },
      //搜索列表数据
      getUserList(){
        getUserList({
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
                        this.getUserList();
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
           delUser({id:row.id},()=>{
               this.$message({
                    message: '操作成功',
                    type: 'success',
                    onClose:()=>{
                        this.getUserList();
                    }
               });
           });
            
        }).catch(() => {});
      },

    },
    filters:{
     //状态
      statusTitle(status,statusLable){
         return statusLable[statusLable.findIndex(r=>r.value == status)].title;
      },
    useravatar(url){
            return process.env.VUE_APP_BASEURL + url
     }
    },
    mounted() {
        this.getUserList();
        getRoles(res=>{this.rolesLable = res});//角色
    },
  }
</script>

<style lang="less">
    .user-container{
        .search-box{
            margin-bottom:19px;
            .min-input{
                width:100px;
            }
            .middle-input{
                width:150px;
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
    }
</style>