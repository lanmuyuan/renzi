<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <UploadImg @on-success="onsuccess" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UploadImg from '../../components/uploadImg/index.vue'

export default {
  name: 'Dashboard',
  components: { UploadImg },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    onsuccess(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
