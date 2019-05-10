<template lang="pug">
  .engineering-detail.column
    checkout(
      :isShow="isCheckoutShow",
      @pathTo="pathTo"
    )
    confirm(
      :isShow="isConfirmShow",
      :txtList="confirmTxt",
      @confirm="confirm"
    )
    yfb-appbar(title="信息详情")
      div(@click="saveFn", slot="right")
        icon(:icon="hasSC ? 'icon-xingxing2' : 'icon-xingxing'")
    .detail-options.row
      .detail-option-view(
        v-for="(option, key) in options",
        v-text="option",
        :class="{active: key === curIndex}",
        @click="curIndex = key"
      )
    .detail-content(v-show="!loading")
      .detail-content-overview.scroll-content(v-show="curIndex === 0")
        eng-header(:item="detail")
        yfb-title(title="项目概况")
        .list-view-content.column
          .list-view-info-title(
            v-for="(info, index) in infoList"
          )
            span.title(v-text="`${info.title}: `")
            span.key(v-html="detail[info.key]")
      .detail-content-contact.scroll-content(v-show="curIndex === 1")
        see(
          :isShow="!canView",
          @see="checkCanSee"
        )
        template(v-for="(val, key) in contactList")
          contact-list(
            :title="val.title",
            :contactList="contact[val.key]"
          )
      .detail-content-dynamic.scroll-content(v-show="curIndex === 2")
        see(
          :isShow="!canView",
          @see="checkCanSee"
        )
        yfb-title(title="项目动态")
        .dynamic-list-content
          .dynamic-list(v-for="(val, key) in fllow")
            .intime
              span.time(v-text="val.intime")
              span.title(v-text="val.jzjd")
            .suggestion
              span(v-text="val.i_suggestion")
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import {YfbAppbar, YfbTitle} from 'yfb'
import {Icon} from 'components'
import engHeader from './engHeader.vue'
import contactList from './child/contact.vue'
import checkout from './child/checkout.vue'
import see from './child/see.vue'
import confirm from './child/confirm.vue'

