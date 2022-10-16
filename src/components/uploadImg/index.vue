<template>
  <div>
    <el-upload
      v-loading="loading"
      class="uploadImg"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-change="onChange"
      :http-request="uploadImg"
      :on-remove="onremove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      title="图片预览"
      :visible.sync="previewImgDialogVisible"
      width="30%"
    >
      <img style="width: 100%" :src="previewImgUrl">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS(
  {
    SecretId: 'AKIDVt3yhEZfYEj9SYfbLsCJDwQffWDfttiR',
    SecretKey: 'b0EI8j7MRK0Um9PSJzSlsAJH2ZyGQP9e'
  }
)
console.log(COS)
export default {
  name: 'UploadImg',
  props: {
    defaultUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      previewImgDialogVisible: false,
      fileList: [],
      previewImgUrl: '',
      loading: false
    }
  },
  watch: {
    defaultUrl() {
      this.fileList.push({ name: 'default', url: this.defaultUrl })
    }
  },
  methods: {
    onChange(file, fileList) {
      this.fileList = fileList
    },
    uploadImg({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'lmy-1314348398', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        this.loading = false
        if (err) {
          console.log(err)
        }
        this.$emit('on-success', {
          imgUrl: 'http://' + data.Location
        })
      })
    },
    onremove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file, fileList) {
      this.previewImgUrl = file.url
      this.previewImgDialogVisible = true
    },
    beforeUpload(file) {
      const fileType = ['image/jpeg', 'image/gif']
      const types = fileType.includes(file.type)
      if (!types) {
        this.$message.error('只允许上传' + fileType.join(',') + '的文件类型')
        return false
      }
      // 限制上传大小
      const maxsize = 1 * 1024 * 1024
      if (fileType.size > maxsize) {
        this.$message.error('图片大小不能超过1m')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .uploadImg{
    width: 148px;
    height: 148px;
    overflow: hidden;
  }
</style>
