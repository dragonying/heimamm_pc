<template>
 <el-row class='video-upload'>
   <el-upload
            :name="uploadVideo.name"
            :action="uploadVideo.url"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传视频格式</div>
    </el-upload>
      <video :src="tempVideoUrl" controls></video>
    </el-row>
</template>
<script>
import {uploadVideo} from '@/api/common'

export default {
    name:'video-uploader',
    props:['value'],
    data(){
        return {
            uploadVideo,
            tempVideoUrl:'',
        }
    },
    watch: {
      value(v){
            this.tempVideoUrl =  v.length ?  this.uploadVideo.baseUrl.trim('/')+'/'+ v : '';
      }
    },
   methods:{
      handleAvatarSuccess(res, file) {
        this.tempVideoUrl = URL.createObjectURL(file.raw);//生成预览地址
        this.$emit('input',res.data.url);//传递给父组件
      },
      beforeAvatarUpload(file) {
        if(!uploadVideo.acceptType.includes(file.type.substr(file.type.indexOf('/')+1))){
                this.$message.error(`视频只能是${uploadVideo.acceptType.join('|')}格式!`);
                return false;
        }
        if(file.size >uploadVideo.sizeLimit){
            this.$message.error(`上传视频大小不能超过${Math.floor(uploadVideo.sizeLimit/1024/1024)}MB!`);
            return false;
        }
        return true;
      },
   },
   mounted() {
       if(this.value){
           this.tempVideoUrl = this.uploadVideo.baseUrl.trim('/')+'/'+ this.value;
       }
   },
}
</script>
<style lang="less">
.video-upload{
  video{
    width:640px;
    height:360px;
  }
}
</style>