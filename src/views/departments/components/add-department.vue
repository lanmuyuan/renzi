<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="title" :visible="showDialog" @close="handleClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="addDept" label-width="120px" :model="formDate" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formDate.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formDate.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formDate.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formDate.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button v-loading="loading" type="primary" size="small" @click="submit">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/empyolees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      required: false
    },
    treeNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const codeCheck = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = true
      console.log(this.formDate)
      if (this.formDate.id) {
        isRepeat = depts.some(ele => ele.id !== this.formDate.id && ele.code === value)
      } else {
        isRepeat = depts.some(ele => ele.code === value)
      }
      isRepeat ? callback(new Error(`模块下已存在${value}编码`)) : callback()
      // 编辑模式下，让我自己和自己较验了？？
      // 解决方案 对比的过程中把自己排除掉然后再去对比
    }
    const nameCheck = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = true
      if (this.formDate.id) {
        isRepeat = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(ele => ele.name === value)
      } else {
        isRepeat = depts.filter(item => {
          return item.pid === this.treeNode.id
        }).some(ele => {
          return ele.name === value
        })
      }
      isRepeat ? callback(new Error(`该部门下已存在${value}部门名称`)) : callback()
    }
    return {
      formDate: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { validator: nameCheck, trigger: 'blur' }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { validator: codeCheck, trigger: 'blur' }],
        manager: [{ required: true, message: '部门负责人不能为空' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      },
      peoples: [],
      loading: false
    }
  },
  computed: {
    title() {
      return this.formDate.id ? '编辑部门' : '新增部门'
    }
  },
  updated() {
    console.log(this.treeNode)
  },
  methods: {
    handleClose() {
      this.$emit('update:showDialog', false)
      this.$refs.addDept.resetFields()
      this.formDate = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    },
    async getEmployeeSimple() {
      const data = await getEmployeeSimple()
      this.peoples = data
    },
    async submit() {
      try {
        await this.$refs.addDept.validate()
        this.loading = true
        if (this.formDate.id) {
          await updateDepartments(this.formDate)
        } else {
          await addDepartments({ ...this.formDate, pid: this.treeNode.id })
        }
        this.$message.success(`${this.formDate.id ? '编辑' : '添加'}成功`)
        this.$parent.getDepartments()
        this.handleClose()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
