<template>
    <div class='user-container'>
        <el-card class="box-card search-box">
            <el-form :inline="true" :model="searchItem" ref="search" class="demo-form-inline">
                <el-form-item label="名称" prop='desc'>
                    <el-input class='min-input' v-model.trim="searchItem.desc"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="media_type">
                    <el-select class='min-input' v-model="searchItem.media_type">
                        <el-option v-for="itm in media_typeLabel" :label="itm.title" :value="itm.value"
                            :key="itm.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="采集状态" prop="got">
                    <el-select class='min-input' v-model="searchItem.got">
                        <el-option v-for="itm in got_typeLabel" :label="itm.title" :value="itm.value"
                            :key="itm.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="评论数排序" prop="comment_sort">
                    <el-select class='min-input' v-model="searchItem.comment_sort">
                        <el-option v-for="itm in comment_sortLabel" :label="itm.title" :value="itm.value"
                            :key="itm.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="评论数>=" prop="commentMin">
                    <el-input-number v-model="searchItem.commentMin" :min="0" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                    <el-button @click='clear'>清除</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click="addDialog">采集新作品</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card table-box">
            <div class="checkOpt">
                <el-checkbox class="check" size="mini" @change="allChange" v-model="isAllChecked"
                    key="all">全选</el-checkbox>
                <div>已选择 {{ selectedRows.length }} 项</div>
                <el-button type="success" size="mini" :disabled="!selectedRows.length"
                    @click="multiUpdate">批量采集评论</el-button>
                <el-button type="danger" size="mini" :disabled="!selectedRows.length" @click="multiDel">批量删除</el-button>
                <el-button v-if="searchItem.author_user_id" type="warning" size="mini" :disabled="!selectedRows.length"
                    @click="multiToComment">批量查看评论</el-button>
            </div>
        </el-card>
        <el-card class="box-card table-box">
            <div class="user-card" v-loading="loading">
                <el-card class="userBox" v-for="(item, index) in tableData" :key="index">
                    <div v-if="item.media_type == 4">
                        <el-checkbox class="check" size="mini" v-model="item.isChecked" :key="item.aweme_id"
                            @change="(e) => onChange(e, index)"></el-checkbox>
                        <div class="videoBox">
                            <div class="videoInfo" v-if="item.video">
                                <el-image class='cover' :src="item.video.cover" fit="cover" @click="toPlay(item.video)"
                                    lazy></el-image>
                                <el-image class='animated' :src="item.video.animated_cover || item.video.cover"
                                    fit="cover" @click="toPlay(item.video)"></el-image>
                                <div class="statistics">
                                    <i class="el-icon-thumb">{{ item.statistics.digg_count | formatNumber }}</i>
                                    <i class="el-icon-chat-dot-round">{{ item.statistics.comment_count | formatNumber
                                        }}</i>
                                    <i class="el-icon-star-off">{{ item.statistics.collect_count | formatNumber }}</i>
                                    <i class="el-icon-position">{{ item.statistics.share_count | formatNumber }}</i>
                                </div>
                                <i class="el-icon-s-opportunity" v-if="item.got"></i>
                            </div>
                            <div class="detail">
                                <div class="vd">
                                    <div class="opt">
                                        <h4>视频信息</h4>
                                        <i class="el-icon-download" @click="downloadVideo(item)">下载</i>
                                    </div>
                                    <p>像素：{{ item.video.ratio }}</p>
                                    <p>尺寸：{{ item.video.width }} x {{ item.video.height }}</p>
                                    <p>大小：{{ item.video.data_size | formatFileSize }}</p>
                                    <p>时长：{{ item.duration | formatSeconds }}</p>
                                    <p>创建：{{ item.create_time | formatDate }}</p>
                                </div>
                                <div class="vd">
                                    <div class="opt">
                                        <h4>音频信息</h4>
                                        <!-- <i class="el-icon-download">下载</i> -->
                                    </div>
                                    <p>名称：{{ item.music.title }}</p>
                                    <p>作者：{{ item.music.author }}</p>
                                    <el-button type="success" plain size="mini" icon="el-icon-headset"
                                        @click="playMusic(item.music.play_url)">播放音乐</el-button>
                                </div>
                            </div>
                        </div>
                        <div class="uinfo">
                            <el-tooltip placement="top" :content="item.desc">
                                <p class="desc">{{ item.desc }}</p>
                            </el-tooltip>
                        </div>
                        <div class="opt">
                            <el-button size="mini" type="info" @click="toDy(item)">抖音查看</el-button>
                            <el-button size="mini" type="primary" @click="toComment(item.aweme_id)">查看评论</el-button>
                            <el-button size="mini" type="success" @click="getComment(item)">采集评论</el-button>
                            <shareTask :items="item" @submitCall="multiShare" />
                            <el-button size="mini" type="danger" @click="delAweme(item.aweme_id)">删除</el-button>
                        </div>
                    </div>
                    <div v-else>
                        <el-checkbox class="check" size="mini" v-model="item.isChecked" :key="item.aweme_id"
                            @change="(e) => onChange(e, index)"></el-checkbox>
                        <div class="videoBox">
                            <div class="videoInfo" v-if="item.video">
                                <el-image class='img' :src="item.video.cover" fit="cover"
                                    :preview-src-list="item.images" lazy></el-image>
                                <div class="statistics">
                                    <i class="el-icon-thumb">{{ item.statistics.digg_count | formatNumber }}</i>
                                    <i class="el-icon-chat-dot-round">{{ item.statistics.comment_count | formatNumber
                                        }}</i>
                                    <i class="el-icon-star-off">{{ item.statistics.collect_count | formatNumber }}</i>
                                    <i class="el-icon-position">{{ item.statistics.share_count | formatNumber }}</i>
                                </div>
                                <i class="el-icon-s-opportunity" v-if="item.got"></i>
                            </div>
                            <div class="detail">
                                <div class="vd">
                                    <div class="opt">
                                        <h4>图片信息</h4>
                                    </div>
                                    <p>数量：{{ item.images.length }}</p>
                                    <p>时长：{{ item.duration | formatSeconds }}</p>
                                    <p>创建：{{ item.create_time | formatDate }}</p>
                                </div>
                                <div class="vd">
                                    <div class="opt">
                                        <h4>音频信息</h4>
                                        <!-- <i class="el-icon-download">下载</i> -->
                                    </div>
                                    <p>名称：{{ item.music.title }}</p>
                                    <p>作者：{{ item.music.author }}</p>
                                    <el-button type="success" plain size="mini" icon="el-icon-headset"
                                        @click="playMusic(item.music.play_url)">播放音乐</el-button>
                                </div>
                            </div>
                        </div>
                        <div class="uinfo">
                            <el-tooltip placement="top" :content="item.desc">
                                <p class="desc">{{ item.desc }}</p>
                            </el-tooltip>
                        </div>
                        <div class="opt">
                            <el-button size="mini" type="info" @click="toDy(item)">抖音查看</el-button>
                            <el-button size="mini" type="primary" @click="toComment(item.aweme_id)">查看评论</el-button>
                            <el-button size="mini" type="success" @click="getComment(item)">采集评论</el-button>
                            <shareTask :items="item" @submitCall="multiShare" />
                        </div>
                    </div>

                </el-card>
            </div>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="page.currentPage" :page-sizes="page.pageSizes" :page-size="page.pageSize"
                :layout="page.layout" :total="page.total">
            </el-pagination>
        </el-card>
        <diaLogComponent ref='dialog'></diaLogComponent>
        <el-dialog title="视频播放" width="600" center :visible.sync="showDialog" @closed="closeHandler">
            <div class="media">
                <video controls v-if="video">
                    <source :src="video.play_url" :type="`video/${video.format}`">
                </video>
            </div>
        </el-dialog>
        <el-dialog title="音频播放" width="600" center :visible.sync="showMDialog" @closed="closeMHandler">
            <audio :src="music" v-if="music" controls></audio>
        </el-dialog>
        <el-dialog title="评论信息" fullscreen center :visible.sync="showCDialog" @closed="closeCHandler">
            <commentComponent ref="comment" />
        </el-dialog>
    </div>
