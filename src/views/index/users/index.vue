<template>
    <div class='user-container'>
        <el-card class="box-card search-box">
            <el-form :inline="true" :model="searchItem" ref="search" class="demo-form-inline">
                <el-form-item label="昵称" prop='nickname'>
                    <el-input class='min-input' v-model.trim="searchItem.nickname"></el-input>
                </el-form-item>
                <el-form-item label="抖音号" prop='unique_id'>
                    <el-input class='min-input' v-model.trim="searchItem.unique_id"></el-input>
                </el-form-item>
                <el-form-item label="IP属地" prop='ip_location'>
                    <el-input class='min-input' v-model.trim="searchItem.ip_location"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-select class='min-input' v-model="searchItem.gender">
                        <el-option v-for="itm in genderLabel" :label="itm.title" :value="itm.value"
                            :key="itm.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                    <el-button @click='clear'>清除</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click="addDialog">采集新用户</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card table-box">
            <div class="checkOpt">
                <div>已选择 {{ selectedRows.length }} 项</div>
                <el-button type="danger" size="mini" :disabled="!selectedRows.length" icon="el-icon-upload"
                    @click="addDialog">创建任务</el-button>
            </div>
        </el-card>
        <el-card class="box-card table-box">
            <div class="user-card">
                <el-card class="userBox" v-for="(item, index) in tableData" :key="index">
                    <el-checkbox class="check" size="mini" :checked="selectedRows.includes(item.unique_id)"
                        @change="(e) => onChange(e, item.unique_id)"></el-checkbox>
                    <div class="uheader" :style="{ backgroundImage: 'url(' + item.cover || '#fff' + ')' }">
                        <div class="uhbox">
                            <el-image class='avatar' :src="item.avatar" fit="cover"
                                @click="toDy(item.sec_uid)"></el-image>
                            <div class="dtl">
                                <span class="nickname">{{ item.nickname }}</span>
                                <span>uid：{{ item.uid }}</span>
                                <span>{{ item.ip_location }}</span>
                                <div class="dtlgroup">
                                    <span>性别：{{ item.gender | formatGender }}</span>
                                    <span>年龄：{{ item.user_age }}</span>
                                </div>
                                <div class="dtlgroup">
                                    <span>籍贯：{{ item.province }} {{ item.city }}</span>
                                    <span>学校：{{ item.school_name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="uinfo">
                        <span>抖音号：{{ item.unique_id }}</span>
                        <span>粉丝：{{ item.follower_count }}</span>
                        <span>获赞：{{ item.total_favorited }}</span>
                    </div>
                    <div class="uinfo">
                        <span>关注：{{ item.following_count }}</span>
                        <span>喜欢：{{ item.favoriting_count }}</span>
                        <span>作品：{{ item.aweme_count }}</span>
                    </div>
                    <div class="uinfo">
                        <p class="signature">签名：{{ item.signature }}</p>
                    </div>
                    <div class="opt">
                        <el-button size="mini" type="primary" @click="toAweme(item)">查看作品</el-button>
                        <el-button size="mini" type="success" @click="sendUpdate(item)">更新数据</el-button>
                        <el-button size="mini" type="warning" @click="sendShare(item)">批量分享</el-button>
                    </div>
                </el-card>
            </div>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="page.currentPage" :page-sizes="page.pageSizes" :page-size="page.pageSize"
                :layout="page.layout" :total="page.total">
            </el-pagination>
        </el-card>
        <diaLogComponent ref='dialog'></diaLogComponent>
    </div>
</template>
<script>
import { getUserList } from '@/api/user'
import diaLogComponent from '@/views/index/users/add'
import WebSocketClientManager from '@/utils/WebSocketClientManager';
const ws = WebSocketClientManager.getInstance();
export default {
    name: 'user-list',
    //组件
    components: {
        diaLogComponent
    },
    data() {
        return {
            searchItem: {
                nickname: null,
                unique_id: null,
                gender: null,
                ip_location: null
            },
            tableData: [],
            page: {
                currentPage: 1,//当前页
                total: 0,//数据总条数
                pageSize: 6,//每页条数
                pageSizes: [6, 9, 12, 15, 18, 21, 24, 27, 30],//每页条数选择
                layout: "total, sizes, prev, pager, next, jumper"//组件布局
            },
            genderLabel: [
                { title: '男', value: 1 },
                { title: '女', value: 2 },
            ],
            selectedRows: []
        }
    },
    watch: {
        //解决分页 删除或修改时当前页无数据 bug
        'page.total'() {
            if (this.page.total == (this.page.currentPage - 1) * this.page.pageSize && this.page.total != 0) {
                this.page.currentPage -= 1
                this.getUserList();
            }
        }
    },
    methods: {
        toAweme(item){
            this.$router.push({
                path:"/index/aweme",
                query:{author_user_id:item.uid}   
            });
        },
        sendUpdate(item) {
            ws.sendMessage({ cmd: 'updateUserInfo', content: item });
        },
        sendShare(item) {
            ws.sendMessage({ cmd: 'shareUserInfo', content: item });
        },
        toDy(sec_uid) {
            window.open(`${process.env.VUE_APP_DOUYIN_HOST}/user/${sec_uid}`, '_blank');
        },
        onChange(e, unique_id) {
            const idx = this.selectedRows.indexOf(unique_id);
            idx > -1 ? this.selectedRows.splice(idx, 1) : this.selectedRows.push(unique_id);
        },
        addDialog() {
            this.$refs.dialog.showDialog = true;
        },
        onSubmit() {
            this.page.currentPage = 1;//页码还原
            this.getUserList();
        },
        //清除
        clear() {
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
        getUserList() {
            getUserList({
                size: this.page.pageSize,
                page: this.page.currentPage,
                ...this.searchItem
            }, res => {
                this.tableData = res.items;
                this.page.total = res.total
            })
        },
        preview(row) {
            return row.pic ? row.pic.map(v => {
                return process.env.VUE_APP_BASEURL + v;
            }) : [];
        }

    },
    filters: {
        formatGender(gender) {
            return gender == 1 ? '男' : gender == 2 ? '女' : '未知';
        }
    },
    computed: {
    },
    mounted() {
        this.getUserList();
    },
}
</script>

<style lang="less">
.user-container {
    .search-box {
        margin-bottom: 19px;

        .min-input {
            width: 100px;
        }

        .middle-input {
            width: 150px;
        }
    }

    .checkOpt {
        display: flex;
        align-items: center;

        &>* {
            margin-right: 20px;
        }
    }

    .user-card {
        display: flex;
        flex-wrap: wrap;
    }

    .userBox {
        color: #161823;
        margin-bottom: 20px;
        position: relative;
        width: 32%;
        margin-right: 1%;

        .check {
            position: absolute;
            top: 0;
            left: 5px;
        }

        &:hover {
            background: #000;
            color: #fff;

            .uhbox {
                background: rgba(0, 0, 0, .6) !important;
                color: #fff;
            }

            .signature {
                color: #fff !important;
            }

        }

        .uheader {
            background: #fff no-repeat center / cover;

            .uhbox {
                display: flex;
                align-items: center;
                margin-bottom: 8px;
                padding: 10px;
                background: rgba(255, 255, 255, .8);

                .dtl {
                    font-size: 12px;
                    display: flex;
                    flex-direction: column;
                    flex: 1;

                    .nickname {
                        font-size: 16px;
                        font-weight: bold;
                    }

                    .dtlgroup {
                        width: 100%;
                        display: flex;

                        span {
                            flex: 1;
                        }
                    }

                }

            }

        }

        .uinfo {
            font-size: 12px;
            margin-bottom: 5px;

            &>* {
                margin: 8px;
            }

            .signature {
                color: #535360b8;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }


    }

    .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 10px;
        cursor: pointer;
    }

    .el-pagination {
        height: 82px;
        padding-top: 30px;
        margin-bottom: -10px;
        text-align: center;
    }

    .red {
        color: red;
    }
}
</style>