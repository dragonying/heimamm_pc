<template>
    <div class="uploadImg">
        <el-upload action="/uploads" list-type="picture-card" :file-list="files" auto-upload accept="image/*"
            :on-success="onSuccess">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'uploadImg',
    props: {
        fileList: {
            type: Array,
            require: false,
            default: []
        }
    },
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            files: []
        };
    },
    methods: {
        handleRemove(file) {
            const idx = this.files.findIndex(o => o == file);
            idx > -1 && this.files.splice(idx, 1);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        onSuccess(response, currentFile, fileList) {
            const { data: { file } } = response;
            console.log(currentFile)
            this.files.push(currentFile);
        }
    },
    mounted() {
        this.files = this.fileList.map(o => ({ uid: o, url: `${process.env.VUE_APP_BASEURL}${o}`, name: o, percentage: 100, response: { data: { file: o } } }))
    }
}
</script>
<style lang="less" scoped>
.uploadImg {
    ::v-deep .el-upload--picture-card {
        width: 100px;
        height: 100px;
        line-height: 100px;
    }

    ::v-deep .el-upload-list--picture-card .el-upload-list__item {
        width: 100px;
        height: 100px;

        &>div {
            width: 100%;
            height: 100%;
        }
    }
}
</style>