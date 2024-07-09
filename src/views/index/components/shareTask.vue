<template>
    <span class="shareTask">
        <el-button type="warning" @click="showDialog = true" :size="size">批量分享</el-button>
        <el-dialog title="创建分享任务" width='40%' center :visible.sync="showDialog" :close-on-click-modal="false"
            :show-close="false" append-to-body>
            <el-form class="taskForm" :model="form" :rules="rules" ref='form' :label-width='labelWidth'>
                <div class="tip">
                    <span>运行过程中，请不要在浏览器窗口中移动鼠标，以免分享窗口关闭</span>
                </div>
                <el-form-item label="分享用户个数" prop="limit">
                    <el-input-number v-model="form.limit" :min="1" :step="1"></el-input-number>
                    <span>个</span>
                </el-form-item>
                <el-form-item label="操作冷却时长" prop="delayTime">
                    <el-input-number v-model="form.delayTime" :min="1000" :step="1000"></el-input-number>
                    <span>毫秒</span>
                    <tip content="每一步模拟人工点击行为的操作间隔时间" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </div>
        </el-dialog>
    </span>
</template>

<script>
import tip from './tip'
export default {
    name: 'shareTask',
    components: {
        tip
    },
    props: {
        items: {
            required: true
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
            labelWidth: '100px',
            form: {
                delayTime: 3000,
                limit: 100
            },
            rules: {
                delayTime: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                limit: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$emit('submitCall', { ...this.form, items: this.items });
                    this.$message.success('任务创建成功');
                    this.showDialog = false;
                } else {
                    this.$message.warning('请完善信息！');
                }

            });
        },
        close() {
            this.showDialog = false;
        },
    }
}
</script>
<style lang="less" scoped>
.shareTask {
    .el-button {
        margin-left: 10px;
        margin-right: 10px;
    }

    .el-dialog {
        .el-dialog__header {
            height: 53px;
            background: linear-gradient(to right, #01c4fa, #07b4fa, #0fa0fa, #1394fa);
            padding: 18px 0;

            .el-dialog__title,
            .el-dialog__close {
                color: white;
                font-size: 14px;
            }
        }

        .dialog-footer {
            margin-top: 30px;
            margin-bottom: 18px;
        }
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

    ::v-deep .el-form-item__content {
        display: flex;
        align-items: center;

        &>span {
            margin-left: 15px;
        }
    }
}
</style>