<template lang="pug">
  .home.absolute.column
    //- to-pass-days(key="to-pass-days")
    need-source(key="need-source")
    .home-header.column.main-center
      .row.main-center(
        type="text",
        value=" 请输入产品行业项目名称",
        @click="pathTo(0)"
      )
        icon(icon="icon-fangdajing")
        span 请输入产品, 行业或项目名称
    .home-scroll-content.column
      list(
        @toDatil="toDatil",
        @eventAction="eventAction",
        :content="list"
      )
        .header-nav.row
          .header-nav-item(
            v-for="(bar, index) in header",
            @click="pathTo(index + 1)"
          )
            i.icon(:class="bar.icon")
            span(v-text="bar.title")
        .home-body
          yfb-title(title="最新招标")
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import toDatil from 'components/internal/toDatil'
import {Icon} from 'components'
import {SubscriptionList, YfbTitle, ToPassDays, NeedSource} from 'yfb'
export default {
  name: 'home',

  mixins: [toDatil],

  data () {
    return {
      scroller: null,
      header: [
        {
          title: '招标信息',
          icon: 'notice'
        },
        {
          title: '工程信息',
          icon: 'project'
        },
        {
          title: '中标库',
          icon: 'win'
        },
        {
          title: '装修采购',
          icon: 'zhuangxiu'
        },
        {
          title: '招标采购',
          icon: 'zhaobiaocaigou'
        }
      ]
    }
  },

  mounted () {
    this.scroller = this.$refs.scroller
  },

  computed: {
    list () {
      return this.welcome.indexPageConetntList || []
    },
    ...mapState([
      'search', 'welcome', 'area'
    ])
  },

  methods: {
    eventAction () {
      this.behaviour({typed: 28})
    },
    pathTo (i) {
      this.behaviour({typed: i + 22})
      switch (i) {
        case 0:
          this.search.type = null
          this.$router.push('/index/search')
          break
        case 2:
          this.$router.push('/engineering/engineeringSearch')
          break
        case 4:
          this.toZXCG()
          break
        default:
          if (i === 1) {
            this.search.type = 2
          } else if (i === 3) {
            this.search.type = 3
          } else if (i === 5) {
            this.search.type = 1
          }
          this.$router.push('/index/search')
      }
    },
    ...mapMutations([
      'setLoadingShow', 'toZXCG'
    ]),
    ...mapActions([
      'indexpageten', 'checkZBDetail', 'behaviour'
    ])
  },

  components: {
    list: SubscriptionList, Icon, YfbTitle, ToPassDays, NeedSource
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.home {
  .home-header {
    height: px2rem(130);
    width: 100%;
    color: #666;
    background: #0094fe;
    // background-image: -webkit-linear-gradient(top, #0094fe, #25c6f1);
    .icon {
      font-size: 20px;
    }
    .row {
      position: relative;
      font-size: 14px;
      width: 90%;
      height: px2rem(80);
      border-radius: 5px;
      background: #fff;
      box-shadow: 0 0 2px 0px rgba(#0094fe, 0.55);
    }
    .yfb-icon {
      font-size: 20px;
    }
  }
}
.advance {
  background: url('../../common/imgs/yugao_shouye.png') no-repeat;
}
.notice {
  background: url('../../common/imgs/gonggao_shouye.png') no-repeat;
}
.win {
  background: url('../../common/imgs/jieguo_shouye.png') no-repeat;
}
.project {
  background: url('../../common/imgs/icon_engineer_shouye.png') no-repeat;
}
.zhuangxiu {
  background: url('../../common/imgs/zhuangxiu.png') no-repeat;
}
.zhaobiaocaigou {
  background: url('../../common/imgs/zhaobiaocaigou.png') no-repeat;
}
.header-nav {
  position: relative;
  z-index: 1;
  padding: .5rem .5rem 0;
  background: #fff;
  box-shadow: 1px 0 2px rgba(0, 0, 0, 0.2);
}
.header-nav-item {
  flex: 1;
  text-align: center;
  font-size: px2rem(28);
  line-height: 2rem;
  .icon {
    display: block;
    height: px2rem(100);
    width: px2rem(100);
    margin: auto;
    background-size: 100% 100%;
  }
}
.home-body {
  flex: 1;
  padding: 10px 10px;
  img {
    width: 80%;
  }
}

.home-scroll-content {
  position: relative;
  flex: 1;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch;
  .yfb-list {
    ul {
      margin-bottom: px2rem(20);
    }
    .list-view {
      padding-bottom: 0;
    }
  }
}
</style>
