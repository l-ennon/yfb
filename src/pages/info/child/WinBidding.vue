<template lang="pug">
  .win-bidding-model.absolute.main-center(v-if="isShow")
    .win-bidding-wrap
      .close(@click="close")
      .win-bidding.column
        .win-bidding-img
          img(v-if="isMember",src="../../../common/imgs/win-bidding-member.png")
          img(v-else,src="../../../common/imgs/win-bidding.png")
        .win-bidding-body(
          :class="{'row main-center': !isReady}"
        )
          .company-info(v-show="isReady")
            .company-name(v-text="data.company")
            .company-link
              icon.t-blue(icon="icon-wode")
              span.t-gray 联系人
              p.link-man(v-for="item in data.lxrList")
                span.name(v-text="item.name")
                template(v-if="item.phone")
                  span.phone(v-if="isMember", v-text="item.phone")
                  span.phone(v-else) {{item.phone | filter}}
                  a.call.t-white.bg-blue(
                    v-if="isMember",
                    :href="`tel:${item.phone}`"
                  ) 拨打电话
            .company-address
              icon.t-blue(icon="icon-zuobiao")
              span.t-gray 地址
              p.address(v-text="data.address")
          spinner(v-show="!isReady",:size="60")
        .win-bidding-footer
          p.t-gray *该联系方式是千里马数据库提供，仅供参考
          router-link.link(to="/user/joinMembership",tag="div")
            button.win-bidding-btn.btn.bg-yellow.t-red(v-if="!isMember") 开通会员即可拨打
</template>

<script>
import {Spinner, Icon} from 'components'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    data: {
      type: null,
      required: true
    }
  },

  filters: {
    filter (val) {
      return val.replace(/(.{3}).*/, '$1*****')
    }
  },

  computed: {
    isReady () {
      return Object.keys(this.data).length !== 0
    },
    isMember () {
      return this.$store.state.userInfo.dengji === 1
    }
  },

  methods: {
    close () {
      this.$emit('close', true)
    }
  },

  components: {Spinner, Icon}
}
</script>

<style lang="scss">
  @import "../../../common/scss/mixin.scss";
  .win-bidding-model {
    display: flex;
    z-index: 98;
    background: rgba(0, 0, 0, 0.5);
  }
  .win-bidding-wrap {
    position: relative;
    width: 90%;
    height: 70%;
    border-radius: 5px;
    background: #fff;
    .win-bidding {
      display: flex;
      height: 100%;
    }
    .win-bidding-img {
      min-height: 43px;
      flex-shrink: 0;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
      }
    }
    .win-bidding-body {
      flex-grow: 1;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      margin: px2rem(24);
      margin-bottom: 0;
      font-size: px2rem(28);
      .icon {
        margin-right: 0.5em;
      }
      .company-name {
        font-size: px2rem(36);
      }
      .company-link {
        margin-top: px2rem(24);
        .link-man {
          position: relative;
          margin-left: 1.5em;
          margin-top: 0.5em;
          white-space: nowrap;
        }
        .name, .phone {
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .name {
          width: 5em;
          margin-right: 1em;
        }
        .phone {
          max-width: 8em;
        }
        .call {
          position: absolute;
          top: -2px;
          right: 5px;
          padding: 2px 4px;
          font-size: px2rem(28);
          border-radius: 4px;
        }
      }
      .company-address {
        padding-top: px2rem(24);
        .address {
          padding-top: 0.5em;
          padding-left: 1.5em;
        }
      }
    }
    .win-bidding-footer {
      flex-shrink: 0;
      padding: 10px 0;
      text-align: center;
      p {
        line-height: 2em;
      }
      .link {
        width: 100%;
      }
      .win-bidding-btn {
        height: 2em;
        width: 80%;
        font-size: 16px;
      }
    }
    .close {
      position: absolute;
      top: -34px;
      right: 0px;
      height: 24px;
      width: 24px;
      background: #fff;
      border-radius: 50%;
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
        width: 70%;
        height: 1px;
      }
      &::after {
        width: 1px;
        height: 70%;
      }
    }
  }
</style>
