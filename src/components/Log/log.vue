<template lang="pug">
  .log.row.main-center(
    v-if="isShow",
    @click.self="logClose",
    v-cloak
  )
    .log-box
      .close(@click="logClose")
        svg.icon(aria-hidden="true")
          use(xlink:href="#icon-close")
      .log-title(v-for="t in text", v-text="t")
      button.btn.bg-blue.t-white(@click="logClick") 好的
</template>

<script>
export default {
  name: 'log',

  data () {
    return {
    }
  },

  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    text: {
      type: Array,
      require: true,
      default: () => []
    }
  },

  beforeMount () {
  },

  mounted () {
  },

  beforeDestroy () {
  },

  methods: {
    logClose () {
      this.$emit('logClose', true)
    },
    logClick () {
      this.$emit('logClick', true)
    }
  }
}
</script>

<style lang="scss">
.log {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  background: rgba(#000000, 0.5);
  .log-box {
    position: relative;
    width: 75%;
    padding: 1.5em 1em 1.2em;
    box-sizing: border-box;
    border-radius: 10px;
    background: #fff;
    text-align: center;
    font-size: 16px;
    .close {
      position: absolute;
      z-index: 9;
      right: 7px;
      top: 7px;
      color: #999;
    }
    .btn {
      width: 100%;
      line-height: 2em;
      margin-top: 1em;
    }
  }
  .log-title {
    line-height: 1.8em;
    span.t-red {
      padding: 2px;
      font-size: 1.2em;
    }
  }
}
</style>
