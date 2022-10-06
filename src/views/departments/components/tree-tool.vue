<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width: 100%;">
    <el-col>
      <!-- 左侧内容 -->
      <span>{{ data.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ data.manager }}</el-col>
        <el-col>
          <!-- 放置下拉菜单 -->
          <el-dropdown @command="handleCommand">
            <!-- 内容 -->
            <span>操作
              <i class="el-icon-arrow-down" />
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="del">删除部门</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(type) {
      if (type === 'add') {
        this.$emit('addDept', this.data)
      } else if (type === 'edit') {
        // 编辑
        this.$emit('editDept', this.data)
      } else {
        // 删除
        this.$confirm('是否删除该部门', '提示', {
          type: 'warning'
        }).then(res => {
          return delDepartments(this.data.id)
        }).then(res => {
          this.$message.success('删除成功')
          this.$emit('refreshList')
        })
      }
    }
  }
}
</script>

<style>

</style>
