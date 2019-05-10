<template lang="pug">
.exercise
  yfb-appbar(title="iframe")
  iframe.iframe(src="http://www.baidu.com",:height="height")
</template>

<script>
import {YfbAppbar} from 'yfb'
export default {
  name: 'c-iframe',

  data () {
    return {
      height: 0
    }
  },

  activated () {
    this.height = window.innerHeight - 40
  },

  deactivated () {
  },

  watch: {
  },

  computed: {
  },

  methods: {
  },

  components: {
    YfbAppbar
  }
}
</script>

<style lang="scss" >
.iframe {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: none;
  width: 100vw;
  height: 100%;
}
</style>
