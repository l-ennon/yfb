<template lang="pug">
  .privilege-membership.absolute(v-show="isShow")
    //- router-link(to="/user/explain", tag="div")
      .img
        img(src="../../../../common/imgs/banner_vipcenter.png")
    section.item.row(v-for="(item, key) in payList")
      .item-img
        img(:src="item.img")
      .item-prompt
        .item-title(v-text="item.title")
        .item-explain(v-html="item.explain")
      .item-button(@click="pathTo(key)")
        button.btn(:data-track="item.dataTrack") 立刻开通
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      payList: [
        {
          title: '招标采购会员',
          explain: '招标公告, 中标库, 采购信息随时看',
          dataTrack: '招标采购立刻开通',
          img: require('common/imgs/icon_zhaobiaovip_vipcenter.png')
        },
        {
          title: '工程项目会员',
          explain: '独家项目跟踪, 实时查看项目进度',
          dataTrack: '工程信息立刻开通',
          img: require('common/imgs/icon_xiangmuvip_vipcenter.png')
        }
      ]
    }
  },

  methods: {
    pathTo (i) {
      this.behaviour({typed: i + 66})
      switch (i) {
        case 0:
          this.joinMembership()
          break
        case 1:
          this.joinEngineering()
          break
      }
    },
    joinEngineering () {
      this.$router.push('/user/joinEngineering')
    },
    joinMembership () {
      this.user.isChange = true
      this.search.toPage = false
      if (this.userInfo.dengji === 1) {
        this.user.selectedCity = this.subscription.payCityList
      } else {
        this.user.selectedCity = this.subscription.freeCityList
      }
      this.$router.push('/user/joinMembership')
    },
    ...mapActions(['behaviour'])
  },

  computed: {
    ...mapState(['user', 'search', 'userInfo', 'subscription'])
  },

  props: {
    isShow: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss">
  @import "../../../../common/scss/mixin.scss";
  .privilege-membership {
    .img {
      padding-top: 10px;
      img {
        display: block;
        width: 100%
      }
    }
  }
</style>
