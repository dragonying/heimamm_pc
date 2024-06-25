<template>
    <div class='group-container'>
        <el-card class="box-card search-box">
            <el-form :inline="true" :model="searchItem" ref="search" class="demo-form-inline">
                <el-form-item label="昵称" prop='nickname'>
                    <el-input class='min-input' v-model.trim="searchItem.nickname"></el-input>
                </el-form-item>
                <el-form-item label="采集状态" prop="got">
                    <el-select class='min-input' v-model="searchItem.got">
                        <el-option v-for="itm in got_typeLabel" :label="itm.title" :value="itm.value"
                            :key="itm.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户组" prop="group">
                    <el-select class='middle-input' v-model="searchItem.group">
                        <el-option v-for="itm in options" :label="itm" :value="itm" :key="itm.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                    <el-button @click='clear'>清除</el-button>
                    <el-button type="success" :disabled="!multipleSelection.length"
                        @click="multiUpdate">批量采集</el-button>
                    <el-button type="danger" :disabled="!multipleSelection.length" @click="multiDel">批量删除</el-button>
                    <addGroup :disabled="!multipleSelection.length" :user="multipleSelection" size="large"
                        @submitCall="getListData"></addGroup>
                    <userTask size="large" :disabled="!multipleSelection.length" @submitCall="taskCallBack" />
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-card table-box">
            <el-table :data="tableData" size="small" style="width: 100%" @selection-change="handleSelectionChange"
                v-loading="loading">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column prop="avatar" label="头像" align="center" width="80">
                    <template slot-scope="scope">
                        <el-popover placement="right" trigger="hover">
                            <el-image style="width: 300px" :src="scope.row.avatar" fit="fit"></el-image>
                            <div class="avatarBox" slot="reference">
                                <el-image class='avatar' :src="scope.row.avatar" fit="cover"></el-image>
                                <i class="el-icon-s-opportunity" v-if="scope.row.got"></i>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="uid" label="uid" align="center" width="200">
                </el-table-column>
                <el-table-column prop="nickname" label="昵称" min-width="200">
                </el-table-column>
                <el-table-column prop="groups" label="用户组" min-width="200">
                    <template slot-scope="scope">
                        <div class="group">
                            <el-tag v-for="group in scope.row.groups" :key="group" size="mini"
                                :color="optionsColor[group]">{{ group
                                }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <div class="opt">
                            <el-button size="mini" type="primary" @click="toDy(scope.row.sec_uid)">查看</el-button>
                            <el-button size="mini" type="success" @click="sendUpdate(scope.row)">采集</el-button>
                            <el-button size="mini" type="danger" @click="del(scope.row.uid)">删除</el-button>

                            <addGroup :user="scope.row" @submitCall="getListData"></addGroup>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="page.currentPage" :page-sizes="page.pageSizes" :page-size="page.pageSize"
                :layout="page.layout" :total="page.total">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
import { groupUserDel, groupUserList } from '@/api/user';
import addGroup from '@/views/index/components/addGroup';
import { mapState } from 'vuex'
import userTask from '@/views/index/components/userTask'
import bus from '@/utils/bus';
import WebSocketClientManager from '@/utils/WebSocketClientManager';
const ws = WebSocketClientManager.getInstance();

export default {
    name: 'group-list',
    //组件
    components: {
        addGroup,
        userTask
    },
    data() {
        return {
            loading: false,
            searchItem: {
                nickname: null,
                group: null
            },
            tableData: [],
            page: {
                currentPage: 1,//当前页
                total: 0,//数据总条数
                pageSize: 10,//每页条数
                pageSizes: [10, 20, 30, 40, 50, 100, 200, 300],//每页条数选择
                layout: "total, sizes, prev, pager, next, jumper"//组件布局
            },
            multipleSelection: [],
            got_typeLabel: [
                { title: '已采集', value: 'y' },
                { title: '未采集', value: 'n' },
            ],
        }
    },
    watch: {
        //解决分页 删除或修改时当前页无数据 bug
        'page.total'() {
            if (this.page.total == (this.page.currentPage - 1) * this.page.pageSize && this.page.total != 0) {
                this.page.currentPage -= 1
                this.getListData();
            }
        }
    },
    computed: {
        ...mapState({
            options: state => state.groupOptions,
            optionsColor: state => {
                let mp = {};
                state.groupOptions.forEach(o => {
                    mp[o] = '#' + Math.floor(Math.random() * 16777215).toString(16);
                })
                return mp;
            }
        }),
    },
    mounted() {
        this.getListData();
    },
    methods: {
        multiUpdate() {
            bus.$emit('openLog');
            this.$nextTick(() => {
                ws.sendMessage({ cmd: 'getUserInfo', content: this.multipleSelection });
            })
        },
        toDy(sec_uid) {
            window.open(`${process.env.VUE_APP_DOUYIN_HOST}/user/${sec_uid}`, '_blank');
        },
        sendUpdate(item) {
            bus.$emit('openLog');
            this.$nextTick(() => {
                ws.sendMessage({ cmd: 'getUserInfo', content: item });
            })
        },
        multiDel() {
            this.del(this.multipleSelection.map(o => o.uid));
        },
        del(uid) {
            this.$confirm('确认要删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                groupUserDel({ uids: Array.isArray(uid) ? uid : [uid] }).then(_ => {
                    this.handleCurrentChange(1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })

            })
        },
        reset() {
            this.searchItem = this.$options.data().searchItem;
            this.tableData = [];
            this.page = this.$options.data().page;
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        onSubmit() {
            this.page.currentPage = 1;
            this.getListData();
        },
        clear() {
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
        getListData() {
            this.loading = true;
            groupUserList({
                size: this.page.pageSize,
                page: this.page.currentPage,
                ...this.searchItem
            }, res => {
                this.tableData = res.items;
                this.page.total = res.total;
                this.loading = false;
                this.multipleSelection = [];
            })
        },
        taskCallBack(options) {
            const taskOptions = { ...options, userList: this.multipleSelection };
            bus.$emit('openLog');
            this.$nextTick(() => {
                ws.sendMessage({ cmd: 'userTask', content: taskOptions });
            })
        }
    }
}
</script>

<style lang="less" scope>
.group-container {
    .search-box {
        margin-bottom: 19px;

        .min-input {
            width: 100px;
        }

        .middle-input {
            width: 150px;
        }
    }

    .avatar {
        width: 40px !important;
        height: 40px !important;
        border-radius: 50%;
    }

    .line2 {
        width: 100%;
        overflow: hidden;
        /*超出文本隐藏*/
        text-overflow: ellipsis;
        /*超出部分省略号显示 */
        display: -webkit-box;
        /*弹性盒模型*/
        -webkit-box-orient: vertical;
        /*上下垂直*/
        -webkit-line-clamp: 2;
        /*自定义行数*/
    }

    .avatarBox {
        position: relative;

        .el-icon-s-opportunity {
            position: absolute;
            right: 5px;
            top: 5px;
            font-size: 16px;
            font-weight: bold;
            color: yellow;
        }
    }

    .el-pagination {
        height: 82px;
        padding-top: 30px;
        margin-bottom: -10px;
        text-align: center;
    }

    .opt {
        display: flex;
        justify-content: space-around;
    }

    .group {
        padding-bottom: 5px;
        height: 30px;

        .el-tag {
            font-size: 10px;
            color: #fff;
        }

    }
}
</style>