<template>
    <span class="userTask">
        <el-button type="primary" icon="el-icon-upload" @click="showDialog = true" :disabled="disabled"
            :size="size">创建任务</el-button>
        <!-- <el-dialog title="创建任务" width='40%' center :visible.sync="showDialog" :close-on-click-modal="false" -->
        <el-drawer title="创建任务" :visible.sync="showDialog" direction="rtl" size="40%" :close-on-click-modal="false"
            append-to-body>
            <div class="taskBody">
                <el-form class="taskForm" :model="form" :rules="rules" ref='form' :label-width='labelWidth'>
                    <div class="tip">
                        <h3>行为概率设置</h3>
                        <span>如果设置为0%则表示不执行，100%则表示一定执行</span>
                    </div>
                    <el-form-item label="关注用户概率" prop="careRate">
                        <el-slider v-model="form.careRate"></el-slider>
                        <span>{{ form.careRate }}%</span>
                    </el-form-item>
                    <el-form-item label="作品浏览概率" prop="viewPostRate">
                        <el-slider v-model="form.viewPostRate"></el-slider>
                        <span>{{ form.viewPostRate }}%</span>
                    </el-form-item>
                    <div v-show="form.viewPostRate" class="setConf">
                        <el-form-item label="浏览作品个数" prop="num">
                            <el-input-number v-model="form.viewPostOption.num" :min="1" :step="1"></el-input-number>
                            <span>个</span>
                            <tip content="将从用户主页作品列表开始浏览作品，单个用户浏览的作品个数" />
                        </el-form-item>
                        <el-form-item label="观看作品时长" prop="viewTimeOption">
                            <el-slider v-model="form.viewPostOption.viewTimeOption" range show-stops :max="300">
                            </el-slider> <span>{{ form.viewPostOption.viewTimeOption[0] }}～{{
            form.viewPostOption.viewTimeOption[1] }}秒</span>
                        </el-form-item>
                        <el-form-item label="点赞作品概率" prop="zanRate">
                            <el-slider v-model="form.viewPostOption.zanRate"></el-slider>
                            <span>{{ form.viewPostOption.zanRate }}%</span>
                        </el-form-item>
                        <el-form-item label="收藏作品概率" prop="collectRate">
                            <el-slider v-model="form.viewPostOption.collectRate"></el-slider>
                            <span>{{ form.viewPostOption.collectRate }}%</span>
                        </el-form-item>
                        <el-form-item label="评论作品概率" prop="commentRate">
                            <el-slider v-model="form.viewPostOption.commentRate"></el-slider>
                            <span>{{ form.viewPostOption.commentRate }}%</span>
                        </el-form-item>
                        <div v-show="form.viewPostOption.commentRate" class="setConf">
                            <el-form-item label="插入随机表情" prop="randomEmoji">
                                <el-switch v-model="form.viewPostOption.commentOption.randomEmoji"></el-switch>
                            </el-form-item>
                            <el-form-item label="@抖音用户" prop="atUser">
                                <el-input v-model="form.viewPostOption.commentOption.atUser"
                                    placeholder="请输入用户抖音号,不填则不@用户"></el-input>
                            </el-form-item>
                            <el-form-item label="自动最佳评论" prop="autoSendBestWord">
                                <el-switch v-model="form.viewPostOption.commentOption.autoSendBestWord"></el-switch>
                                <tip content="会从作品评论区列表中筛选出点赞最高的评论内容，作为你本次的评论输出" />
                                <span v-if="form.viewPostOption.commentOption.autoSendBestWord">
                                    <span class="pn">筛选前</span>
                                    <el-input-number v-model="form.viewPostOption.commentOption.pageNum" :min="1"
                                        :step="1"></el-input-number>
                                    <span class="pn">页评论数据</span>
                                    <tip content="由于评论内容可能有非常多页，为了方便高效，从指定页数中筛选最近评论" />
                                </span>
                            </el-form-item>
                            <div v-if="!form.viewPostOption.commentOption.autoSendBestWord">
                                <el-form-item label="作品评论话术">
                                    <div class="comment">
                                        <div>
                                            <el-button type="primary" size="mini"
                                                @click="commentVisible = true">新增评论</el-button>
                                            <tip content="每次评论作品时都将从列表中随机抽取一条作为评论输出" />
                                        </div>
                                        <ul v-if="form.viewPostOption.commentOption.text.length">
                                            <li v-for="(item, index) in form.viewPostOption.commentOption.text"
                                                :key="`${item}_${index}`">
                                                {{ index + 1 }}、 {{ item }}<i class="el-icon-delete"
                                                    @click="deleteComment(index)"></i>
                                            </li>
                                        </ul>
                                        <ul v-else>暂无数据</ul>
                                    </div>
                                </el-form-item>
                            </div>
                            <el-form-item label="插入图片概率" prop="commentRate">
                                <el-slider v-model="form.viewPostOption.commentOption.uploadRate"></el-slider>
                                <span>{{ form.viewPostOption.commentOption.uploadRate }}%</span>
                                <tip content="会从图片列表中随机选取一张图片，作为你本次的评论输出" />
                            </el-form-item>
                            <el-form-item v-show="form.viewPostOption.commentOption.uploadRate" label="图片列表"
                                prop="uploadImg">
                                <uploadImg ref="uploadImg" :fileList="form.viewPostOption.commentOption.uploadImg" />
                            </el-form-item>
                        </div>
                    </div>
                    <el-form-item label="私信用户概率" prop="sendMsgRate">
                        <el-slider v-model="form.sendMsgRate"></el-slider>
                        <span>{{ form.sendMsgRate }}%</span>
                    </el-form-item>
                    <div v-show="form.sendMsgRate" class="setConf">
                        <el-form-item label="插入随机表情" prop="randomEmoji">
                            <el-switch v-model="form.msgOption.randomEmoji"></el-switch>
                        </el-form-item>
                        <el-form-item label="私信用户话术">
                            <div class="comment">
                                <div>
                                    <el-button type="primary" size="mini" @click="msgVisible = true">新增私信</el-button>
                                    <tip content="每次私信用户时都将从列表中随机抽取一条作为私信输出" />
                                </div>
                                <ul v-if="form.msgOption.text.length">
                                    <li v-for="(item, index) in form.msgOption.text" :key="`${item}_${index}`">
                                        {{ index + 1 }}、 {{ item }}<i class="el-icon-delete"
                                            @click="deleteMsg(index)"></i>
                                    </li>
                                </ul>
                                <ul v-else>暂无数据</ul>
                            </div>
                        </el-form-item>
                    </div>
                    <el-form-item label="操作冷却时长" prop="defaultDelay">
                        <el-input-number v-model="form.defaultDelay" :min="1" :step="1"></el-input-number>
                        <span>秒</span>
                        <tip content="每一步模拟人工点击行为的操作间隔时间" />
                    </el-form-item>
                    <el-form-item label="执行间隔时长" prop="period">
                        <el-input-number v-model="form.period" :min="1" :step="1"></el-input-number>
                        <span>秒</span>
                        <tip content="操作每个用户之间的时间间隔" />
                    </el-form-item>
                    <el-form-item label="当日去重执行" prop="filterDone">
                        <el-switch v-model="form.filterDone"></el-switch>
                        <tip content="当天已执行的用户不再执行任务" />
                    </el-form-item>
                    <el-form-item label="完全去重执行" prop="filterOver">
                        <el-switch v-model="form.filterOver"></el-switch>
                        <tip content="只要用户执行过，就不再执行" />
                    </el-form-item>
                    <el-form-item label="采集用户信息" prop="inject">
                        <el-switch v-model="form.inject"></el-switch>
                        <tip content="执行任务的时候，同时采集用户的基本信息" />
                    </el-form-item>
                </el-form>
                <div class="dialog-footer">
                    <el-button @click="close">取消</el-button>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </div>
            </div>

            <!-- </el-dialog> -->
        </el-drawer>
        <el-dialog width="30%" center title="新增私信话术" :visible.sync="msgVisible">
            <el-form :model="msgForm" :rules="msgRules" ref='msgForm' :label-width='labelWidth'>
                <el-form-item label="话术内容" prop="content">
                    <el-input v-model="msgForm.content" placeholder="请输入名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeMsg">取消</el-button>
                <el-button type="primary" @click="onSubmitMsg">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog width="30%" center title="新增评论话术" :visible.sync="commentVisible" append-to-body>
            <el-form :model="commentForm" :rules="msgRules" ref='commentForm' :label-width='labelWidth'>
                <el-form-item label="评论内容" prop="content">
                    <el-input v-model="commentForm.content" placeholder="请输入名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeMsg">取消</el-button>
                <el-button type="primary" @click="onSubmitComment">确定</el-button>
            </div>
        </el-dialog>
    </span>