</template>
<script>
import { getAwemetList, delAweme, download } from '@/api/aweme'
import diaLogComponent from '@/views/index/aweme/add'
import commentComponent from '@/views/index/aweme/comment'
import WebSocketClientManager from '@/utils/WebSocketClientManager';
import shareTask from '@/views/index/components/shareTask'
import bus from '@/utils/bus';
const ws = WebSocketClientManager.getInstance();

export default {
    name: 'user-list',
    //组件
    components: {
        diaLogComponent,
        commentComponent,
        shareTask
    },
    data() {
        return {
            loading: false,
            searchItem: {
                author_user_id: null,
                desc: null,
                media_type: null,
                got: null,
                comment_sort: null,
                commentMin: 0,
            },
            tableData: [],
            page: {
                currentPage: 1,//当前页
                total: 0,//数据总条数
                pageSize: 6,//每页条数
                pageSizes: [6, 9, 12, 15, 18, 21, 24, 27, 30, 60, 120, 180, 210],//每页条数选择
                layout: "total, sizes, prev, pager, next, jumper"//组件布局
            },
            media_typeLabel: [
                { title: '视频', value: 4 },
                { title: '图文', value: 2 },
            ],
            got_typeLabel: [
                { title: '已采集', value: 'y' },
                { title: '未采集', value: 'n' },
            ],
            comment_sortLabel: [
                { title: '升序', value: 'sort' },
                { title: '降序', value: 'rsort' },
            ],
            showDialog: false,
            showMDialog: false,
            showCDialog: false,
            video: null,
            music: null,
            isAllChecked: false,
            downTarget: null,
        }
    },
    watch: {
        //解决分页 删除或修改时当前页无数据 bug
        'page.total'() {
            if (this.page.total == (this.page.currentPage - 1) * this.page.pageSize && this.page.total != 0) {
                this.page.currentPage -= 1
                this.getAwemetList();
            }
        }
    },
    methods: {
        downloadVideo(item, tryAgain = true) {
            this.downTarget = item;
            this.loading = true;
            const { aweme_id } = item;
            download({ aweme_id, type: 'mp4' }, res => {
                if (res?.url) {
                    this.$message({
                        type: 'success',
                        message: '下载成功!'
                    });
                    this.video = { play_url: res.url, format: 'mp4' };
                    this.showDialog = true;
                } else {
                    tryAgain ? this.$message({
                        type: 'error',
                        message: '下载失败，将自动更新数据再下载',
                        duration: 1000,
                        onClose() {
                            bus.$emit('openLog');
                            ws.sendMessage({ cmd: 'getAwemeInfo', content: aweme_id });
                        }
                    }) : this.$message({
                        type: 'error',
                        message: '下载失败！！！！'
                    })
                }
                this.loading = false;
            }).catch(e => {
                this.$message({
                    type: 'error',
                    message: e
                });
                this.loading = false;
            })
        },
        getComment(item) {
            bus.$emit('openLog');
            const { aweme_id, media_type, shareLink } = item;
            this.$nextTick(() => {
                ws.sendMessage({ cmd: 'getComment', content: shareLink ? shareLink : `${process.env.VUE_APP_DOUYIN_HOST}/${media_type == 4 ? 'video' : 'note'}/${aweme_id}` });
            })
        },
        multiUpdate() {
            const contents = this.selectedRows.map(item => {
                const { media_type, aweme_id } = item;
                return media_type ? `${process.env.VUE_APP_DOUYIN_HOST}/${media_type == 4 ? 'video' : 'note'}/${aweme_id}` : false;
            }).filter(Boolean);
            if (contents.length) {
                bus.$emit('openLog');
                this.$nextTick(() => {
                    ws.sendMessage({ cmd: 'getComment', content: contents });
                })
            }
        },
        delAweme(aweme_id) {
            this.$confirm('确认要删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delAweme({ aweme_ids: Array.isArray(aweme_id) ? aweme_id : [aweme_id] }).then(_ => {
                    this.handleCurrentChange(1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })

            })
        },
        multiDel() {
            this.delAweme(this.selectedRows);
        },
        closeCHandler() {
            this.showCDialog = false;
            this.$refs.comment.reset();
        },
        closeMHandler() {
            this.music = null;
            this.showMDialog = false;
        },
        closeHandler() {
            this.video = null;
            this.showDialog = false;
        },
        playMusic(music) {
            this.music = music;
            this.showMDialog = true;
        },
        toComment(aweme_id) {
            this.showCDialog = true;
            this.$nextTick(() => {
                this.$refs.comment.search(aweme_id);
            })

        },
        multiToComment() {
            this.showCDialog = true;
            this.$nextTick(() => {
                this.$refs.comment.search(this.selectedRows.map(o => o.aweme_id));
            })
        },
        toPlay(video) {
            this.video = video;
            this.showDialog = true;
            window.open(video.play_url, '_blank');
        },
        toDy(item) {
            const { aweme_id, media_type } = item;
            window.open(`${process.env.VUE_APP_DOUYIN_HOST}/${media_type == 4 ? 'video' : 'note'}/${aweme_id}`, '_blank');
        },
        onChange(e, index) {
            this.$set(this.tableData, index, { ...this.tableData[index], isChecked: e })
            this.isAllChecked = this.tableData.every(o => o.isChecked)
        },
        addDialog() {
            this.$refs.dialog.showDialog = true;
        },
        onSubmit() {
            this.page.currentPage = 1;//页码还原
            this.getAwemetList();
        },
        //清除
        clear() {
            this.$refs.search.resetFields();
            this.page.currentPage = 1;//页码还原
            if (this.$route.query.author_user_id) {
                this.searchItem.author_user_id = this.$route.query.author_user_id;
            }
            this.getAwemetList();
        },
        handleSizeChange(val) {
            this.page.pageSize = val;
            this.getAwemetList();
        },
        handleCurrentChange(val) {
            this.page.currentPage = val;
            this.getAwemetList();
        },
        //搜索列表数据
        getAwemetList() {
            this.loading = true;
            getAwemetList({
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
        allChange(e) {
            this.tableData = this.tableData.map(o => ({ ...o, isChecked: e }))
            this.isAllChecked = e;
        },
        multiShare(param) {
            bus.$emit('openLog');
            ws.sendMessage({ cmd: 'shareAweme', content: param });
        }

    },
    filters: {
        formatGender(gender) {
            return gender == 1 ? '男' : gender == 2 ? '女' : '未知';
        }
    },
    computed: {
        selectedRows() {
            return this.tableData.filter(o => o.isChecked);
        }
    },
    mounted() {
        if (this.$route.query.author_user_id) {
            this.searchItem.author_user_id = this.$route.query.author_user_id;
        }
        bus.$on('getComment', value => {
            this.getAwemetList();
        });
        bus.$on('getAwemeInfo', value => {
            this.downloadVideo(this.downTarget, false);
        });

        this.getAwemetList();

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
        width: 33%;
        margin-right: .3%;

        &:hover {
            background-color: #252631 !important;
            color: #fff !important;
        }

        .videoBox {
            display: flex;

            .detail {
                flex: 1;

                p {
                    font-size: 12px;
                }

                .vd {
                    margin-bottom: 10px;

                    .opt {
                        display: flex;
                        justify-content: space-between;

                        i {
                            color: #5360ec;
                        }
                    }
                }

                .el-icon-download {
                    font-weight: bold;
                    cursor: pointer;
                }

            }

            .videoInfo {
                width: 280px;
                height: 220px;
                position: relative;
                margin-right: 10px;

                .cover,
                .img,
                .animated {
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .animated {
                    display: none;
                }

                &:hover {
                    .animated {
                        display: block;
                    }

                    .cover {
                        display: none;
                    }
                }

                .statistics {
                    position: absolute;
                    font-size: 14px;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    color: #fff;
                    display: flex;
                    font-weight: bold;
                    background: rgba(0, 0, 0, .6);
                    padding: 10px 0;
                    border-radius: 0 0 5px 5px;

                    &>* {
                        flex: 1;
                        padding-left: 10px;
                    }
                }

                .el-icon-s-opportunity {
                    position: absolute;
                    right: 5px;
                    top: 5px;
                    font-size: 30px;
                    font-weight: bold;
                    color: yellow;
                }
            }
        }


        .check {
            position: absolute;
            top: 0;
            left: 5px;
        }

        .uinfo {
            margin: 5px 0;

            .desc {
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

    audio {
        width: 100%;
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