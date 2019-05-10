<template lang="pug">
  .my-membership.scroll-content(v-show="isShow")
    section.column.main-center.absolute(
      v-if="memberList.length === 0",
      style="margin-top:-100px"
    )
      .my-membership-img
        img(src="../../../../common/imgs/icon_default_vipcenter.png")
      .title 您还未开通会员
      button.btn.addBtn(@click="pathTo") 立刻开通 享受会员特权
    section.item.column(
      v-else,
      v-for="(item, key) in memberList",
      :class="{'show-all': isLimitHeight}"
    )
      .item-head.row
        .item-img
          img(:src="item.img")
        .item-prompt
          .item-title(v-text="item.title")
        .item-button
          button.btn(@click="join(item)") 立刻续费
      .item-body.engineering-body(v-show="item.type === 1")
        .picked-list(
          :class="{'limit-height': !showAll && isLimitHeight}"
        )
          .picked-list-show(
            v-if="isLimitHeight",
            @click="showAll = !showAll",
            v-text="showAllText"
          )
          ul
            li.pick-item(v-for="pickCity in engineering.list")
              .pick-time
                span 会员时间
                span.t-red {{pickCity.vipStartTime | timeify}} 至 {{pickCity.vipStartTime | timeify}}
                //- span.t-red(v-text="`${pickCity.vipStartTime} 至 ${pickCity.vipStartTime}`")
              .pick-city.column.main-justify
                .city-list.row(v-for="(val, id) in pickCity.list")
                  p
                    span.areaName.t-gray(v-text="val.provinceName")
                    span.employ(v-text="'(已用' + val.employLookInformationNumber + '条, '")
                    span.surplus(v-text="'剩余条数' + val.surplusLookInformationNumber + '条)'")
      .item-body(v-show="item.type === 0")
        .picked-area
          span 当前会员地区
          span(v-text="membershipAreaText")
        .picked-list
          ul
            li(v-for="pickCity in user.myMember.areaMap").pick-item.column
              .pick-time.row
                p 到期时间:
                p.t-red(v-text="pickCity.date")
              .pick-city.column.main-justify
                .city-list.row
                  p.t-gray(v-text="pickCity.area")
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      showAll: false
    }
  },

  filters: {
    timeify (timer) {
      return timer.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
    }
  },

  computed: {
    isLimitHeight () {
      return this.engineering.provinceNumber > 6
    },
    showAllText () {
      return this.showAll ? '收起' : '显示全部'
    },
    membershipAreaText () {
      let map = this.user.myMember.countMap
      // return map && ('(' + map.province + '个省' + map.city + '个市)')
      if (map) {
        if (map.province >= 99) {
          return '全国'
        } else {
          return `(${map.province}个省${map.city}个市)`
        }
      }
      return ''
    },
    memberList () {
      let memberList = []
      if (this.userInfo.dengji === 1) {
        memberList.push({
          type: 0,
          title: '招标采购会员',
          explain: '招标公告, 中标库, 采购信息无限看',
          img: require('common/imgs/icon_zhaobiaovip_vipcenter.png')
        })
      }
      if (this.userInfo.informationMemberVipLevel !== 4) {
        memberList.push({
          type: 1,
          title: '工程项目会员',
          explain: '独家项目跟踪, 实时查看项目进度',
          img: require('common/imgs/icon_xiangmuvip_vipcenter.png')
        })
      }
      return memberList
    },
    ...mapState(['area', 'userInfo', 'user', 'search', 'subscription', 'engineering'])
  },

  props: {
    isShow: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    join (val) {
      this.behaviour({typed: val.type + 64})
      switch (val.type) {
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
    addArea () {
      this.user.isChange = true
      this.search.toPage = false
      this.user.selectedCity = this.subscription.payCityList
      console.log(this.subscription.payCityList)
      this.$router.push('/areaSelector')
    },
    pathTo () {
      this.$emit('indexPicked', 1)
    },
    ...mapActions(['behaviour'])
  }
}
</script>

<style lang="scss">
@import "../../../../common/scss/mixin.scss";
.my-membership {
  .item {
    position: relative;
    &.show-all {
      padding-bottom: 30px;
    }
    .item-head {
      flex-shrink: 0;
    }
  }
  .my-membership-img {
    width: px2rem(135);
    margin-bottom: 1em;
    img {
      display: block;
      width: 100%;
    }
  }
  .engineering-body {
    .item-body {
      position: relative;
      padding-bottom: 25px;
    }
  }
  .picked-list {
    overflow-y: hidden;
    &.limit-height {
      max-height: 180px;
    }
  }
  .picked-list-show {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #0094fe;
  }
  .picked-area, .pick-time, .pick-city {
    margin-top: 1em;
    font-size: 14px;
  }
  .employ {
    padding-left: 1em;
  }
  .surplus {
  }
  .title {
    width: 80%;
    text-align: center;
    font-size: 14px;
    color: rgb(93, 93, 93);
  }
  .addBtn {
    font-size: 14px;
    background: rgb(0, 148, 254);
    color: #fff;
    width: 80%;
    margin: 1em;
    line-height: 2.5em;
  }
  .picked-area {
    font-size: px2rem(32);
  }
}
</style>
