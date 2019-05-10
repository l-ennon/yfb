<template lang="pug">
  .to-pass-days(
    v-show="toPassDays"
    v-text="text"
  )
</template>

<script>
export default {
  computed: {
    toPassDays () {
      let {toPassDays} = this.$store.state.userInfo
      return (!isNaN(toPassDays) && toPassDays < 7) && toPassDays
    },
    text () {
      let {toPassDays} = this
      return `会员权限剩余${toPassDays + 1}天`
    }
  }
}
</script>

<style lang="scss">
  .to-pass-days {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;
    color: #fff;
    line-height: 1.5em;
    height: 1.5em;
    padding-left: 1em;
    padding-right: 0.5em;
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
    background: rgba(0, 0, 0, 0.7);
  }
</style>
