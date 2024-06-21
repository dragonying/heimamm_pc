<template>
    <!-- 新增或编辑用户 -->
    <span class="groupAdd">
        <el-button type="info" @click="showDialog = true" :disabled="disabled" :size="size">分组</el-button>
        <el-dialog title="用户归档" width='40%' center :visible.sync="showDialog" append-to-body :close-on-click-modal="false" :show-close="false">
            <div class="hd">
                <el-image class='avatar' v-for="item in users" :src="item.avatar" fit="cover"
                    :key="item.uid"></el-image>
            </div>

            <el-form class="editForm" :model="editForm" :rules="rules" ref='editForm' :label-width='labelWidth'>
                <el-form-item label="分组" prop="groups">
                    <el-select v-model="editForm.groups" placeholder="请选择分组" multiple>
                        <el-option v-for="item in options" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                    <el-button @click.prevent="innerVisible = true">新增</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </div>
            <el-dialog width="30%" center title="新增分组" :visible.sync="innerVisible" append-to-body>
                <el-form :model="addForm" :rules="addRules" ref='addForm' :label-width='labelWidth'>
                    <el-form-item label="分组名" prop="groupName">
                        <el-input v-model="addForm.groupName" placeholder="请输入名称"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeAdd">取消</el-button>
                    <el-button type="primary" @click="onSubmitAdd">确定</el-button>
                </div>
            </el-dialog>
        </el-dialog>
    </span>

</template>

<script>
import { addGroup, userGroupEdit } from '@/api/user'
import { mapState } from 'vuex'
export default {
    name: 'group-dialog',
    props: {
        user: {
            required: true
        },
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
            innerVisible: false,
            labelWidth: '85px',
            editForm: {
                groups: null
            },
            addForm: {
                groupName: null
            },
            rules: {
                groups: [
                    { required: false, message: '请选择', trigger: 'change' },
                ]
            },
            addRules: {
                groupName: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ]
            }
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
    watch:{
        // user(v){
        //     console.log(v)
        // },
    },
    created() {
        this.initData();
    },
    methods: {
        initData(){
            this.editForm.groups = Array.isArray(this.user) ? [] : this.user.groups;
        },
        onSubmit() {
            this.$refs.editForm.validate(valid => {
                if (valid) {
                    userGroupEdit({ users: this.user, groups: this.editForm.groups }, r => {
                        this.$emit('submitCall');
                        this.$message.success('保存成功');
                        this.showDialog = false;
                    })
                } else {
                    this.$message.warning('请完善信息！');
                }

            });
        },
        onSubmitAdd() {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    addGroup({ groupName: this.addForm.groupName }).then(res => {
                        this.$store.dispatch('getGroupOptions');
                        this.$message.success('添加成功');
                        this.closeAdd();
                    })
                } else {
                    this.$message.warning('请完善信息！');
                }

            });
        },
        close() {
            this.initData();
            this.showDialog = false;
        },
        closeAdd() {
            this.innerVisible = false;
        }
    }
}
</script>
<style lang="less" scoped>
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
        margin-top: 30px;
        margin-bottom: 18px;
    }
}

.hd {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px 20px;

    .avatar {
        width: 30px !important;
        height: 30px !important;
        border-radius: 50%;
        margin: 3px;
    }
}

.el-button {
    margin-left: 10px;
}

.el-select {
    width: 80%;
}

// .editForm {
//     .el-form-item {
//         display: flex;

//         ::v-deep .el-form-item__content {
//             display: flex;
//             width: 100%;
//             margin-left: 0 !important;
//         }
//     }

// }
</style>