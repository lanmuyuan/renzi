<template>
  <div v-loading="loading" class="departments-container">
    <el-card class="tree-card">
      <!-- 用了一个行列布局 -->
      <TreeTool :data="company" :is-root="false" @addDept="handleAddDept" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <TreeTool slot-scope="{data}" :data="data" :is-root="true" @addDept="handleAddDept" @editDept="handleEditDept" @refreshList="getDepartments" />
    </el-tree>
    <add-department ref="addDept" :show-dialog.sync="showDialog" :tree-node="treeNode" />
  </div>
</template>

<script>
import TreeTool from './components/tree-tool.vue'
import { getDepartments } from '@/api'
import { tranListToTreeData } from '@/utils'
import AddDepartment from './components/add-department.vue'
export default {
  components: { TreeTool, AddDepartment },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      company: {},
      departs: [],
      showDialog: false,
      treeNode: {},
      loading: false
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      try {
        this.loading = true
        const { depts, companyManage, companyName } = await getDepartments()
        this.company = { name: companyName, manager: companyManage, id: '' }
        this.departs = tranListToTreeData(depts, '')
      } finally {
        this.loading = false
      }
    },
    handleAddDept(data) {
      this.showDialog = true
      this.treeNode = { ...data }
    },
    handleEditDept(data) {
      this.showDialog = true
      this.treeNode = { ...data }
      this.$refs.addDept.formDate = { ...data }
    }
  }
}
</script>

<style lang="scss">
  .departments-container {
    width: 900px;
    margin: 20px auto;
      .el-tree-node__content {
        padding-right: 0 !important;
      }
  }
  </style>
