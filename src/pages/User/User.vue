<template lang="pug">
  .user.absolute.column
    //- 这里是 user 基本信息
    .user-info.user-info-bg.row
      .user-icon
        img(:src="userInfo.imgUrl")
      .user-type.column.main-between.t-white
        p.user-name
          span(v-text="userInfo.nickName")
          template(v-if="isVip")
            svg.vip-icon.icon(aria-hidden="true")
              use(xlink:href="#icon-vipicon-copy1")
        p.user-membership(v-html="membership")
        p.user-membership(v-html="projectMembership")
      //- 会员按钮
      .user-join
        div(@click="joinMembership")
          template(v-if="isVip")
            button.continue-btn(data-track="我的--续费") 续费
              icon(icon="icon-aright")
          template(v-else)
            button.join-btn(data-track="我的--开通会员") 开通会员
              icon(icon="icon-aright")
            icon.vip-icon(icon="icon-vip2")
    .user-warn(v-if="needSource", @click="eventAction(0)")
      router-link(to="/user/addPhoneNumber")
        icon(icon="icon-info")
        | 为保护您的账户安全，请完善个人信息
    ul.route-list.column
      li.route-item(
        v-if="userInfo.dengji === 1",
        @click="eventAction(26)"
      )
        router-link(
          to="/user/addPhoneNumber",
          tag="div"
        ) 我的账户
      li.route-item(
        v-for="(route, index) in routeUser",
        @click="eventAction(index)"
      )
        router-link(
          :to="'/user/' + route.to",
          tag="div",
          v-text="route.name"
        )
    ul.route-list.column
      li.route-item(
        v-for="route in routeAbout",
        @click="eventAction(3)"
      )
        router-link(
          :to="'/user/' + route.to",
          tag="div",
          v-text="route.name"
        )
</template>

<script>
import {Icon} from 'components'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'user',

  data () {
    return {
      routeUser: [
        {
          name: '会员中心',
          to: 'membership'
        },
        {
          name: '我的收藏',
          to: 'myfavorite'
        }
      ],
      routeAbout: [
        {
          name: '关于我们',
          to: 'aboutUs'
        }
      ]
    }
  },

  mounted () {
  },

  computed: {
    needSource () {
      let {userInfo} = this
      return userInfo.dengji === 1 && userInfo.needSource
    },
    isVip () {
      return this.userInfo.dengji === 1 || this.userInfo.informationMemberVipLevel !== 4
    },
    projectMembership () {
      if (this.isVip && this.userInfo.informationMemberVipLevel !== 4) {
        return `会员到期时间: <span class="t-yellow"> ${this.userInfo.informationLimitDate} </span>`
      } else {
        return ''
      }
    },
    membership () {
      if (this.isVip) {
        return this.userInfo.dengji === 1 ? `会员到期时间: <span class="t-yellow"> ${this.userInfo.limitDate} </span>` : ''
      } else {
        return '开通会员享用更多权限'
      }
    },
    ...mapState([
      'userInfo', 'user', 'subscription', 'search'
    ])
  },

  methods: {
    eventAction (i) {
      this.behaviour({typed: i + 59})
    },
    joinMembership () {
      this.behaviour({typed: 58})
      let {informationMemberVipLevel, dengji} = this.userInfo
      let isVip = informationMemberVipLevel !== 4 || dengji !== 1
      let params = { path: '/user/membership', query: {to: isVip ? 0 : 1} }
      this.$router.push(params)
    },
    ...mapActions([
      'getUserInfo', 'behaviour'
    ])
  },

  components: {Icon}
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.user-join {
  position: relative;
  button {
    height: px2rem(60);
    line-height: px2rem(60);
    font-size: px2rem(28);
    border-radius: 5px;
    background: #ffcc00;
    color: #d60b24;
  }
  .continue-btn {
    padding-left: px2rem(15);
    padding-right: px2rem(15);
  }
  .join-btn {
    padding-left: px2rem(40);
    padding-right: px2rem(5);
    white-space: nowrap;
  }
  .vip-icon {
    position: absolute;
    top: 50%;
    left: -25%;
    font-size: px2rem(100);
    margin-top: px2rem(-50);
    // transform: translateY(-50%);
  }
}
.user-warn {
  line-height: 2em;
  height: 2em;
  text-indent: 16px;
  background: #fff9c4;
  vertical-align: middle;
  .icon {
    font-size: 1.5em;
    padding-right: 5px;
  }
}
.route-list {
  padding-top: 10px;
  .route-item {
    font-size: 16px;
    padding: 16px;
    background: #fff;
    @include border1px(#d7d7d7);
  }
}
</style>
