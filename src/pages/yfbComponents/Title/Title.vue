<template lang="pug">
.yfb-title.row
  span(v-text="title")
  slot
</template>

<script>
export default {
  name: 'yfb-title',

  props: {
    /**
     * 显示文字
     * @type {Object}
     */
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.yfb-title {
  flex: 0 0 1em;
  align-items: center;
  &::before {
    content: '';
    flex-shrink: 0;
    display: block;
    height: 15px;
    width: 3px;
    margin-right: 3px;
    background: #45a5fd;
  }
  span {
    white-space: nowrap;
  }
}
</style>
