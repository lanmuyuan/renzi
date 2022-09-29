<template>
  <el-dialog
    :title="title"
    width="50%"
    :visible="dialogVisible"
    @close="handerclose"
  >
    <el-form
      ref="roleDialogForm"
      v-loading="loading"
      label-width="80px"
      :model="formData"
      :rules="rules"
    >
      <el-form-item
        prop="name"
        label="角色"
      >
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="formData.description" type="textarea" row="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button @click="handerclose">取 消</el-button>
      <el-button type="primary" @click="addRole">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addRole, updateRole } from '@/api'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        description: ''
      },
      loading: false,
      rules: { name: [{ required: true, message: '角色必填', trigger: 'blur' }] }
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑角色' : '新增角色'
    }
  },
  methods: {
    handerclose() {
      this.$emit('update:dialog-visible', false)
      this.$refs.roleDialogForm.resetFields()
      this.formData = {}
    },
    async addRole() {
      try {
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        this.formData.id ? await updateRole(this.formData) : await addRole(this.formData)
        this.$message.success(this.formData.id ? '编辑角色成功' : '新增角色成功')
        this.$emit('refreshList')
        this.$emit('update:dialog-visible', false)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
  .el-dialog__header {
    background-color: #66b1ff !important;
    .el-dialog__title{
      color: #fff !important;
    }
  }
</style>
