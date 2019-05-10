<template lang="pug">
.engineering-search.column
  yfb-appbar(title="全部项目")
  yfb-option(
    :options="options",
    :isOpen="isOpen",
    @curIndex="toggle"
  )
    li.option(
      v-if="userInfo.informationMemberVipLevel !== 4",
      @click="pay",
      slot="pay"
    )
      p(
        :class="{active: isPay}"
      )
        span 付费地区
    section.filter.filter-category(
      :class="{open: curIndex === 0}",
      slot="filter0",
      key="filter0"
    )
      .option-pick.bg-gray.scroll-content
        .option-name(
          v-for="val in area",
          v-text="val.name",
          @click="pickCity(val)",
          :class="{selected: selectedCity[val.id]}"
        )
      .filter-option.row.main-center
        .filter-option-btn
          button.btn.cancel(@click="cancelArea",type="button") 重置
        .filter-option-btn
          button.btn.confirm(@click="confirm",type="button") 确定
    section.filter.filter-category(
      :class="{open: curIndex === 1}",
      slot="filter1",
      key="filter1"
    )
      .option-pick.bg-gray.scroll-content
        .option-name(
          v-for="val in projectStage",
          v-text="val.name",
          @click="pickStage(val)",
          :class="{selected: selectedStage[val.id]}"
        )
      .filter-option.row.main-center
        .filter-option-btn
          button.btn.cancel(@click="cancelStage",type="button") 重置
        .filter-option-btn
          button.btn.confirm(@click="confirm",type="button") 确定
    section.filter.filter-category(
      :class="{open: curIndex === 2}",
      slot="filter2",
      key="filter2"
    )
      .option-pick.bg-gray.scroll-content
        .option-name(
          v-for="val in projectType",
          v-text="val.name",
          @click="pickType(val)",
          :class="{selected: selectedType[val.id]}"
        )
      .filter-option.row.main-center
        .filter-option-btn
          button.btn.cancel(@click="cancelType",type="button") 重置
        .filter-option-btn
          button.btn.confirm(@click="confirm",type="button") 确定
  .engineering-list
    transition(name="fade")
      .to-top(v-show="toTop",@click="toTopFn")
        icon(icon="icon-huidaodingbu")
    .scroll-content(ref="scroller")
      engineering-list(
        :content="contentList",
        @toDatil="toDatil",
        @eventAction="eventAction"
      )
        .to-dy.row.main-center(v-show="!loading && contentList.length !== 0")
          p 订阅工程信息, 每日第一时间为您推送最匹配的新项目
          router-link(to="/engineering/engineeringConfig")
            .dy(@click="dy")
              button.btn.bg-blue 立刻订阅
        infinite-scroll(
          slot="infiniteScroll",
          @load="loadMore",
          @scrollTop="scrollTop",
          :isShow="hasData",
          :scroller="scroller",
          :loading="loading"
        )
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {Option, YfbAppbar, EngineeringList} from 'yfb'
import {InfiniteScroll, Icon} from 'components'
import projectPick from './child/projectPick'
export default {

  mixins: [projectPick],

  data () {
    return {
      /**
       * 列表
       */
      loading: true,
      scroller: null,
      toTop: false,
      contentList: [],
      // 本页面
      curIndex: null,
      options: [
        { title: '信息地区', active: false },
        { title: '项目阶段', active: false },
        { title: '项目类型', active: false }
      ],
      isPay: false,
      scrollTo: 0,
      currentPage: 1
    }
  },

  activated () {
    this.$refs.scroller.scrollTop = this.scrollTo
  },

  deactivated () {
    this.curIndex = null
    this.scrollTo = this.$refs.scroller.scrollTop
  },

  mounted () {
    if (this.engineering.isEngineeringSearchUpdate) {
      this._mock()
      this.scroller = this.$refs.scroller
    }
  },

  methods: {
    toDatil (obj) {
      let {contentId} = obj
      this.$router.push({name: 'engineeringInfo', params: {page: contentId}})
    },
    _mock () {
      let {selectedCity, selectedType, selectedStage, isPay, currentPage} = this
      this.loading = true
      this.$store.dispatch('indexsearch', {
        isPay,
        areaId: Object.keys(selectedCity),
        projectStage: Object.values(selectedStage),
        projectType: Object.keys(selectedType),
        currentPage
      }).then(response => {
        this.loading = false
        this.contentList = this.contentList.concat(response.data.projectList)
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    loadMore () {
      this.currentPage++
      this._mock()
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
    pay () {
      this.behaviour({typed: 52})
      this.clearContentList()
      this.isPay = !this.isPay
      if (this.isPay) this.selectedCity = {}
      this._mock()
    },
    dy () {
      this.behaviour({typed: 56})
    },
    eventAction () {
      this.behaviour({typed: 57})
    },
    toggle (i) {
      !isNaN(parseInt(i)) && this.behaviour({typed: i + 53})
      this.curIndex = i
    },
    cancelArea () {
      this.selectedCity = {}
    },
    cancelType () {
      this.selectedType = {}
    },
    cancelStage () {
      this.selectedStage = {}
    },
    clearContentList () {
      this.curIndex = null
      this.currentPage = 1
      this.contentList = []
    },
    confirm () {
      if (Object.keys(this.selectedCity).length !== 0) {
        this.isPay = false
      }
      this.clearContentList()
      this._mock()
    },
    ...mapActions(['behaviour'])
  },

  watch: {
    selectedCity (newValue) {
      let l = Object.keys(newValue).length
      let title = l ? Object.values(newValue)[0] : '信息地区'
      this.options[0].title = title
      this.options[0].active = !!l
    },
    selectedStage (newValue) {
      let l = Object.keys(newValue).length
      let title = l ? Object.values(newValue)[0] : '项目阶段'
      this.options[1].title = title
      this.options[1].active = !!l
    },
    selectedType (newValue) {
      let l = Object.keys(newValue).length
      let title = l ? Object.values(newValue)[0] : '项目类型'
      this.options[2].title = title
      this.options[2].active = !!l
    }
  },

  computed: {
    isOpen () {
      return this.curIndex !== null
    },
    hasData () {
      return true
    },
    ...mapState([
      'area', 'userInfo', 'engineering'
    ])
  },

  components: {
    yfbOption: Option,
    YfbAppbar,
    InfiniteScroll,
    EngineeringList,
    Icon
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.engineering-search {
  height: 100%;
  .to-dy {
    padding: 0 px2rem(40) px2rem(20);
    .btn {
      margin-left: 1em;
      white-space: nowrap;
      color: #fff;
      padding: 0.2em 0.5em;
    }
  }
}
.engineering-list {
  position: relative;
  flex-grow: 1;
  .yfb-list {
    margin-top: px2rem(20);
  }
}
</style>
