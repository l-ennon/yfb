<template lang="pug">
  //- 开通提示
  .to-page.row.main-center(
    v-if="search.pageShow",
    @click.self="search.pageShow = false",
    :data-track="`${track}-关闭开通会员`"
  )
    .to-page-box.column.main-center
      .to-page-close(
        :data-track="`${track}-关闭开通会员`",
        @click="search.pageShow = false"
      )
      .to-page-img
        img(src="../../common/imgs/members-icon.png")
      .to-page-title 今日2条免费权限用完啦
      .to-page-title
          | 现在购买会员
          span.t-red 仅需19元
          | 哦
      .to-page-txt.t-dgray
        p
          strong.t-red 85%
          | 的用户购买会员获得商机
        p 他们共签单{{userInfo.popNum}}次
      .to-page-btn
        button.bg-blue.btn.t-white(@click="pageShowFn",:data-track="`${track}-弹窗开通会员`") 成为会员，获取商机
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'to-page',

  computed: {
    track () {
      let s = /search/.test(this.$route.fullPath)
      return s ? '搜索' : '订阅'
    },
    ...mapState([
      'search', 'userInfo'
    ])
  },

  mounted () {
  },

  methods: {
    pageShowFn () {
      this.search.pageShow = false
      this.search.toPage = true
      this.clickpopup()
      this.$router.push('/user/joinMembership')
    },
    ...mapMutations(['setToPage']),
    ...mapActions(['clickpopup'])
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.to-page {
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
    background: #fff;
    justify-content: space-between;
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
