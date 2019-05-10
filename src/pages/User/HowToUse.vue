<template lang="pug">
  .how-to-use
    yfb-appbar(title="如何订阅")
</template>

<script>
import {YfbAppbar} from 'yfb'
export default {

  mounted () {
  },

  components: {
    YfbAppbar
  }
}
</script>

<style lang="scss">
.how-to-use {
  z-index: 2;
  background: rgb(224, 209, 110);
}
</style>
