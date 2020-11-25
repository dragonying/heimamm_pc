<template>
  <!-- 注册对话框 -->
  <el-dialog
    title="用户注册"
    :width="width"
    center
    :visible.sync="regDialogShow"
    @closed="closeHandler"
  >
    <el-form
      :model="regForm"
      :rules="rules"
      ref="regForm"
      :label-width="labelWidth"
    >
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :name="upload.name"
          :action="upload.url"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="tempImgUrl" :src="tempImgUrl" class="head-avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input type="hidden" v-model="regForm.avatar"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="regForm.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="regForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="regForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="regForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="17">
            <el-input v-model="regForm.code"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <img class="pin-code" :src="codePic" @click="refleshCode" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="17">
            <el-input v-model="regForm.rcode"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-button
              class="code-btn"
              :disabled="delay > 0"
              @click="getPhoneCode"
              >{{ codeText }}</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="regDialogShow = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { userReg, smPinCode, sendSms, upload } from '@/api/reg'

export default {
  name: 'register',
  data () {
    return {
      upload: upload,
      labelWidth: '70px',
      width: '603px',
      regDialogShow: false,
      tempImgUrl: '', //预览图片地址
      codePic: smPinCode(), //验证码
      regForm: {
        avatar: '', //头像
        username: '',
        email: '',
        phone: '',
        password: '',
        code: '', //图形验证码
        rcode: '' //手机验证码
      },
      codeText: '获取用户验证码',
      delay: 0, //倒计时时长
      rules: {
        avatar: [{ required: true, message: '请上传头像', trigger: 'change' }],
        username: [
          { required: true, message: '请上输入昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请上输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请上输入手机号', trigger: 'blur' },
          {
            pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
            message: '手机号码格式错误',
            trigger: ['blur']
          }
        ],
        password: [
          { required: true, message: '请上输入密码', trigger: 'blur' },
          { min: 6, message: '长度至少6个字符', trigger: 'blur' }
        ],
        rcode: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' }
        ],
        code: []
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.tempImgUrl = URL.createObjectURL(file.raw) //生成预览地址
      this.regForm.avatar = res.data.file_path //路径
    },
    beforeAvatarUpload (file) {
      if (
        !upload.acceptType.includes(
          file.type.substr(file.type.indexOf('/') + 1)
        )
      ) {
        this.$message.error(
          `上传头像图片只能是${upload.acceptType.join('|')}格式!`
        )
        return false
      }
      if (file.size > upload.sizeLimit) {
        this.$message.error(
          `上传头像图片大小不能超过${Math.floor(
            upload.sizeLimit / 1024 / 1024
          )}MB!`
        )
        return false
      }
      return true
    },
    //验证码刷新
    refleshCode () {
      this.codePic = smPinCode()
    },
    //注册
    onSubmit () {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          userReg(this.regForm, res => {
            console.log(res)
            this.$message.success('注册成功')
            this.regDialogShow = false
          })
        } else {
          this.$message.warning('请输入正确的信息！')
        }
      })
    },
    //获取验证码
    getPhoneCode () {
      //部分字段验证
      this.$refs.regForm.validateField(['phone'], error => {
        if (error) {
          this.$message.warning(error)
          return
        }
        if (!/^\d{4}/.test(this.regForm.code)) {
          this.$message.warning('请输入正确的图形码!')
          return
        }

        sendSms(
          {
            phone: this.regForm.phone,
            code: this.regForm.code
          },
          res => {
            this.$message.success('验证码已发送！')
            let tptxt = this.codeText
            this.delay = 10
            //必须用箭头函数，否则this执行为windows
            let t = setInterval(() => {
              this.delay--
              this.codeText = `${this.delay}秒后重新获取`
              if (this.delay < 1) {
                clearInterval(t)
                this.codeText = tptxt
                this.delay = 0
                return
              }
            }, 1000)
            //测试代码,实际不可操作
            this.regForm.rcode = res.captcha
          }
        )
      })
    },
    //关闭弹窗时候触发，清空表单数据
    closeHandler () {
      this.$refs.regForm.resetFields() //只能清空含有prop属性的表单
      this.tempImgUrl = ''
    }
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
  .code-btn {
    width: 100%;
    height: 40px;
    font-size: 11px;
    text-align: center;
  }
  .dialog-footer {
    margin-top: -30px;
    margin-bottom: 18px;
  }

  //头像上传
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .head-avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
