<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}

// let token = null
// window.addEventListener('message', function(evt) {
//   const msg = evt.data
//   if (msg.type !== token) { return }
//   if (token !== msg.data) {
//      token = msg.data
//      new Vue({
//        el: '#app'
//      })
//   }
// })
// window.console.log(msg)

</script>
