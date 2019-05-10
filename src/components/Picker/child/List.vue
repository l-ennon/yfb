<template lang="pug">
  .list
    ul
      li(v-for="(item, key) of content")
        span(v-text="key")
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">
</style>
