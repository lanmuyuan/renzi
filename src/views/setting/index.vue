<template>
  <div class="app-container">
    <el-card shadow="always">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row>
            <el-button type="primary" size="small" @click="addrole">新增角色</el-button>
          </el-row>
          <el-table
            v-loading="loading"
            style="width: 100%"
            :data="roleList"
            border
          >
            <el-table-column
              label="序号"
              type="index"
              width="60"
            />
            <el-table-column
              prop="name"
              label="角色名称"
              width="240"
            />
            <el-table-column
              prop="description"
              label="描述"
            />
            <el-table-column
              label="操作"
              width="240"
            >
              <template slot-scope="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="end" align="middle" style="height:60px">
            <el-pagination
              v-if="total>0"
              background
              layout="prev, pager, next, sizes"
              :page-size.sync="page.pagesize"
              :page-sizes="[2,3,5,10]"
              :total="total"
              :current-page.sync="page.page"
              @current-change="getRoleList"
              @size-change="getRoleList"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="消息提示的文案"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="formData.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="formData.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="formData.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <Addrole ref="addRole" :dialog-visible.sync="dialogVisible" @refreshList="getRoleList" />
  </div>
</template>

<script>
import { getRoleList, deleteRole, getCompanyInfo } from '@/api'
import addrole from './components/addrole.vue'
import Addrole from './components/addrole.vue'
export default {
  name: 'Setting',
  components: {
    addrole,
    Addrole
  },
  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      roleList: [],
      loading: false,
      dialogVisible: false,
      formData: {}
    }
  },
  mounted() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { rows, total } = await getRoleList(this.page)
        this.total = total
        this.roleList = rows
        if (total > 0 && rows.length === 0) {
          this.page.page--
          this.getRoleList()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    addrole() {
      this.dialogVisible = true
    },
    // 绑定点击事件
    // 拿到当前行这条数据
    // 回显再新增角色的组件上
    editRole(row) {
      // row 直接赋值给 addRole 的formData
      this.$refs.addRole.formData = { ...row }
      this.dialogVisible = true
      // 数据是引用类型 带来的问题
    },
    async delRole(id) {
      try {
        await this.$confirm('确认删除角色？', '提示', {
          type: 'warning'
        })
        await deleteRole(id)
        this.$message.success('删除成功')
        this.getRoleList()
      } catch (error) {
        console.log(error)
      }
    },
    async getCompanyInfo() {
      const res = await getCompanyInfo(this.$store.getters.companyId)
      this.formData = res
    }
  }
}
</script>

<style>

</style>
