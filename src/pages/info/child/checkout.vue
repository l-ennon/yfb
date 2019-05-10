<template lang="pug">
  //- 开通提示
  .engineering-checkout.row.main-center(
    v-if="isShow",
    @click.self="pageShowFn(1)",
    data-track="工程-关闭开通工程会员"
  )
    .to-page-box.column.main-center
      .to-page-img
        img(src="../../../common/imgs/vip@2x.png")
      .to-page-title
        span 您尚未开通该地区会员
      .to-page-btn
        button.bg-yellow.btn.t-red(@click="pageShowFn(0)",data-track="工程-弹窗开通工程会员") 立即开通该地区会员
        button.btn(@click="pageShowFn(1)",data-track="工程-关闭开通工程会员") 关闭
</template>

<script>
export default {
  name: 'checkout',

  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    pageShowFn (i) {
      this.$emit('pathTo', i === 0)
    }
  }
}
</script>

<style lang="scss">
@import "../../../common/scss/mixin.scss";
.engineering-checkout {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  .to-page-box {
    width: px2rem(520);
    height: px2rem(600);
    padding: px2rem(45) px2rem(30) px2rem(20);
    border-radius: 10px;
    background: rgb(255, 255, 255);
    justify-content: space-between;
    .to-page-img {
      height: px2rem(240);
      margin: 0 0 px2rem(20);
      img {
        height: 100%;
      }
    }
    .to-page-title {
      font-size: 18px;
    }
    .to-page-txt {
      margin: 2px 0;
      font-size: 14px;
    }
    .to-page-btn {
      width: 100%;
      button {
        display: block;
        width: 100%;
        height: px2rem(70);
        font-size: 16px;
        margin-top: 3px;
      }
    }
  }
}
</style>
