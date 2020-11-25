<template>
  <!-- 新增或编辑学科 -->
  <el-dialog
    :title="dialogItem.id > 0 ? '编辑角色' : '新增角色'"
    :width="width"
    center
    :visible.sync="dialogItem.show"
    @closed="closeHandler"
    :fullscreen="true"
  >
    <el-form
      :model="editForm"
      :rules="rules"
      ref="editForm"
      :label-width="labelWidth"
    >
      <el-form-item label="角色名称" prop="role_name">
        <el-input v-model.trim="editForm.role_name"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data="models" style="width: 100%">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="model_name" label="模块名称"> </el-table-column>
      <el-table-column prop="path" label="路由"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.can_view">可查看</el-checkbox>
          <el-checkbox v-model="scope.row.can_edit">可编辑</el-checkbox>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getRoleInfo, editorRole, addRole, allmodule } from '@/api/role'

export default {
  name: 'role-dialog',
  //父组件传参
  props: {
    dialogItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      checked: false,
      labelWidth: '85px',
      width: '600px',
      editForm: {
        id: '', //角色id
        role_name: '', //角色名称
        power: []
      },
      models: [],
      rules: {
        role_name: [
          { required: true, message: '请上输入角色名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.editForm.power = this.models.filter(
            v => v.can_view || v.can_edit
          )

          if (this.editForm.id > 0) {
            editorRole(this.editForm, () => {
              this.$message.success('编辑成功')
              this.close()
              this.$parent.getRoleList()
            })
          } else {
            addRole(this.editForm, () => {
              this.$message.success('添加成功')
              this.close()
              this.$parent.getRoleList()
            })
          }
        } else {
          this.$message.warning('请输入正确的信息！')
        }
      })
    },
    close () {
      this.dialogItem.show = false
    },
    //关闭弹窗时候触发，清空表单数据
    closeHandler () {
      this.dialogItem.id = ''
      this.editForm = {
        id: '', //角色id
        role_name: '', //角色名称
        power: []
      }
      this.models = this.models.map(v => {
        v.can_edit = false
        v.can_view = false
        return v
      })
      this.$refs.editForm.resetFields() //只能清空含有prop属性的表单
    },
    //获取详情
    info (id) {
      getRoleInfo({ id: id }, res => {
        this.editForm = res.info
        let models = [],
          userPower = []
        res.info.power.forEach(v => {
          userPower[v.id] = { can_edit: v.can_edit, can_view: v.can_view }
        })

        res.models.forEach((v, index) => {
          models[index] = {
            id: v.id,
            model_name: v.model_name,
            path: v.path,
            can_view: userPower[v.id]
              ? Boolean(userPower[v.id]['can_view'])
              : false,
            can_edit: userPower[v.id]
              ? Boolean(userPower[v.id]['can_edit'])
              : false
          }
        })
        this.models = models
      })
    }
  },
  watch: {
    dialogItem: {
      handler (newV) {
        if (newV.show && newV.id > 0) {
          this.info(newV.id)
        }
      },
      deep: true //深度侦听,用于对象和数组
    }
  },
  mounted () {
    allmodule(res => {
      this.models = res
    })
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
