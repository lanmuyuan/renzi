<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="showDialog" @close="handleClose">
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
import { getDepartments, addDepartments } from '@/api/departments'
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
    const codeCheck = async function(rule, value, callback) {
      const { depts } = await getDepartments()
      const isRepeat = depts.some(ele => {
        if (ele.code === value) {
          return true
        }
      })
      isRepeat ? callback(new Error(`模块下已存在${value}编码`)) : callback()
    }
    const nameCheck = async(rule, value, callback) => {
      console.log(this.treeNode.id)
      const { depts } = await getDepartments()
      const deptstj = depts.filter(item => {
        return item.pid === this.treeNode.id
      }).some(ele => {
        return ele.name === value
      })
      deptstj ? callback(new Error(`该部门下已存在${value}部门名称`)) : callback()
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
        await addDepartments({ ...this.formDate, pid: this.treeNode.id })
        this.$message.success('添加成功')
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
