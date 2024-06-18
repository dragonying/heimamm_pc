<template>
    <div class='comment-container'>
        <el-card class="box-card search-box">
            <el-form :inline="true" :model="searchItem" ref="search" class="demo-form-inline">
                <!-- <el-form-item label="aweme_id" prop='aweme_id'>
                    <el-input class='min-input' v-model.trim="searchItem.aweme_id"></el-input>
                </el-form-item> -->
                <el-form-item label="昵称" prop='nickname'>
                    <el-input class='min-input' v-model.trim="searchItem.nickname"></el-input>
                </el-form-item>
                <el-form-item label="抖音号" prop='unique_id'>
                    <el-input class='min-input' v-model.trim="searchItem.unique_id"></el-input>
                </el-form-item>
                <el-form-item label="IP" prop="ip_label">
                    <el-input class='min-input' v-model.trim="searchItem.ip_label"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="text">
                    <el-input class='middle-input' v-model.trim="searchItem.text"></el-input>
                </el-form-item>
                <el-form-item label="采集状态" prop="got">
                    <el-select class='min-input' v-model="searchItem.got">
                        <el-option v-for="itm in got_typeLabel" :label="itm.title" :value="itm.value"
                            :key="itm.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                    <el-button @click='clear'>清除</el-button>
                    <el-button type="success" :disabled="!multipleSelection.length"
                        @click="multiUpdate">批量采集</el-button>
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
                        <div class="avatarBox">
                            <el-image class='avatar' :src="scope.row.avatar" fit="cover"></el-image>
                            <i class="el-icon-s-opportunity" v-if="scope.row.got"></i>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="nickname" label="昵称" min-width="120">
                </el-table-column>
                <el-table-column prop="unique_id" label="抖音号" align="center" min-width="80">
                    <template slot-scope="scope">
                        {{ scope.row.unique_id || scope.row.short_id }}
                    </template>
                </el-table-column>
                <el-table-column prop="signature" label="签名" min-width="200">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" :content="scope.row.signature">
                            <div class="line2">
                                {{ scope.row.signature }}
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="ip_label" label="IP" align="center" width="50">
                </el-table-column>
                <el-table-column sortable prop="digg_count" label="点赞" align="center" width="80">
                </el-table-column>
                <el-table-column sortable prop="reply_comment_total" label="回复" align="center" width="80">
                </el-table-column>
                <el-table-column prop="text" label="评论内容" min-width="300">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" :content="scope.row.text">
                            <div class="line2">
                                {{ scope.row.text }}
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column sortable label="评论时间" align="center" min-width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.create_time | formatDateTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info" @click="toDy(scope.row.sec_uid)">查看</el-button>
                        <el-button size="mini" type="success" @click="sendUpdate(scope.row)">采集</el-button>
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
import { getCommentList } from '@/api/aweme'
import bus from '@/utils/bus';
import WebSocketClientManager from '@/utils/WebSocketClientManager';
const ws = WebSocketClientManager.getInstance();

export default {
    name: 'comment-list',
    //组件
    components: {
    },
    data() {
        return {
            loading: false,
            searchItem: {
                aweme_id: null,
                nickname: null,
                unique_id: null,
                ip_label: null,
                text: null,
                got: null
            },
            tableData: [],
            page: {
                currentPage: 1,//当前页
                total: 0,//数据总条数
                pageSize: 10,//每页条数
                pageSizes: [10, 20, 30, 40, 50],//每页条数选择
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
        search(aweme_id) {
            this.searchItem.aweme_id = aweme_id;
            this.getListData();
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
            const aweme_id = this.searchItem.aweme_id;
            this.$refs.search.resetFields();
            this.searchItem.aweme_id = aweme_id;
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
            getCommentList({
                size: this.page.pageSize,
                page: this.page.currentPage,
                ...this.searchItem
            }, res => {
                this.tableData = res.items;
                this.page.total = res.total;
                this.loading = false;
            })
        },
    }
}
</script>

<style lang="less" scope>
.comment-container {
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
}
</style>