<template lang="pug">
  svg.icon(
    aria-hidden="true"
  )
    use(:xlink:href="`#${icon}`")
</template>

<script>
export default {
  name: 'icon',

  props: {
    icon: {
      type: String,
      default: 'icon-aleft'
    }
  }
}
</script>

<style lang="scss">
</style>
