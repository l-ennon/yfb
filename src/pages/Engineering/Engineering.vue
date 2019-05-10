<template lang="pug">
  .engineering.absolute
    transition(name="fade")
      .to-top(v-show="toTop && canMock",@click="toTopFn")
        icon(icon="icon-huidaodingbu")
    .scroll-content(ref="scroller")
      engineering-list(
        :content="contentList",
        @toDatil="toDatil",
        @eventAction="eventAction"
      )
        infinite-scroll(
          slot="infiniteScroll",
          @load="loadMore",
          @scrollTop="scrollTop",
          :isShow="hasData",
          :scroller="scroller",
          :loading="loading"
        )
        .column
          .header-nav.row
            .header-nav-item(
              v-for="(bar, index) in header",
              @click="pathTo(index)"
            )
              i.icon(:class="bar.icon")
              span(v-text="bar.title")
          .engineering-title.row.main-between
            yfb-title(title="我的订阅项目")
            button.btn(
              v-if="userInfo.informationMemberVipLevel !== 4"
              @click="isPayFn",
              :class="{isPay: isPay}"
            )
              icon(v-show="isPay",icon="icon-duihao")
              span 仅会员地区
          .engineering-body.bg-white(v-if="!hasSubscription && !loading")
            .engineering-type-title(v-text="typeTitle")
            .stepper
              .stepper-content.row.main-start
                template(v-if="activeStep === 1")
                  .option-stage.option(
                    v-for="(val, key) of projectStage",
                    @click="pickStage(val)"
                  )
                    div(
                      v-text="val.name",
                      :class="{picked: val.id in selectedStage}"
                    )
                template(v-if="activeStep === 2")
                  .option-type.option(
                    v-for="(val, key) of projectType",
                    @click="pickType(val)"
                  )
                    div(
                      v-text="val.name",
                      :class="{picked: val.id in selectedType}"
                    )
                template(v-if="activeStep === 3")
                  .option-area.option(
                    v-for="(val, key) of area",
                    @click="pickCity(val)"
                  )
                    div(
                      v-text="val.name",
                      :class="{picked: val.id in selectedCity}"
                    )
    .engineering-cover(v-if="!hasSubscription && !loading")
      .engineering-btn
        button.btn(
          :class="canPickNext > 0 ? 'bg-blue' : 'bg-dgray'",
          @click="nextStep",
          v-text="btnText"
        )
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {InfiniteScroll, Icon} from 'components'
import {EngineeringList, YfbTitle} from 'yfb'
import projectPick from './child/projectPick'
export default {
  name: 'engineering',

  mixins: [projectPick],

  data () {
    return {
      loading: true,
      scroller: null,
      contentList: [],
      activeStep: 1,
      currentPage: 1,
      toTop: false,
      scrollTo: 0,
      header: [
        {
          title: '全部项目',
          icon: 'icon_all_project'
        },
        {
          title: '订阅设置',
          icon: 'icon_collect_project'
        },
        {
          title: '我的收藏',
          icon: 'icon_subscript_project'
        }
      ],
      options: [
        { title: '信息地区', active: false },
        { title: '项目阶段', active: false },
        { title: '项目类型', active: false }
      ],
      hasData: false,
      isPay: false,
      isDone: false
    }
  },

  activated () {
    this.$refs.scroller.scrollTop = this.scrollTo
    let {isUpdata} = this.engineering
    if (isUpdata) {
      this.init()
    }
  },

  deactivated () {
    this.scrollTo = this.$refs.scroller.scrollTop
  },

  mounted () {
    this.scroller = this.$refs.scroller
  },

  methods: {
    async init () {
      this.clear()
      this.loading = true
      let response = await this.getProjectSub()
      if (response.data && response.data.areaId && response.data.xmjd) {
        this._mock()
      } else {
        this.loading = false
      }
    },
    _mock () {
      if (this.isDone) return
      this.loading = true
      this.mysubproject({
        currentPage: this.currentPage++,
        isPay: this.isPay
      }).then(response => {
        let {projectList, totalPage} = response.data
        this.isDone = this.currentPage > totalPage
        this.engineering.isUpdata = false
        this.loading = false
        this.hasData = true
        this.contentList = this.contentList.concat(projectList)
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    clear () {
      this.contentList = []
      this.currentPage = 1
      this.isDone = false
    },
    isPayFn () {
      this.isPay = !this.isPay
      this.clear()
      this._mock()
    },
    eventAction () {
      this.behaviour({typed: 51})
    },
    pathTo (i) {
      this.behaviour({typed: i + 48})
      switch (i) {
        case 0:
          this.$router.push('/engineering/engineeringSearch')
          break
        case 1:
          this.$router.push('/engineering/engineeringConfig')
          break
        case 2:
          this.$router.push('/engineering/engineeringCollection')
          break
      }
    },
    nextStep () {
      let {selectedCity, selectedType, selectedStage} = this
      switch (this.canPickNext) {
        case 0:
          return
        case 3:
          this.modify({
            projectType: Object.keys(selectedType),
            projectStage: Object.values(selectedStage),
            areaId: Object.keys(selectedCity)
          }).then(() => {
            this.getProjectSub().then(() => {
              this._mock()
            })
          })
          break
        default:
          this.activeStep++
      }
    },
    toDatil (obj) {
      let {contentId} = obj
      this.$router.push({name: 'engineeringInfo', params: {page: contentId}})
    },
    loadMore () {
      if (this.canMock) {
        this._mock()
      }
    },
    scrollTop (scrollTop) {
      this.toTop = scrollTop
    },
    toTopFn () {
      let t = setInterval(() => {
        let top = this.scroller.scrollTop
        if (top <= 0) {
          clearInterval(t)
        } else {
          let f = Math.floor
          this.scroller.scrollTop = f(top - top / 10)
        }
      }, 10)
    },
    ...mapActions([
      'modify', 'getProjectSub', 'mysubproject', 'behaviour'
    ])
  },

  watch: {
  },

  computed: {
    canMock () {
      return Object.keys(this.engineering.projectStage).length !== 0
    },
    hasSubscription () {
      let {areaId, projectType, projectStage} = this.engineering
      return areaId.length !== 0 && projectStage.length !== 0 && projectType.length !== 0
    },
    btnText () {
      return this.activeStep > 2 ? '完成' : '下一步'
    },
    canPickNext () {
      let {activeStep, selectedStage, selectedType, selectedCity} = this
      if (activeStep === 1 && Object.keys(selectedStage).length !== 0) {
        return 1
      } else if (activeStep === 2 && Object.keys(selectedType).length !== 0) {
        return 2
      } else if (activeStep === 3 && Object.keys(selectedCity).length !== 0) {
        return 3
      } else {
        return 0
      }
    },
    typeTitle () {
      switch (this.activeStep) {
        case 1:
          return `您想看哪个阶段的工程信息`
        case 2:
          return `您想看哪种类型的工程信息`
        case 3:
          return `您想看哪个城市的工程信息`
      }
    },
    list () {
      return this.welcome.indexPageConetntList || []
    },
    ...mapState([
      'engineering', 'welcome', 'area', 'userInfo'
    ])
  },

  components: {
    EngineeringList,
    InfiniteScroll,
    YfbTitle,
    Icon
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.engineering {
  flex-grow: 1;
  background: rgb(246, 246, 246);
  .header-nav {
    position: relative;
    z-index: 1;
    flex-grow: 0;
    flex-shrink: 0;
    padding: .5rem .5rem 0;
    background: #fff;
    box-shadow: 1px 0 2px rgba(0, 0, 0, 0.2);
  }
  .header-nav-item {
    flex: 1;
    text-align: center;
    font-size: px2rem(25);
    line-height: 2rem;
    .icon {
      display: block;
      height: px2rem(54);
      width: px2rem(54);
      margin: auto;
      background-size: 100% 100%;
    }
  }
  .engineering-title {
    flex-shrink: 0;
    padding: 10px;
    button {
      display: block;
      font-size: px2rem(24);
      width: px2rem(200);
      height: px2rem(50);
      color: #757575;
      border: 1px solid #757575;
      flex-grow: 0;
      flex-shrink: 0;
      &.isPay {
        color: #0094fe;
        border: 1px solid #0094fe;
      }
      .icon {
        margin-right: 2px;
      }
    }
  }
  .engineering-body {
    position: relative;
    flex-grow: 1;
    box-sizing: content-box;
    .engineering-type-title {
      text-align: center;
      font-size: px2rem(30);
      padding: px2rem(70);
    }
  }
  .engineering-cover {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: px2rem(155);
    background-image: linear-gradient(to bottom, rgba(#ffffff, 0) 0%, #fff 20%);
  }
  .engineering-btn {
    padding-top: px2rem(40);
    text-align: center;
    .btn {
      width: 70%;
      height: px2rem(80);
      font-size: px2rem(28);
      color: #fff;
    }
  }
}
.icon_all_project {
  background: url('../../common/imgs/icon_all_project.png') no-repeat;
}
.icon_collect_project {
  background: url('../../common/imgs/icon_collect_project.png') no-repeat;
}
.icon_subscript_project {
  background: url('../../common/imgs/icon_subscript_project.png') no-repeat;
}

.stepper {
  padding-bottom: px2rem(145);
  background: #fff
}
.stepper-content {
  flex-wrap: wrap !important;
  padding: 5px;
  .option {
    padding: 5px;
    text-align: center;
    > div {
      padding-top: 5px;
      padding-bottom: 5px;
      margin: auto;
      font-size: px2rem(26);
      white-space: nowrap;
      box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
    }
  }
  .option-stage {
    flex: 0 0 33.33%;
    > div {
      width: 90%;
    }
  }
  .option-type {
    padding: 5px 10px;
    > div {
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 40px;
    }
  }
  .option-area {
    flex: 0 0 25%;
    > div {
      width: 90%;
      border-radius: 5px;
    }
  }
  .picked {
    background: #0094fe;
    color: #fff;
  }
}

</style>
