<template>
  <div>
    <p />
  </div>
</template>

<script>
export default {
  name: 'Ssologin',
  data() {
    return {
      state: '',
      code: ''
    }
  },
  created: function() {
    this.test()
  },
  mounted() {
    this.$router.push('/Layout/dashboard')
  },
  methods: {
    test() {
      // window.parent.postMessage({type: 'childStatus', data: 'isReady'}, '*')
      window.addEventListener('message', function(evt) {
        const msg = evt.data.data
        // if (msg.type !== token) { return }
        sessionStorage.setItem('access_token', msg.access_token)
        sessionStorage.setItem('employeeId', msg.employeeId)
        sessionStorage.setItem('employeeName', msg.employeeName)
        sessionStorage.setItem('contractBody', msg.contractBody)

        window.console.log(msg)
      })
    }
  }
}
</script>

<style>
</style>

