<template lang="pug">
.membership.absolute.column
  yfb-appbar(title="会员中心")
  .index-pick.row.main-center
    .index-option(
      v-for="(v, i) in indexList",
      v-text="v",
      @click="picke(i)",
      :class="{'index-picked': indexPicked === i}"
    )
  .membership-content
    my-membership(
      @indexPicked="picke",
      :isShow="indexPicked === 0"
    )
    privilege-membership(:isShow="indexPicked === 1")
    router-link(to="/user/agreement")
      span.agreement.t-gray(@click="goIntroduce") 服务协议&nbsp;&nbsp;&nbsp;|
    router-link(to="/user/explain")
      span.explain.t-gray(@click="goIntroduce") 会员价格说明
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import {YfbAppbar} from 'yfb'
import {myMembership, privilegeMembership} from './children'
export default {
  data () {
    return {
      indexPicked: 0,
      indexList: ['我的会员', '会员特权']
    }
  },

  activated () {
    this.init()
    this.indexPicked = ~~this.$route.query.to || this.indexPicked
  },

  mounted () {
  },

  computed: {
    ...mapState([
      'userInfo', 'user', 'subscription', 'search'
    ])
  },

  methods: {
    async init () {
      this.setLoadingShow({isShow: true})
      await this.getMyMember()
      await this.getInformationMemberInfo()
      this.setLoadingShow({isShow: false})
    },
    picke (i) {
      this.behaviour({typed: i + 62})
      this.indexPicked = i
    },
    ...mapActions([
      'getMyMember', 'getInformationMemberInfo', 'behaviour'
    ]),
    ...mapMutations(['setLoadingShow'])
  },

  components: {
    YfbAppbar, myMembership, privilegeMembership
  }
}
</script>

<style lang="scss">
@import "../../../common/scss/mixin.scss";
.membership {
  .membership-content {
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
  }
  .index-pick {
    background: #fff;
    .index-option {
      flex-grow: 1;
      font-size: 14px;
      height: px2rem(90);
      line-height: px2rem(90);
      text-align: center;
    }
    .index-picked {
      border-bottom: 2px solid #0094fe
    }
  }
  .item {
    padding: 15px px2rem(25);
    background: #fff;
    margin-top: 10px;
    margin-bottom: 10px;
    .item-img {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      width: px2rem(130);
      img {
        flex-grow: 0;
        width: 100%;
      }
    }
    .item-prompt {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: px2rem(20);
      padding-right: px2rem(40);
      .item-title {
        font-size: px2rem(32);
        font-weight: 400;
        padding-bottom: 5px;
      }
      .item-explain {
        color: rgb(102, 102, 102)
      }
    }
    .item-img {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      width: px2rem(130);
      img {
        flex-grow: 0;
        width: 100%;
      }
    }
    .item-button {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      button {
        padding: 0.5em 1em;
        white-space: nowrap;
        width: px2rem(160);
        max-width: 80px;
        background: rgb(246, 68, 62);
        color: #fff;
        font-weight: 400;
      }
    }
  }
  .agreement {
    position: absolute;
    bottom: 0;
    font-size: px2rem(30);
    left:25%;
  }
  .explain {
    position: absolute;
    bottom: 0;
    font-size: px2rem(30);
    left:50%;
  }
}
</style>
