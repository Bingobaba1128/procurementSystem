<template>
  <div class="dashboard-container">
    <div class="dashboard-text">原纱采购系统</div>
    {{ token }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: ''
    }
  },
  created() {
    this.token = this.$token.loadToken()
    window.console.log(this.token)
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
