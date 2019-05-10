<template lang="pug">
  .engineering-confirm.column.main-center(
    v-show="isShow",
    @click.self="confirm(0)"
  )
    .engineering-confirm-box
      .title
        p(
          v-for="txt in txtList",
          v-html="txt"
        )
      .confirm.row.main-justify
        .confirm-btn.bg-red(@click="confirm(0)") 取消
        .confirm-btn.bg-blue(@click="confirm(1)") 确认
</template>

<script>
export default {
  name: 'confirm',

  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    txtList: {
      type: Array
    }
  },

  methods: {
    confirm (i) {
      this.$emit('confirm', i === 1)
    }
  }
}
</script>

<style lang="scss">
@import "../../../common/scss/mixin.scss";
.engineering-confirm {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  .engineering-confirm-box {
    width: 80%;
    border-radius: 5px;
    background: #fff;
    font-size: 16px;
    overflow: hidden;
    .title {
      padding: 1em;
    }
    .confirm-btn {
      flex-grow: 1;
      text-align: center;
      line-height: 30px;
      color: #fff;
    }
  }
}
</style>
