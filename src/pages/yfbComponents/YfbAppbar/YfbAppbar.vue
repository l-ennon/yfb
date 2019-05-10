<template lang="pug">
  header.appbar(:style="appbarStyle")
    .left
      slot(name="left")
        .router-back(
          slot="left",
          @click="back"
        )
          Icon(
            :size="22"
          )
    .addbar-title
      slot
        span(v-text="title")
    .right
      slot(name="right")
</template>

<script>
import {Icon} from 'components'
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
    background: {
      type: String,
      default: '#0094fe'
    },
    height: {
      type: Number,
      default: 40
    }
  },

  methods: {
    back () {
      this.$emit('back')
      this.$router.back()
    }
  },

  computed: {
    appbarStyle () {
      return {
        'background': this.background,
        'font-size': `${this.size}px`,
        'height': `${this.height}px`,
        'line-height': `${this.height}px`
      }
    }
  },

  components: {
    Icon
  }
}
</script>

<style lang="scss">
.appbar {
  position: relative;
  z-index: 97;
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
