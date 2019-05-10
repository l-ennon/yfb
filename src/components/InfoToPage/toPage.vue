<template lang="pug">
  //- 开通提示
  .info-to-page.row.main-center(
    v-if="isShow",
    @click.self="close"
  )
    .to-page-box.column.main-center
      .to-page-close(
        @click="close"
      )
      .to-page-img
        img(src="../../common/imgs/members-icon.png")
      .to-page-title 会员可立即致电联系人
      .to-page-title
          | 现在购买会员
          span.t-red 仅需19元
          | 哦
      .to-page-txt.t-dgray
        p
          strong.t-red 85%
          | 的用户购买会员致电联系人
        p 他们共签单{{userInfo.popNum}}次
      .to-page-btn
        button.bg-blue.btn.t-white(@click="pageShowFn") 成为会员，获取商机
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'info-to-page',

  props: {
    isShow: false
  },

  computed: {
    ...mapState(['userInfo'])
  },

  mounted () {
  },

  methods: {
    close () {
      this.$emit('close', true)
    },
    pageShowFn () {
      this.behaviour({typed: 1})
      this.$router.push('/user/joinMembership')
    },
    ...mapActions(['behaviour'])
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.info-to-page {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  .to-page-box {
    position: relative;
    width: px2rem(520);
    height: px2rem(650);
    padding: px2rem(60) px2rem(30) px2rem(50);
    border-radius: 10px;
    background: rgb(255, 255, 255);
    justify-content: space-between;
    text-align: center;
    .to-page-close {
      position: absolute;
      top: 10px;
      right: 10px;
      height: 24px;
      width: 24px;
      transform: rotateZ(45deg);
      &::after, &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        content: '';
        display: block;
        background: rgba(135, 135, 135, 1);
      }
      &::before {
        width: 100%;
        height: 2px;
      }
      &::after {
        width: 2px;
        height: 100%;
      }
    }
    .to-page-img {
      width: px2rem(200);
      margin-top: 10px;
      margin-bottom: 10px;
      img {
        width: 100%;
      }
    }
    .to-page-title {
      font-size: px2rem(36);
      .t-red {
        font-size: px2rem(45);
      }
    }
    .to-page-txt {
      margin-top: 10px;
      margin-bottom: 10px;
      text-align: center;
      font-size: px2rem(32);
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
