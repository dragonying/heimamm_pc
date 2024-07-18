<template>
    <span>
        <el-button type="primary" size="mini" @click="openImageList">从图库选择</el-button>
        <el-dialog title="图库列表" width='50%' center :visible.sync="showDialog" append-to-body>
            <div class="imageList">
                <el-table :data="tableData" style="width: 100%" v-loading="loading" height="77vh">
                    <el-table-column prop="url" label="图片" align="center" width="150">
                        <template slot-scope="scope">
                            <el-popover placement="right" trigger="hover">
                                <el-image style="width: 300px" :src="scope.row.url | formatLocalImg"
                                    fit="fit"></el-image>
                                <div slot="reference">
                                    <el-image class='pic' :src="scope.row.url | formatLocalImg" fit="cover"></el-image>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="名称" min-width="200">
                    </el-table-column>
                    <el-table-column prop="size" label="大小" min-width="100">
                        <template slot-scope="scope">
                            {{ scope.row.size | formatFileSize }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <div class="opt">
                                <el-button size="mini" type="primary" @click="selectImg(scope.row.url)">选择</el-button>
                                <el-button size="mini" type="danger" @click="delPic(scope.row.url)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="page.currentPage" :page-sizes="page.pageSizes" :page-size="page.pageSize"
                    :layout="page.layout" :total="page.total">
                </el-pagination>
            </div>
        </el-dialog>
    </span>

</template>
<script>
import { getImageList, delImageList } from '@/api/index';

export default {
    name: 'image-list',
    //组件
    components: {
    },
    data() {
        return {
            showDialog: false,
            loading: false,
            tableData: [],
            page: {
                currentPage: 1,//当前页
                total: 0,//数据总条数
                pageSize: 10,//每页条数
                pageSizes: [10, 20],//每页条数选择
                layout: "total, sizes, prev, pager, next, jumper"//组件布局
            }
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
    },
    methods: {
        openImageList() {
            this.showDialog = true;
            this.tableData = [];
            this.page.currentPage = 1;
            this.getListData();
        },
        selectImg(url) {
            this.$emit('selectImg', { url });
        },
        delPic(url) {
            delImageList({ url }, () => {
                this.$message.success('删除成功');
                this.$emit('delImg', { url });
                this.getListData();
            })
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
            getImageList({
                size: this.page.pageSize,
                page: this.page.currentPage,
            }, res => {
                this.tableData = res.items;
                this.page.total = res.total;
                this.loading = false;
            })
        }
    }
}
</script>

<style lang="less" scope>
.el-dialog {
    .imageList {
        .pic {
            height: 40px;
        }

        .el-pagination {
            height: 40px;
            padding-top: 20px;
            text-align: center;
            margin-bottom: 0;
        }

        .opt {
            display: flex;
            justify-content: space-around;
        }
    }


}
</style>