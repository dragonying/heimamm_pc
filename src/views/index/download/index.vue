<template>
    <div class='download-container'>
        <el-card class="box-card search-box">
            <el-form :inline="true" :model="searchItem" ref="search" class="demo-form-inline">
                <el-form-item label="描述" prop='desc'>
                    <el-input class='middle-input' v-model.trim="searchItem.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                    <el-button @click='clear'>清除</el-button>
                    <el-button type="danger" :disabled="!multipleSelection.length" @click="multiDel">批量删除</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-card table-box">
            <el-table :data="tableData" size="small" style="width: 100%" @selection-change="handleSelectionChange"
                v-loading="loading">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column prop="aweme_id" label="作品ID" width="200">
                </el-table-column>
                <el-table-column prop="desc" label="描述" min-width="200">
                    <template slot-scope="scope">
                        <div class="line2">{{ scope.row.desc }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="cover" label="封面" align="center" width="130">
                    <template slot-scope="scope">
                        <el-image class='cover' :src="scope.row.video.cover" fit="cover"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="f_size" label="大小" align="center" width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.f_size | formatFileSize }}</span>
                    </template>
                </el-table-column>
                <el-table-column sortable prop="f_mtime" label="下载时间" align="center" width="150">
                    <template slot-scope="scope">
                        <span>{{ scope.row.f_mtime | formatDateTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="300">
                    <template slot-scope="scope">
                        <div class="opt">
                            <el-button size="mini" type="primary" @click="toDy(scope.row)">原著</el-button>
                            <el-button size="mini" type="success" @click="toPlay(scope.row.video)">预览</el-button>
                            <el-button size="mini" type="warning" @click="open(scope.row.video.filePath)">打开</el-button>
                            <el-button size="mini" type="danger" @click="del(scope.row.aweme_id)">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="page.currentPage" :page-sizes="page.pageSizes" :page-size="page.pageSize"
                :layout="page.layout" :total="page.total">
            </el-pagination>
        </el-card>
        <el-dialog title="视频播放" width="600" center :visible.sync="showDialog" @closed="closeHandler">
            <div class="media">
                <video controls v-if="video">
                    <source :src="video.play_url" :type="`video/${video.format}`">
                </video>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getDownloadList,downloadDel } from '@/api/aweme';
import addGroup from '@/views/index/components/addGroup';
import WebSocketClientManager from '@/utils/WebSocketClientManager';
import bus from '@/utils/bus';
const ws = WebSocketClientManager.getInstance();
export default {
    name: 'download-list',
    //组件
    components: {
        addGroup
    },
    data() {
        return {
            loading: false,
            searchItem: {
                desc: null
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
            showDialog: false,
            video: null,
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
    mounted() {
        this.getListData();
    },
    methods: {
        open(filePath){
            ws.sendMessage({ cmd: 'openFile', content: filePath });
        },
        del(aweme_id){
            this.$confirm('确认要删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                downloadDel({ aweme_ids: Array.isArray(aweme_id) ? aweme_id : [aweme_id] }).then(_ => {
                    this.handleCurrentChange(1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })

            })
        },
        multiDel(){
            this.del(this.multipleSelection.map(o=>o.aweme_id))
        },
        toDy(item) {
            const { aweme_id, media_type } = item;
            window.open(`${process.env.VUE_APP_DOUYIN_HOST}/${media_type == 4 ? 'video' : 'note'}/${aweme_id}`, '_blank');
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
        toPlay(video) {
            this.video = video;
            this.showDialog = true;
        },
        closeHandler() {
            this.video = null;
            this.showDialog = false;
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
            getDownloadList({
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
    }
}
</script>

<style lang="less" scope>
.download-container {
    .search-box {
        margin-bottom: 19px;

        .min-input {
            width: 100px;
        }

        .middle-input {
            width: 150px;
        }
    }

    .cover {
        width: 130px;
        height: 65px;
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

    .media {
        text-align: center;
        background-color: black;
        video {
            width: 50%;
        }
    }

}
</style>