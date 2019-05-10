<template lang="pug">
  header.appbar(:style="appbarStyle")
    .left
      slot(name="left")
        span 返回
    .addbar-title
      slot
        span(v-text="title")
    .right
      slot(name="right")
</template>

<script>
export default {
  name: 'appbar',

  props: {
    title: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 18
    },
    height: {
      type: Number,
      default: 40
    }
  },

  computed: {
    appbarStyle () {
      return {
        'font-size': `${this.size}px`,
        'height': `${this.height}px`,
        'line-height': `${this.height}px`
      }
    }
  },

  methods: {
  }
}
</script>

<style lang="scss">
.appbar {
  position: relative;
  z-index: 100;
  color: #fff;
  .left,
  .right {
    position: absolute;
    top: 0;
    bottom: 0;
    padding-left: 10px;
    padding-right: 10px;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
  .addbar-title {
    text-align: center;
    font-weight: 400;
  }
}
</style>