export default {

  data () {
    return {
      confirmTxt: [],
      isConfirmShow: false,
      isCheckoutShow: false,
      loading: true,
      detail: {},
      contact: {},
      fllow: [],
      canView: false,
      hasSC: false,
      curIndex: 0,
      contactList: [
        {title: '业主单位', key: 'yzdw'},
        {title: '设计单位', key: 'sjdw'},
        {title: '施工单位', key: 'sgdw'}
      ],
      options: [' 项目概况', '项目联系人', '项目动态'],
      infoList: [
        { title: '项目标题', key: 'title' },
        { title: '项目性质', key: 'xmxz' },
        { title: '项目类别', key: 'xmlb' },
        { title: '项目子类别', key: 'xmzlb' },
        { title: '项目投资', key: 'xmtz' },
        { title: '业主类型', key: 'yzlx' },
        { title: '项目阶段', key: 'xmjd' },
        { title: '建筑面积', key: 'jzmj' },
        { title: '占地面积', key: 'jdmj' }, // 缺少
        { title: '钢结构', key: 'gjg' },
        { title: '装修情况', key: 'zxqk' },
        { title: '项目概括', key: 'xmgk' }
      ]
    }
  },

  activated () {
    this.getDetailData()
    this.curIndex = 0
  },

  deactivated () {
    this.clear()
  },

  computed: {
    ...mapState([
      'engineering', 'area'
    ])
  },

  methods: {
    confirm (type) {
      if (type) {
        this.seeDetail()
      }
      this.isConfirmShow = false
    },
    checkCanSee () {
      let {areaId} = this.detail
      this.getConsumeInformationNumberMessage({provinceId: areaId}).then(response => {
        let {type} = response.data
        switch (~~type) {
          case 1:
            this.isConfirmShow = true
            let {freeInformationNumber} = response.data
            this.confirmTxt = [`您可以查看${freeInformationNumber}条工程项目的联系人和动态, 本次将消耗1条`]
            break
          case 2:
            this.isCheckoutShow = true
            break
          case 3:
            this.isCheckoutShow = true
            break
          case 4:
            this.isConfirmShow = true
            let {provinceName, surplusInformationNumber, totalInformationNumber} = response.data
            this.confirmTxt = [`此操作将消耗一条工程项目权限`, `<span class="t-red">${provinceName}</span>剩余权限<span class="t-red">${surplusInformationNumber}</span>条, 共<span class="t-red">${totalInformationNumber}</span>条`]
        }
      })
    },
    pathTo (i) {
      this.isCheckoutShow = false
      if (i) {
        let {areaId} = this.detail
        let {selectedCity} = this.engineering
        if (!selectedCity[areaId]) {
          let areaName
          this.area.forEach(area => {
            if (~~area.id === ~~areaId) {
              areaName = area.name
            }
          })
          if (areaName) {
            this.$set(this.engineering.selectedCity, areaId, areaName)
          }
        }
        this.$router.push('/user/joinEngineering')
      }
    },
    async seeDetail () {
      this.setLoadingShow({isShow: true})
      let {contentId} = this.contact
      let {areaId} = this.detail
      let res = await this.consume({
        contentId,
        provinceId: areaId
      })
      if (res.data.status === '200') {
        this.getDetailData()
      }
      this.setLoadingShow({isShow: false})
    },
    clear () {
      this.detail = {}
      this.contact = {}
    },
    getDetailData () {
      this.loading = true
      this.contentid = this.$route.params.page
      this.projectdetail({contentid: this.contentid}).then(res => {
        this.loading = false
        let {detail, contact, fllow, canView, hasSC} = res.data
        this.detail = detail
        this.contact = contact
        this.fllow = fllow
        this.canView = canView
        this.hasSC = hasSC
      })
    },
    saveFn () {
      let {contentId: contentid} = this.contact
      this.projectsc({
        contentid
      }).then(response => {
        if (/true/.test(response.data.collect)) {
          this.hasSC = !this.hasSC
        }
      })
    },
    ...mapMutations([
      'setLoadingShow'
    ]),
    ...mapActions([
      'projectdetail', 'projectsc', 'consume', 'getConsumeInformationNumberMessage'
    ])
  },

  components: {
    YfbAppbar, engHeader, contactList, YfbTitle, see, Icon, checkout, confirm
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.engineering-detail {
  height: 100%;
  .detail-options {
    position: relative;
    z-index: 1;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  .detail-content {
    position: relative;
    flex-grow: 1;
    .yfb-title {
      margin-top: px2rem(20);
      margin-bottom: px2rem(20);
      padding-left: 12px;
      font-size: 14px;
    }
  }
  .detail-option-view {
    flex: 1;
    font-size: px2rem(28);
    height: px2rem(80);
    line-height: px2rem(80);
    text-align: center;
    background: #fff;
    &.active {
      color: #0094fe;
      box-shadow: inset 0px -2px 0 0 #0094fe;
    }
  }
  .detail-content-overview {
    .list-view-content {
      padding: 12px;
      background: #fff;
    }
    .list-view-info-title {
      font-size: 16px;
      padding: 5px 0;
      .title {
        color: rgb(101, 101, 101);
      }
    }
  }
  .detail-content-contact {
  }
  .detail-content-dynamic {
    .dynamic-list-content {
      background: #fff;
    }
    .dynamic-list {
      position: relative;
      padding: 8px 20px 8px 30px;
      .intime {
        line-height: 30px;
        .time {
          font-size: 16px;
          font-weight: 500;
        }
        .title {
          margin-left: 10px;
          padding-left: 4px;
          padding-right: 4px;
          border-radius: 4px;
          color: rgb(90, 180, 255);
          border: 1px solid rgb(90, 180, 255);
        }
      }
      .suggestion {
        font-size: 14px;
      }
      &::before {
        content: '';
        position: absolute;
        left: 12px;
        top: 0;
        bottom: 0;
        width: 1px;
        background: rgb(216, 216, 216);
      }
      &::after {
        content: '';
        position: absolute;
        left: 8px;
        top: 16px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgb(216, 216, 216);
       }
    }
  }
}
</style>
