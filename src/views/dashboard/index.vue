<template>
  <div class="dashboard-container">
    <div class="dashboard-text">原纱采购系统</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: ''
    }
  },
  mounted() {
    // this.token = this.$token.loadToken()
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