</template>

<script>
import { addTask, getTask } from '@/api/user'
import { mapState } from 'vuex'
import uploadImg from '@/components/selectOptions/uploadImg'
import tip from './tip'
export default {
    name: 'userTask',
    components: {
        uploadImg,
        tip
    },
    props: {
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        size: {
            type: String,
            required: false,
            default: 'mini'
        },
        submitCall: {
            required: false,
        }
    },
    data() {
        return {
            showDialog: false,
            msgVisible: false,
            commentVisible: false,
            labelWidth: '100px',
            msgForm: { content: null },
            commentForm: { content: null },
            form: {
                sendMsgRate: 5,
                careRate: 10,
                defaultDelay: 2,
                period: 5,
                viewPostRate: 30,
                viewPostOption: {
                    num: 2,
                    viewTimeOption: [5, 30],
                    zanRate: 20,
                    collectRate: 15,
                    commentRate: 10,
                    commentOption: {
                        text: [],
                        autoSendBestWord: false,
                        pageNum: 5,
                        randomEmoji: true,
                        atUser: null,
                        uploadRate: 10,
                        uploadImg: null
                    },
                },
                msgOption: {
                    text: [],
                    randomEmoji: true,
                },
                inject: false,
                filterDone: true,
                filterOver: true
            },
            rules: {
                // groups: [
                //     { required: false, message: '请选择', trigger: 'change' },
                // ]
            },
            msgRules: {
                content: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ]
            },
        }
    },
    computed: {
        ...mapState({
            options: state => state.groupOptions
        }),
        users() {
            return Array.isArray(this.user) ? this.user : [this.user];
        }
    },
    created() {
        getTask({ type: 'user' }, (res) => {
            const { options } = res;
            if (options) {
                this.form = options;
            }
        })
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.form.viewPostOption.commentOption.uploadImg = this.$refs.uploadImg.files.map(o => o.response.data.file);
                    addTask({ ...this.form, type: 'user' }, r => {
                        this.$emit('submitCall', { ...this.form });
                        this.$message.success('保存成功');
                        this.showDialog = false;
                    })
                } else {
                    this.$message.warning('请完善信息！');
                }

            });
        },
        onSubmitMsg() {
            this.$refs.msgForm.validate(valid => {
                if (valid) {
                    this.form.msgOption.text.unshift(this.msgForm.content);
                    this.closeMsg();
                } else {
                    this.$message.warning('请完善信息！');
                }

            });
        },
        onSubmitComment() {
            this.$refs.commentForm.validate(valid => {
                if (valid) {
                    this.form.viewPostOption.commentOption.text.unshift(this.commentForm.content);
                    this.closeMsg();
                } else {
                    this.$message.warning('请完善信息！');
                }

            });
        },
        close() {
            this.showDialog = false;
        },
        closeMsg() {
            this.msgVisible = false;
            this.msgForm.content = null;
            this.commentVisible = false;
            this.commentForm.content = null;
        },
        deleteMsg(index) {
            this.form.msgOption.text.splice(index, 1);
        },
        deleteComment(index) {
            this.form.viewPostOption.commentOption.text.splice(index, 1);
        }
    }
}
</script>
<style lang="less" scoped>
.userTask {
    .el-button {
        margin-left: 10px;
    }

    // .el-dialog {
    //     .el-dialog__header {
    //         height: 53px;
    //         background: linear-gradient(to right, #01c4fa, #07b4fa, #0fa0fa, #1394fa);
    //         padding: 18px 0;

    //         .el-dialog__title,
    //         .el-dialog__close {
    //             color: white;
    //             font-size: 14px;
    //         }
    //     }

    //     .dialog-footer {
    //         margin-top: 30px;
    //         margin-bottom: 18px;
    //     }
    // }

}

.taskBody {
    padding: 20px;
    .dialog-footer{
        text-align: center;
    }
}

.taskForm {
    .el-form-item {
        margin-bottom: 5px;
    }

    .tip {
        display: flex;
        align-items: center;

        span {
            color: rgb(240, 50, 50);
            margin-left: 10px;
            font-size: 12px;
        }
    }

    .pn {
        margin: 0 5px;
    }

    .setConf {
        padding-left: 30px;
    }

    .el-switch {
        margin-top: 10px;
    }

    .comment {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 5px;

        .el-button {
            width: 100px;
        }
    }

    ul {
        max-height: 200px;
        margin-top: 10px;
        overflow: auto;
        border: 2px solid #5b94e8;
        padding: 5px;
        border-radius: 5px;

        li {
            line-height: normal;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
        }

        .el-icon-delete {
            color: #1a01fa;
            margin-right: 10px;
            cursor: pointer;
            font-size: 20px;
        }

    }

    ::v-deep .el-form-item__content {
        display: flex;
        align-items: center;

        &>span {
            margin-left: 15px;
        }
    }

    .el-slider,
    .el-select {
        width: 80%;
    }

}
</style>