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
                    <el-button type="primary" icon="el-icon-plus" @click="addDialog">采集新用户</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card table-box">
            <div class="checkOpt">
                <el-checkbox class="check" size="mini" @change="allChange" v-model="isAllChecked"
                    key="all">全选</el-checkbox>
                <div>已选择 {{ selectedRows.length }} 项</div>
                <userTask size="mini" :disabled="!selectedRows.length" @submitCall="taskCallBack" />
                <el-button type="danger" size="mini" :disabled="!selectedRows.length"
                    @click="multiDel">批量删除</el-button>
                <el-button type="success" size="mini" :disabled="!selectedRows.length"
                    @click="multiUpdate">批量采集作品</el-button>
            </div>
        </el-card>
        <el-card class="box-card table-box" v-loading="loading">
            <div class="user-card">
                <el-card class="userBox" v-for="(item, index) in tableData" :key="index">
                    <el-checkbox class="check" size="mini" v-model="item.isChecked" :key="item.sec_uid"
                        @change="(e) => onChange(e, index)"></el-checkbox>
                    <div class="uheader" :style="{ backgroundImage: 'url(' + item.cover || '#fff' + ')' }">
                        <div class="uhbox">
                            <el-image class='avatar' :src="item.avatar" fit="cover"
                                @click="toDy(item.sec_uid)" lazy></el-image>
                            <div class="dtl">
                                <span class="nickname">{{ item.nickname }}</span>
                                <span>uid：{{ item.uid }}</span>
                                <span>{{ item.ip_location || 'IP属地：' }}</span>
                                <div class="dtlgroup">
                                    <span>性别：{{ item.gender | formatGender }}</span>
                                    <span>年龄：{{ item.user_age | formatAge }}</span>
                                </div>
                                <div class="dtlgroup">
                                    <span>籍贯：{{ item.province }} {{ item.city }}</span>
                                    <span>学校：{{ item.school_name }}</span>
                                </div>
                            </div>
                            <i class="el-icon-s-opportunity" v-if="item.got"></i>
                        </div>
                    </div>
                    <div class="uinfo">
                        <span>抖音号：{{ item.unique_id }}</span>
                        <span>粉丝：{{ item.follower_count | formatNumber }}</span>
                        <span>获赞：{{ item.total_favorited | formatNumber }}</span>
                    </div>
                    <div class="uinfo">
                        <span>关注：{{ item.following_count | formatNumber }}</span>
                        <span>喜欢：{{ item.favoriting_count | formatNumber }}</span>
                        <span>作品：{{ item.aweme_count | formatNumber }}</span>
                    </div>
                    <div class="uinfo">
                        <span>最新活跃时间：{{ item.alive_time | formatDateTime }}</span>
                    </div>
                    <div class="uinfo">
                        <el-tooltip placement="top" :content="item.signature">
                            <p class="signature">签名：{{ item.signature }}</p>
                        </el-tooltip>
                    </div>
                    <div class="group">
                        <el-tag v-for="group in item.groups" :key="group" size="mini" :color="optionsColor[group]">{{
                group
            }}</el-tag>
                    </div>
                    <div class="opt">
                        <el-button size="mini" type="primary" @click="toAweme(item)">已采集作品</el-button>
                        <el-button size="mini" type="success" @click="sendUpdate(item)">采集作品</el-button>
                        <el-button size="mini" type="warning" @click="multiShare(item)">批量分享</el-button>
                        <el-button size="mini" type="danger" @click="delUser(item.uid)">删除</el-button>
                        <addGroup :user="item" @submitCall="getUserList"></addGroup>
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
import { getUserList, delUser } from '@/api/user'
import diaLogComponent from '@/views/index/users/add'
import addGroup from '@/views/index/components/addGroup'
import userTask from '@/views/index/components/userTask'
import WebSocketClientManager from '@/utils/WebSocketClientManager';
import { mapState } from 'vuex'
import bus from '@/utils/bus';
const ws = WebSocketClientManager.getInstance();
export default {
    name: 'user-list',
    //组件
    components: {
        diaLogComponent,
        addGroup,
        userTask
    },
    data() {
        return {
            searchItem: {
                nickname: null,
                unique_id: null,
                gender: null,
                ip_location: null,
                got: null,
                group: null
            },
            tableData: [],
            loading: false,
            page: {
                currentPage: 1,//当前页
                total: 0,//数据总条数
                pageSize: 6,//每页条数
                pageSizes: [6, 9, 12, 15, 18, 21, 24, 27, 30, 60, 120, 180, 210],//每页条数选择
                layout: "total, sizes, prev, pager, next, jumper"//组件布局
            },
            genderLabel: [
                { title: '男', value: 1 },
                { title: '女', value: 2 },
            ],
            got_typeLabel: [
                { title: '已采集', value: 'y' },
                { title: '未采集', value: 'n' },
            ],
            isAllChecked: false
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
        toAweme(item) {
            this.$router.push({
                path: "/index/aweme",
                query: { author_user_id: item.uid }
            });
        },
        sendUpdate(item) {
            bus.$emit('openLog');
            this.$nextTick(() => {
                ws.sendMessage({ cmd: 'getUserInfo', content: item });
            })
        },
        multiDel() {
            this.delUser(this.selectedRows.map(o => o.uid))
        },
        multiUpdate() {
            if (this.selectedRows.length) {
                bus.$emit('openLog');
                this.$nextTick(() => {
                    ws.sendMessage({ cmd: 'getUserInfo', content: this.selectedRows });
                })
            }
        },
        // sendShare(item) {
        //     bus.$emit('openLog');
        //     this.$nextTick(() => {
        //         ws.sendMessage({ cmd: 'shareUserInfo', content: item });
        //     })
        // },
        multiShare() {
            this.$message({ type: 'warning', message: '开发中' })
        },
        toDy(sec_uid) {
            window.open(`${process.env.VUE_APP_DOUYIN_HOST}/user/${sec_uid}`, '_blank');
        },
        onChange(e, index) {
            this.$set(this.tableData, index, { ...this.tableData[index], isChecked: e })
            this.isAllChecked = this.tableData.every(o => o.isChecked)
        },
        addDialog() {
            this.$refs.dialog.showDialog = true;
        },
        delUser(uid) {
            this.$confirm('确认要删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delUser({ uids: Array.isArray(uid) ? uid : [uid] }).then(_ => {
                    this.handleCurrentChange(1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })

            })
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
            this.loading = true;
            getUserList({
                size: this.page.pageSize,
                page: this.page.currentPage,
                ...this.searchItem
            }, res => {
                this.tableData = res.items;
                this.page.total = res.total
                this.loading = false;
                this.isAllChecked = false;
            })
        },
        preview(row) {
            return row.pic ? row.pic.map(v => {
                return process.env.VUE_APP_BASEURL + v;
            }) : [];
        },
        allChange(e) {
            this.tableData = this.tableData.map(o => ({ ...o, isChecked: e }))
            this.isAllChecked = e;
        },
        taskCallBack(options) {
            const taskOptions = { ...options, userList: this.selectedRows };
            bus.$emit('openLog');
            this.$nextTick(() => {
                ws.sendMessage({ cmd: 'userTask', content: taskOptions });
            })
        }

    },
    filters: {

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
        selectedRows() {
            return this.tableData.filter(o => o.isChecked);
        }
    },
    mounted() {
        this.getUserList();
    },
    created() {
        bus.$on('getUserInfo', value => {
            this.getUserList();
        })
    }
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
                position: relative;

                .el-icon-s-opportunity {
                    position: absolute;
                    right: 5px;
                    top: 5px;
                    font-size: 30px;
                    font-weight: bold;
                    color: yellow;
                }

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
                height: 33px;
                color: #535360b8;
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
        }

        .opt {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
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