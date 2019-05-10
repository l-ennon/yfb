<template lang="pug">
.enterprise-ctrl(v-if="isShow")
  .enterprise-banner
    img(src="../../../common/imgs/enterpriseCtrl-banner.png")
  .title-wrap
    .title
      yfb-title(title="企业监控VIP套餐")
        span.t-blue （365天实时监控）
  .enterprise-click
    img(src="../../../common/imgs/enterpriseCtrl-click-bg.png")
    button.open-half(
      @click="payPermit({totalFee: 99})"
    ) 半价开通
    button.open-permit(
      @click="payPermit({totalFee: 980})"
    ) 开通权限
  .enterprise-footer （今日半价活动仅限500人）
</template>

<script>
import YfbTitle from '../Title/Title.vue'
import {mapState, mapActions} from 'vuex'

export default {
  props: ['isShow'],

  components: {
    YfbTitle
  },
  methods: {
    payPermit ({totalFee}) {
      this.unifiedorder({totalFee}).then(() => {
        this.$emit('done', true)
      })
    },
    ...mapActions([
      'unifiedorder'
    ])
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  }
}
</script>
<style lang="scss">
  @import "../../../common/scss/mixin.scss";
  .enterprise-ctrl {
    z-index: 99;
    background: #F6F6F6;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .enterprise-banner {
      width: px2rem(720);
      height: px2rem(651);
      img {
        display: block;
        width: 100%;
      }
    }
    .title-wrap{
      padding-left: 12px;
      background: #fff;
      .title {
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 15px;
        border-bottom: 1px solid #d8d8d8;
      }
    }
    .enterprise-click {
      position: relative;
      img {
        display: block;
        width: 100%;
      }
      button {
        width: px2rem(151);
        height: px2rem(61);
        border-radius: 5px;
        font-size: px2rem(28);
        color: #fff;
        position: absolute;
        right: px2rem(20);
      }
      .open-half {
        background: #F89507;
        top: px2rem(17);
      }
      .open-permit {
        background: #45A5FD;
        top: px2rem(114);
      }
    }
    .enterprise-footer {
      font-size: px2rem(24);
      color: #777;
      text-align: center;
      margin-top: px2rem(20);
    }
  }
</style>
