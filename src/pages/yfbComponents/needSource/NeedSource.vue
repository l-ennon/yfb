<template lang="pug">
  .need-source(
    v-if="isShow",
    @click="pathTo"
  )
    icon(icon="icon-info")
    | 点此保护账户安全
</template>

<script>
import {Icon} from 'components'
export default {
  methods: {
    pathTo () {
      this.$router.push('/user/addPhoneNumber')
    }
  },
  computed: {
    isShow () {
      let {userInfo} = this.$store.state
      return userInfo.dengji === 1 && userInfo.needSource
    }
  },
  components: { Icon }
}
</script>

<style lang="scss">
  .need-source {
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
    .icon {
      font-size: 1.2em;
    }
  }
</style>
