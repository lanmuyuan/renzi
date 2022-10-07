<template>
  <div><PageTools type="success" :is-show-before="false">
    <template #before>
      <span>共25条记录</span>
    </template>
    <template #after>
      <el-button size="small" type="warning">导入</el-button>
      <el-button size="small" type="danger">导出</el-button>
    </template>
  </PageTools></div>
</template>

<script>
export default {
  components: {
    // PageTools
  }
}
</script>

<style>

</style>
