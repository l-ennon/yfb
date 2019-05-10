<template lang="pug">
  .engineering-collection.column
    yfb-appbar(title="我的收藏")
    .engineering-collection-list(ref="scroller")
      .engineering-collection-has-none.column.main-center(v-if="projectList.length === 0 && !loading")
        .engineering-collection-has-none-img
          img(src="../../common/imgs/none.png")
        .engineering-collection-has-none-txt
          span.t-gray 您还没有收藏哦
      engineering-list(
        :content="projectList",
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
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {InfiniteScroll} from 'components'
import {YfbAppbar, EngineeringList} from 'yfb'
export default {
  name: 'my-favorite',

  data () {
    return {
      loading: false,
      currentPage: 1,
      toTop: false,
      projectList: [],
      scroller: null,
      isDone: false
    }
  },

  computed: {
    hasData () {
      return this.projectList.length > 0
    },
    ...mapState([
    ])
  },

  activated () {
    this.scroller = this.$refs.scroller
    this.clear()
    this.loadMore()
  },

  methods: {
    eventAction () {
      this.behaviour({typed: 57})
    },
    scrollTop (scrollTop) {
      this.toTop = scrollTop
    },
    toDatil (item) {
      let {contentId: contentid} = item
      this.$router.push({name: 'engineeringInfo', params: {page: contentid}})
    },
    clear () {
      this.projectList = []
      this.isDone = false
      this.currentPage = 1
    },
    loadMore () {
      if (!this.loading && !this.isDone) {
        this.loading = true
        this.projectsclist({
          currentPage: this.currentPage++
        }).then(response => {
          if (response.data.projectList) {
            let {projectList, totalPage, currentpage} = response.data
            this.isDone = (currentpage >= totalPage)
            if (projectList) {
              this.projectList = this.projectList.concat(response.data.projectList)
              this.loading = false
            }
          }
        })
      }
    },
    ...mapActions([
      'projectsclist', 'behaviour'
    ])
  },

  components: {
    YfbAppbar, InfiniteScroll, EngineeringList
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.engineering-collection {
  height: 100%;
}
.engineering-collection-list {
  display: flex;
  flex-grow: 1;
  padding-top: px2rem(20);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.engineering-collection-has-none {
  flex-grow: 1;
  .engineering-collection-has-none-img {
    width: 30vw;
    img {
      display: block;
      width: 100%;
    }
  }
  .engineering-collection-has-none-txt {
    padding-top: 20px;
    font-size: 16px;
  }
}
</style>
