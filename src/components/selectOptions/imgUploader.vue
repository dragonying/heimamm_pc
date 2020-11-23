<template>
   <el-upload
            class="avatar-uploader"
            :name="uploadPicture.name"
            :action="uploadPicture.url"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
                <img v-if="tempImgUrl" :src="tempImgUrl" class="head-avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>
<script>
import {uploadPicture} from '@/api/common'

export default {
    name:'img-uploader',
    props:['value'],
    data(){
        return {
            uploadPicture,
            tempImgUrl:'',
        }
    },
    watch: {
      value(v){
            this.tempImgUrl =  v.length ?  this.uploadPicture.baseUrl.trim('/')+'/'+ v : '';
      }
    },
   methods:{
      handleAvatarSuccess(res, file) {
        this.tempImgUrl = URL.createObjectURL(file.raw);//生成预览地址
        this.$emit('input',res.data.file_path);//传递给父组件
      },
      beforeAvatarUpload(file) {
        if(!uploadPicture.acceptType.includes(file.type.substr(file.type.indexOf('/')+1))){
                this.$message.error(`上传头像图片只能是${uploadPicture.acceptType.join('|')}格式!`);
                return false;
        }
        if(file.size >uploadPicture.sizeLimit){
            this.$message.error(`上传头像图片大小不能超过${Math.floor(uploadPicture.sizeLimit/1024/1024)}MB!`);
            return false;
        }
        return true;
      },
   },
   mounted() {
       if(this.value){
           this.tempImgUrl = this.uploadPicture.baseUrl.trim('/')+'/'+ this.value;
       }
   },
}
</script>
<style lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .head-avatar{
    width: 178px;
    height: 178px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>