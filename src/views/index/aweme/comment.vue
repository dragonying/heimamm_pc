<template>
    <div class='comment-container'>
        <el-card class="box-card search-box">
            <el-form :inline="true" :model="searchItem" ref="search" class="demo-form-inline">
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
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                    <el-button @click='clear'>清除</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-card table-box">
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column prop="avatar" label="头像" align="center" width="80">
                    <template slot-scope="scope">
                        <el-image class='avatar' :src="scope.row.avatar" fit="cover"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="nickname" label="昵称" min-width="100">
                </el-table-column>
                <el-table-column prop="unique_id" label="抖音号" align="center" min-width="80">
                </el-table-column>
                <el-table-column prop="signature" label="签名" min-width="200">
                </el-table-column>
                <el-table-column prop="ip_label" label="IP" align="center" width="50">
                </el-table-column>
                <el-table-column prop="digg_count" label="点赞" align="center" width="50">
                </el-table-column>
                <el-table-column prop="reply_comment_total" label="回复" align="center" width="50">
                </el-table-column>
                <el-table-column prop="text" label="评论内容" min-width="200">
                </el-table-column>
                <el-table-column label="评论时间" align="center" min-width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.create_time | formatDate }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="创建日期" align="center" min-width="120">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.create_time" placement="top-start">
                            <span>{{ scope.row.create_time | formatDate }}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="editDialog(scope.row.id)">查看</el-button>
                        <el-button size="mini" type="danger" @click="del(scope.row)">采集</el-button>
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
import { getCompanyList,} from '@/api/company'

export default {
    name: 'companys-list',
    //组件
    components: {
    },
    data() {
        return {
            searchItem: {
                nickname: null,
                unique_id: null,
                ip_label: null,
                text: null
            },
            tableData: [
                {
                    "cid": "7374234638383858466",
                    "text": "199白金的白天人多跑不满，凌晨4点也跑不了，只有700多有没有大流量卡的推荐啊",
                    "aweme_id": "7374107095110552872",
                    "create_time": 1716950549,
                    "digg_count": 5,
                    "uid": "3437496256702419",
                    "short_id": "48368314298",
                    "nickname": "断翅的飞鸟 ღ ♡ ❣ ❤ ❥ ❦  ❧",
                    "unique_id": "48368314298",
                    "sec_uid": "MS4wLjABAAAAHIHCtByFHIMXMIUnM3tSJqoBKc9nq21zJTG6GOzX_U56_07nVtu5lY1M4nd9Eoak",
                    "ip_label": "山东",
                    "avatar": "https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/mosaic-legacy_31137000467a5f2cd2de4.jpeg?from=2956013662",
                    "signature": "当你压力大到快要崩溃的时候，不要给别人讲，也不要觉得自己很委屈，因为没有人会心疼你，该干什么干什么",
                    "reply_comment_total": 2
                }
            ],
            page: {
                currentPage: 1,//当前页
                total: 0,//数据总条数
                pageSize: 10,//每页条数
                pageSizes: [10, 1, 20, 30, 40, 50],//每页条数选择
                layout: "total, sizes, prev, pager, next, jumper"//组件布局
            },
            multipleSelection: []
        }
    },
    watch: {
        //解决分页 删除或修改时当前页无数据 bug
        'page.total'(){
            if(this.page.total==(this.page.currentPage-1)*this.page.pageSize && this.page.total!=0){
                this.page.currentPage -= 1
                this.getListData();
            }
        }
    },
    methods: {
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
            getCompanyList({
                limit: this.page.pageSize,
                page: this.page.currentPage,
                ...this.searchItem
            }, res => {
                this.tableData = res.items;
                this.page.total = res.total
            })
        },
    },
    mounted() {
        this.getListData()
    },
}
</script>

<style lang="less">
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

    .el-pagination {
        height: 82px;
        padding-top: 30px;
        margin-bottom: -10px;
        text-align: center;
    }
}
</style>