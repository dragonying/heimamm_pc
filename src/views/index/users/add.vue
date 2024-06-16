<template>
    <!-- 新增或编辑用户 -->
    <el-dialog title="采集新用户" :width='width' center :visible.sync="showDialog" @closed="closeHandler">
        <el-form :model="editForm" :rules="rules" ref='editForm' :label-width='labelWidth'>
            <el-form-item label="抖音号" prop="unique_id">
                <el-input v-model.trim="editForm.unique_id"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { addUser } from '@/api/user'

export default {
    name: 'user-dialog',
    data() {
        return {
            showDialog: false,
            labelWidth: '85px',
            width: '600px',
            editForm: {
                unique_id: null
            },
            rules: {
                unique_id: [
                    { required: true, message: '请上输入抖音号', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.editForm.validate(valid => {
                if (valid) {
                    addUser(this.editForm, () => {
                        this.$message.success('添加成功');
                        this.close();
                        this.$parent.getUserList();
                    })

                } else {
                    this.$message.warning('请输入正确的信息！');
                }

            });
        },
        close() {
            this.showDialog = false;
        },
        //关闭弹窗时候触发，清空表单数据
        closeHandler() {
            this.editForm.unique_id = '';
            //如果首次点开编辑，再执行该方法无法清空，数据会还原为第一次显示的内容
            this.$refs.editForm.resetFields();//只能清空含有prop属性的表单
        },
    }
}
</script>
<style lang="less">
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

    .intro .el-input__inner {
        height: 53px;
    }

    .dialog-footer {
        margin-top: -30px;
        margin-bottom: 18px;
    }
}
</style>